import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Safely get directory name in ESM and bundled environments
const currentDir = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

const configFilePath = [
  path.resolve(currentDir, "../data/github-config.json"),
  path.resolve(currentDir, "../../data/github-config.json"),
  path.resolve(currentDir, "../../../data/github-config.json"),
  path.resolve(process.cwd(), "artifacts/api-server/data/github-config.json"),
  path.resolve(process.cwd(), "data/github-config.json"),
].find((p) => fs.existsSync(p)) ?? path.resolve(currentDir, "../../data/github-config.json");

const rootDataDir = path.dirname(configFilePath);

export interface GitHubConfig {
  token: string;
  repo: string; // e.g., "owner/repo"
  branch: string; // e.g., "main"
  path: string; // e.g., "artifacts/api-server/data/posts.json"
}

export function getCandidateConfigs(): GitHubConfig[] {
  const configs: GitHubConfig[] = [];

  // 1. Prioritize explicit local file config (configured by user/admin in Admin UI)
  try {
    if (fs.existsSync(configFilePath)) {
      const existing = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
      if (existing && existing.token && existing.repo) {
        configs.push({
          token: existing.token,
          repo: existing.repo,
          branch: existing.branch || "main",
          path: existing.path || "artifacts/api-server/data/posts.json",
        });
      }
    }
  } catch (err) {
    console.warn("Failed to read local github config file", err);
  }

  // 2. Add environment variables config if defined and not identical
  const envToken = process.env.GITHUB_TOKEN;
  const envRepo = process.env.GITHUB_REPO;
  if (envToken && envRepo) {
    if (!configs.some((c) => c.token === envToken && c.repo === envRepo)) {
      configs.push({
        token: envToken,
        repo: envRepo,
        branch: process.env.GITHUB_BRANCH || "main",
        path: process.env.GITHUB_PATH || "artifacts/api-server/data/posts.json",
      });
    }
  }

  return configs;
}

export function getGitHubConfig(): GitHubConfig | null {
  const candidates = getCandidateConfigs();
  if (candidates.length > 0) {
    const primary = candidates[0];
    // Keep process.env in sync with the primary working configuration
    process.env.GITHUB_TOKEN = primary.token;
    process.env.GITHUB_REPO = primary.repo;
    process.env.GITHUB_BRANCH = primary.branch;
    process.env.GITHUB_PATH = primary.path;
    return primary;
  }
  return null;
}

export function saveGitHubConfig(config: GitHubConfig): boolean {
  try {
    if (!fs.existsSync(rootDataDir)) {
      fs.mkdirSync(rootDataDir, { recursive: true });
    }
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), "utf8");
    // Also keep process.env in sync
    process.env.GITHUB_TOKEN = config.token;
    process.env.GITHUB_REPO = config.repo;
    process.env.GITHUB_BRANCH = config.branch;
    process.env.GITHUB_PATH = config.path;
    return true;
  } catch (err) {
    console.error("Failed to write GitHub config file to disk", err);
    return false;
  }
}

