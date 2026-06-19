import { execSync } from "child_process";
import { cpSync, existsSync, mkdirSync, copyFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const apiServerDir = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = resolve(apiServerDir, "../..");

console.log("Installing dependencies...");
execSync("pnpm install --no-frozen-lockfile", {
  stdio: "inherit",
  cwd: workspaceRoot,
});

console.log("Building frontend...");
execSync("pnpm --filter @workspace/jaaga run build:vercel", {
  stdio: "inherit",
  cwd: workspaceRoot,
});

const src = resolve(workspaceRoot, "artifacts/jaaga/dist");
const dest = resolve(apiServerDir, "dist");

if (!existsSync(src)) {
  console.error("Build output not found at:", src);
  process.exit(1);
}

console.log("Copying build output to", dest);
if (!existsSync(dest)) mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });

// Copy data/posts.json so serverless functions can read it if it exists at the workspace root
const dataDir = resolve(apiServerDir, "data");
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });

const workspacePosts = resolve(workspaceRoot, "data/posts.json");
if (existsSync(workspacePosts)) {
  console.log("Copying posts.json from workspace root...");
  copyFileSync(workspacePosts, resolve(dataDir, "posts.json"));
} else {
  console.log("Keeping local artifacts/api-server/data/posts.json (no workspace root data/posts.json found).");
}

console.log("Done.");
