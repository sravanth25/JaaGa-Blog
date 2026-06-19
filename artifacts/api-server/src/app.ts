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

const staticPath = path.resolve(process.cwd(), "artifacts/jaaga/dist/public");
if (fs.existsSync(staticPath)) {
  app.use(express.static(staticPath));
  
  app.get("*all", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

export default app;
