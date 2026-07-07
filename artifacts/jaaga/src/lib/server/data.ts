// src/lib/server/data.ts (server-only)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import type { Post } from "../types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// This file is in: /artifacts/jaaga/src/lib/server/data.ts
const monorepoRoot = path.resolve(__dirname, "../../../../");

export function getPosts(): Post[] {
  const pathsToTry = [
    "/artifacts/api-server/data/posts.json",
    path.resolve(process.cwd(), "../api-server/data/posts.json"),
    path.join(monorepoRoot, "artifacts/api-server/data/posts.json"),
    path.join(monorepoRoot, "data/posts.json"),
    path.join(process.cwd(), "artifacts/api-server/data/posts.json"),
    path.join(process.cwd(), "data/posts.json"),
  ];

  let filePath = "";
  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) {
    console.warn("Could not find posts.json in any of the expected paths:", pathsToTry);
    return [];
  }

  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function savePosts(posts: Post[]) {
  const pathsToTry = [
    "/artifacts/api-server/data/posts.json",
    path.resolve(process.cwd(), "../api-server/data/posts.json"),
    path.join(monorepoRoot, "artifacts/api-server/data/posts.json"),
    path.join(monorepoRoot, "data/posts.json"),
    path.join(process.cwd(), "artifacts/api-server/data/posts.json"),
    path.join(process.cwd(), "data/posts.json"),
  ];

  let filePath = pathsToTry[0]; // default to first
  for (const p of pathsToTry) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  // Ensure parent directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
}
