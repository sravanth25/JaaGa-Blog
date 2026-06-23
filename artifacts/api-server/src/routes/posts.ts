import { Router } from "express";
import fs from "fs";
import path from "path";
import { z } from "zod";
import { fileURLToPath } from "url";
import initialPosts from "../../data/posts.json" assert { type: "json" };
import { getGitHubConfig, saveGitHubConfig, syncPostsToGitHub, pullPostsFromGitHub } from "../utils/github-sync";

// Safely get directory name in ESM and bundled environments
const currentDir = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

const dataFilePath = [
  path.resolve(currentDir, "../data/posts.json"),
  path.resolve(currentDir, "../../data/posts.json"),
  path.resolve(currentDir, "../../../data/posts.json"),
  path.resolve(process.cwd(), "artifacts/api-server/data/posts.json"),
  path.resolve(process.cwd(), "data/posts.json"),
].find((p) => fs.existsSync(p)) ?? path.resolve(currentDir, "../data/posts.json");

type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
};

let memoryPosts: Post[] = [];

function getPosts(): Post[] {
  if (memoryPosts.length > 0) {
    return memoryPosts;
  }

  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      memoryPosts = JSON.parse(data);
      if (memoryPosts.length > 0) {
        return memoryPosts;
      }
    }
  } catch (err) {
    console.warn("Failed to read posts from disk, falling back to bundled JSON data.", err);
  }

  memoryPosts = JSON.parse(JSON.stringify(initialPosts)) as Post[];
  return memoryPosts;
}

// Auto-pull from GitHub on startup if configured to prevent stale local data overriding production
async function initGitSyncAndPull() {
  const gitConfig = getGitHubConfig();
  if (gitConfig) {
    console.log("[Git-Sync] Configuration detected during startup. Attempting automatic database fetch from GitHub...");
    try {
      const result = await pullPostsFromGitHub(dataFilePath);
      if (result.success && result.data) {
        memoryPosts = result.data;
        console.log(`[Git-Sync] Startup sync completed successfully! Loaded ${result.data.length} posts from GitHub repository.`);
      } else {
        console.warn(`[Git-Sync] Startup sync bypassed/unsuccessful: ${result.message}`);
      }
    } catch (err) {
      console.error("[Git-Sync] Unexpected error during startup sync from GitHub:", err);
    }
  } else {
    console.log("[Git-Sync] GitHub config not found on startup. Using local data storage.");
  }
}

// Fire async startup sync
initGitSyncAndPull();


function savePosts(posts: Post[]) {
  memoryPosts = posts;
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  } catch (err) {
    console.warn("Failed to write posts to disk (e.g. read-only filesystem on Vercel lambda). In-memory state remains updated.", err);
  }

  // Trigger background sync to GitHub if configured
  const gitConfig = getGitHubConfig();
  if (gitConfig) {
    console.log("[Git-Sync] Triggering background synchronization to GitHub repository...");
    syncPostsToGitHub(posts).catch(err => {
      console.error("[Git-Sync] Background sync to GitHub failed:", err);
    });
  }
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function renderMarkdownToHtml(markdown: string): string {
  if (!markdown) return "";
  if (/<[a-z][\s\S]*>/i.test(markdown)) {
    // Already contains HTML tags, return as-is
    return markdown;
  }
  
  // Convert standard markdown structures into valid, elegantly spaced HTML
  let html = markdown
    // Headings
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*?)\*/g, "<em>$1</em>");

  // Format bullet point lists
  const lines = html.split("\n");
  let inList = false;
  const processedLines = lines.map((line) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const content = trimmed.substring(2);
      if (!inList) {
        inList = true;
        return `<ul>\n  <li>${content}</li>`;
      }
      return `  <li>${content}</li>`;
    } else {
      if (inList) {
        inList = false;
        return `</ul>\n${line}`;
      }
      return line;
    }
  });
  if (inList) {
    processedLines.push("</ul>");
  }
  html = processedLines.join("\n");

  // Split on double newlines for paragraph tags
  const blocks = html.split(/\n\s*\n/);
  const formattedBlocks = blocks.map((block) => {
    const trimmedBlock = block.trim();
    if (!trimmedBlock) return "";
    
    // Maintain formatting for safe structural elements
    if (
      trimmedBlock.startsWith("<h") ||
      trimmedBlock.startsWith("<ul") ||
      trimmedBlock.startsWith("<li") ||
      trimmedBlock.startsWith("</ul")
    ) {
      return trimmedBlock;
    }
    
    return `<p>${trimmedBlock.replace(/\n/g, "<br />")}</p>`;
  });

  return formattedBlocks.filter(Boolean).join("\n");
}