export async function syncPostsToGitHub(posts: any[]): Promise<{ success: boolean; message: string }> {
  const candidates = getCandidateConfigs();
  if (candidates.length === 0) {
    return {
      success: false,
      message: "GitHub Git-Sync is not configured. Define GITHUB_TOKEN and GITHUB_REPO environment variables, or set up sync in Admin Settings.",
    };
  }

  let lastError = "";

  for (let i = 0; i < candidates.length; i++) {
    const config = candidates[i];
    const { token, repo, branch, path: repoPath } = config;
    const url = `https://api.github.com/repos/${repo}/contents/${repoPath}`;

    try {
      console.log(`[Git-Sync] Syncing posts.json to repository '${repo}' path '${repoPath}' on branch '${branch}'...`);

      // 1. Fetch current file SHA if exists
      let sha: string | undefined;
      const getRes = await fetch(`${url}?ref=${branch}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "JaaGa-Blog-Sync",
        },
      });

      if (getRes.status === 401 && i < candidates.length - 1) {
        console.warn(`[Git-Sync] Token ${i + 1} returned 401 Unauthorized. Trying alternative candidate token...`);
        lastError = "Unauthorized (Status: 401)";
        continue;
      }

      if (getRes.ok) {
        const data = await getRes.json() as { sha: string };
        sha = data.sha;
        console.log(`[Git-Sync] Found existing github file with SHA: ${sha}`);
      } else if (getRes.status === 404) {
        console.log(`[Git-Sync] posts.json does not exist in target repo path. Will attempt to create it.`);
      } else {
        const errMsg = await getRes.text();
        if (getRes.status === 401 && i < candidates.length - 1) {
          console.warn(`[Git-Sync] Token ${i + 1} unauthorized. Trying next candidate...`);
          lastError = errMsg;
          continue;
        }
        return {
          success: false,
          message: `Failed to fetch file metadata from GitHub. Status: ${getRes.status}. Details: ${errMsg}`,
        };
      }

      // 2. Prepare content and commit
      const stringData = JSON.stringify(posts, null, 2);
      const base64Content = Buffer.from(stringData, "utf8").toString("base64");

      const putPayload = {
        message: "Update blogs data [JaaGa Admin Sync]",
        content: base64Content,
        branch,
        ...(sha ? { sha } : {}),
      };

      const putRes = await fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "User-Agent": "JaaGa-Blog-Sync",
        },
        body: JSON.stringify(putPayload),
      });

      if (putRes.ok) {
        const putDetails = await putRes.json() as { commit?: { html_url?: string } };
        const commitUrl = putDetails.commit?.html_url || "";
        console.log(`[Git-Sync] Successfully committed posts.json back to GitHub! Commit: ${commitUrl}`);
        if (i > 0) {
          saveGitHubConfig(config);
        }
        return {
          success: true,
          message: `Successfully synchronized posts database to GitHub repository! Triggered automatic production deployment. Commit URL: ${commitUrl}`,
        };
      } else {
        const errMsg = await putRes.text();
        if (putRes.status === 401 && i < candidates.length - 1) {
          console.warn(`[Git-Sync] Commit failed with 401. Trying next candidate token...`);
          lastError = errMsg;
          continue;
        }
        return {
          success: false,
          message: `Failed to commit posts.json to GitHub. Status: ${putRes.status}. Details: ${errMsg}`,
        };
      }
    } catch (error: any) {
      console.error("[Git-Sync] Unexpected error during posts synchronization:", error);
      lastError = error?.message || String(error);
    }
  }

  return {
    success: false,
    message: `Git-Sync failed across all candidate credentials: ${lastError}`,
  };
}

export async function pullPostsFromGitHub(resolvedLocalPath: string): Promise<{ success: boolean; message: string; data?: any[] }> {
  const candidates = getCandidateConfigs();
  if (candidates.length === 0) {
    return {
      success: false,
      message: "GitHub Git-Sync is not configured.",
    };
  }

  let lastError = "";

  for (let i = 0; i < candidates.length; i++) {
    const config = candidates[i];
    const { token, repo, branch, path: repoPath } = config;
    const url = `https://api.github.com/repos/${repo}/contents/${repoPath}`;

    try {
      console.log(`[Git-Sync] Pulling latest posts.json from repository '${repo}' path '${repoPath}' on branch '${branch}'...`);

      const res = await fetch(`${url}?ref=${branch}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/vnd.github.v3+json",
          "User-Agent": "JaaGa-Blog-Sync",
        },
      });

      if (res.status === 401 && i < candidates.length - 1) {
        console.warn(`[Git-Sync] Candidate token ${i + 1} returned 401 Unauthorized. Trying alternative candidate token...`);
        lastError = "Unauthorized (Status: 401)";
        continue;
      }

      if (res.ok) {
        const data = await res.json() as { content: string; encoding: string };
        if (data.encoding === "base64" && data.content) {
          const decodedString = Buffer.from(data.content, "base64").toString("utf8");
          const parsedPosts = JSON.parse(decodedString);

          if (Array.isArray(parsedPosts)) {
            // Write to local disk to keep development mode in sync
            const parentDir = path.dirname(resolvedLocalPath);
            if (!fs.existsSync(parentDir)) {
              fs.mkdirSync(parentDir, { recursive: true });
            }
            fs.writeFileSync(resolvedLocalPath, JSON.stringify(parsedPosts, null, 2), "utf8");
            console.log(`[Git-Sync] Automatically synchronized local database from GitHub with ${parsedPosts.length} posts!`);

            // If an alternative candidate succeeded, promote it as primary saved config
            if (i > 0) {
              console.log("[Git-Sync] Alternative token succeeded. Promoting to primary saved configuration.");
              saveGitHubConfig(config);
            }

            return {
              success: true,
              message: `Successfully synchronized ${parsedPosts.length} posts from GitHub! Your local database is now identical to the remote.`,
              data: parsedPosts,
            };
          }
        }
        return {
          success: false,
          message: "File found on GitHub but could not be parsed as a valid posts array.",
        };
      } else if (res.status === 404) {
        return {
          success: false,
          message: "No database found on GitHub at specified path. It will be created on your first blog save/sync.",
        };
      } else {
        const errMsg = await res.text();
        if (res.status === 401 && i < candidates.length - 1) {
          console.warn(`[Git-Sync] Candidate token ${i + 1} failed with 401. Trying next candidate...`);
          lastError = errMsg;
          continue;
        }
        return {
          success: false,
          message: `Failed to fetch from GitHub (Status: ${res.status}). ${errMsg}`,
        };
      }
    } catch (error: any) {
      console.error("[Git-Sync] Unexpected error during GitHub pull:", error);
      lastError = error?.message || String(error);
    }
  }

  return {
    success: false,
    message: `GitHub sync pull failed across all candidate credentials: ${lastError}`,
  };
}

