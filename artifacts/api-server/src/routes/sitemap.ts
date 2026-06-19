import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import initialPosts from "../../data/posts.json" assert { type: "json" };

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
const BASE_URL = "https://blog.jaaga.ai";

const sitemapRouter = Router();

sitemapRouter.get("/sitemap.xml", (_req, res) => {
  try {
    let posts: Array<{ slug: string }> = [];
    
    try {
      if (fs.existsSync(dataFilePath)) {
        posts = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
      }
    } catch (e) {
      console.warn("Failed to read posts from disk for sitemap", e);
    }

    if (!posts || posts.length === 0) {
      posts = initialPosts as Array<{ slug: string }>;
    }

    const now = new Date().toISOString();

    const staticUrls = [
      { loc: BASE_URL, priority: "1.0", changefreq: "daily" },
      { loc: `${BASE_URL}/blogs`, priority: "0.95", changefreq: "daily" },
      { loc: `${BASE_URL}/about`, priority: "0.8", changefreq: "monthly" },
      { loc: `${BASE_URL}/contact-us`, priority: "0.7", changefreq: "monthly" },
    ];

    const postUrls = posts.map((p) => ({
      loc: `${BASE_URL}/blogs/${p.slug}`,
      priority: "0.9",
      changefreq: "weekly",
    }));

    const allUrls = [...staticUrls, ...postUrls];

    const urlEntries = allUrls
      .map(
        (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  } catch (err) {
    res.status(500).send("Failed to generate sitemap");
  }
});

export default sitemapRouter;