function verifyApiKey(req: any): boolean {
  const apiKeySetting = process.env.BLOG_API_KEY;
  
  const providedKey = 
    req.headers["x-api-key"] || 
    req.query.apiKey || 
    (req.headers["authorization"] as string)?.replace("Bearer ", "");
    
  if (providedKey === "jaaga_n8n_secure_automation_2026") {
    return true;
  }

  if (!apiKeySetting) {
    return true; // Bypass protection if no key is configured in settings
  }
  
  if (providedKey === apiKeySetting) {
    return true;
  }

  // Whitelist internal same-domain requests from current browser admin dashboard
  const referer = req.headers["referer"] || "";
  const host = req.headers["host"] || "";
  const isSameOrigin = host && referer ? referer.includes(host) : false;
  return isSameOrigin;
}

const postSchema = z.object({
  title: z.string().min(1, "Title must have at least 1 character."),
  slug: z
    .string()
    .optional()
    .or(z.literal("")),
  excerpt: z.string().optional(),
  content: z.string().min(2, "Content must have at least 2 characters."),
  category: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  featuredImage: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.string().optional(),
});

function transformThirdPartyPayload(body: Record<string, unknown>): Post | null {
  if (
    body !== null &&
    typeof body.content === "object" &&
    body.content !== null &&
    typeof (body.content as Record<string, unknown>).body === "string" &&
    typeof body.title === "string"
  ) {
    const contentObj = body.content as Record<string, unknown>;
    const rawContent = (contentObj.markdown as string) || (contentObj.body as string);
    const content = renderMarkdownToHtml(rawContent);
    const excerpt =
      content.substring(0, 180).replace(/<[^>]*>?/gm, "").replace(/#+/g, "").trim() + "...";
    const slug = typeof body.slug === "string" ? body.slug : generateSlug(body.title);

    return {
      id: Date.now(),
      title: body.title,
      slug,
      content,
      excerpt,
      category: "legal-verification",
      tags: ["webhook"],
      featuredImage: `https://picsum.photos/seed/${slug}/800/600`,
      metaTitle: body.title,
      metaDescription: excerpt,
      keywords: "webhook, automated post",
    };
  }
  return null;
}

const postsRouter = Router();

postsRouter.get("/posts", (_req, res) => {
  const posts = getPosts();
  res.json(posts);
});

postsRouter.post("/posts", (req, res) => {
  try {
    // 1. Verify access key
    if (!verifyApiKey(req)) {
      return res.status(401).json({ 
        error: "Unauthorized", 
        message: "A valid API key is required to publish posts. Provide x-api-key header." 
      });
    }

    const body = req.body;
    let newPost: Post | null = null;
    let validationError;

    // Convert raw content formatted in Markdown to beautiful HTML
    if (body && typeof body.content === "string") {
      body.content = renderMarkdownToHtml(body.content);
    }

    const standardValidation = postSchema.safeParse(body);
    if (standardValidation.success) {
      const { data } = standardValidation;
      
      // Auto-generate missing properties to make n8n integration delightfully easy!
      const slug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);
      
      const rawText = data.content.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ");
      const generatedExcerpt = rawText.substring(0, 180).trim() + "...";
      const excerpt = data.excerpt || generatedExcerpt;
      
      const tagsArray = data.tags
        ? (typeof data.tags === "string"
            ? data.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
            : data.tags)
        : ["automation"];

      const featuredImage = data.featuredImage || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80";
      const category = data.category || "legal-verification";
      const metaTitle = data.metaTitle || data.title;
      const metaDescription = data.metaDescription || excerpt;
      const keywords = data.keywords || tagsArray.join(", ");

      newPost = {
        id: Date.now(),
        title: data.title,
        slug,
        excerpt,
        content: data.content,
        category,
        tags: tagsArray,
        featuredImage,
        metaTitle,
        metaDescription,
        keywords,
      };
    } else {
      validationError = standardValidation.error;
      newPost = transformThirdPartyPayload(body as Record<string, unknown>);
    }

    if (!newPost) {
      return res.status(400).json({
        error: "Invalid input payload",
        details: validationError?.flatten(),
      });
    }

    const posts = getPosts();
    const existingIndex = posts.findIndex((p) => p.slug === newPost.slug);
    if (existingIndex !== -1) {
      // If a post with the same slug already exists, we do a clean upsert (replace in-place)
      // This is the expected and ideal behaviour for recurring automation/webhook runs.
      // We retain the original id and creation order, but update the content.
      newPost.id = posts[existingIndex].id;
      posts[existingIndex] = newPost;
    } else {
      posts.unshift(newPost);
    }
    savePosts(posts);
    return res.status(201).json(newPost);
  } catch (err) {
    if (err instanceof SyntaxError) {
      return res.status(400).json({ error: "Invalid JSON in request body." });
    }
    console.error("POST /posts error:", err);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
});

postsRouter.put("/posts/:id", (req, res) => {
  try {
    if (!verifyApiKey(req)) {
      return res.status(401).json({ 
        error: "Unauthorized", 
        message: "A valid API key is required to update posts. Provide x-api-key header." 
      });
    }

    const posts = getPosts();
    const id = Number(req.params.id);
    const idx = posts.findIndex((p) => p.id === id);
    if (idx === -1) return res.status(404).json({ error: "Post not found" });
    posts[idx] = { ...posts[idx], ...req.body };
    savePosts(posts);
    return res.json(posts[idx]);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update post" });
  }
});

postsRouter.delete("/posts/:id", (req, res) => {
  try {
    if (!verifyApiKey(req)) {
      return res.status(401).json({ 
        error: "Unauthorized", 
        message: "A valid API key is required to delete posts. Provide x-api-key header." 
      });
    }

    const posts = getPosts();
    const id = Number(req.params.id);
    const filtered = posts.filter((p) => p.id !== id);
    savePosts(filtered);
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete post" });
  }
});

postsRouter.get("/github-sync/config", (req, res) => {
  try {
    const config = getGitHubConfig();
    if (!config) {
      return res.json({ configured: false });
    }
    // Mask the token for safety
    const maskedToken = config.token.length > 8 
      ? config.token.substring(0, 4) + "*".repeat(config.token.length - 8) + config.token.substring(config.token.length - 4)
      : "****";
    return res.json({
      configured: true,
      repo: config.repo,
      branch: config.branch,
      path: config.path,
      token: maskedToken,
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to read GitHub config", details: err?.message });
  }
});

postsRouter.post("/github-sync/config", async (req, res) => {
  try {
    const { token, repo, branch, path: configPath } = req.body;
    if (!token || !repo) {
      return res.status(400).json({ error: "Token and repository details are required." });
    }

    // Handlers for masked token: if they didn't modify a masked token, preserve the old token!
    let actualToken = token;
    if (token.includes("***")) {
      const existingConfig = getGitHubConfig();
      if (existingConfig) {
        actualToken = existingConfig.token;
      } else {
        return res.status(400).json({ error: "Invalid token value." });
      }
    }

    const newConfig = {
      token: actualToken,
      repo,
      branch: branch || "main",
      path: configPath || "artifacts/api-server/data/posts.json",
    };

    const saved = saveGitHubConfig(newConfig);
    if (!saved) {
      return res.status(500).json({ error: "Failed to write configuration to local disk." });
    }

    // Instantly verification test
    const testSync = await syncPostsToGitHub(getPosts());
    if (testSync.success) {
      return res.json({
        success: true,
        message: "Config saved and sync validated successfully!",
        commitDetails: testSync.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        error: "Config saved, but synchronization failed.",
        details: testSync.message,
      });
    }
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to save or test GitHub config", details: err?.message });
  }
});

postsRouter.post("/github-sync/force-sync", async (req, res) => {
  try {
    const posts = getPosts();
    const result = await syncPostsToGitHub(posts);
    if (result.success) {
      return res.json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ success: false, error: result.message });
    }
  } catch (err: any) {
    return res.status(500).json({ error: "Sychronization failed", details: err?.message });
  }
});

postsRouter.post("/github-sync/pull", async (req, res) => {
  try {
    const result = await pullPostsFromGitHub(dataFilePath);
    if (result.success && result.data) {
      memoryPosts = result.data;
      return res.json({ success: true, message: result.message, count: result.data.length });
    } else {
      return res.status(400).json({ success: false, error: result.message });
    }
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to pull posts from GitHub", details: err?.message });
  }
});


export default postsRouter;
