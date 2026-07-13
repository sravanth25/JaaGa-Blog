import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
// @ts-ignore — pino-http typing workaround
const pinoHttpMiddleware = (pinoHttp as any).default ?? pinoHttp;
import router from "./routes";
import sitemapRouter from "./routes/sitemap";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttpMiddleware({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(sitemapRouter);
app.use("/api", router);

// Serve static frontend files if built
import path from "node:path";
import fs from "node:fs";

let staticPath = path.resolve(process.cwd(), "artifacts/jaaga/dist/public");
if (!fs.existsSync(staticPath)) {
  const tryPath = path.resolve(process.cwd(), "../../artifacts/jaaga/dist/public");
  if (fs.existsSync(tryPath)) {
    staticPath = tryPath;
  }
}

if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
  
  app.get("*", (req, res) => {
    let cleanPath = req.path;
    if (cleanPath.endsWith("/") && cleanPath.length > 1) {
      cleanPath = cleanPath.slice(0, -1);
    }

    const htmlFilePath = path.join(staticPath, cleanPath + ".html");
    if (fs.existsSync(htmlFilePath) && fs.statSync(htmlFilePath).isFile()) {
      return res.sendFile(htmlFilePath);
    }

    const indexFilePath = path.join(staticPath, cleanPath, "index.html");
    if (fs.existsSync(indexFilePath) && fs.statSync(indexFilePath).isFile()) {
      return res.sendFile(indexFilePath);
    }

    const error404Path = path.join(staticPath, "404.html");
    if (fs.existsSync(error404Path)) {
      return res.status(404).sendFile(error404Path);
    }
    res.status(404).send("Not Found");
  });
}

export default app;
