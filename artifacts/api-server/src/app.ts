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

// Define 301 redirects for renamed blog posts to match vercel.json
const redirectsMap: Record<string, string> = {
  "/blogs/how-to-download-certified-encumbrance-certificate-ec-telangana-guide": "/blogs/how-to-download-encumbrance-certificate-ec-in-telangana",
  "/blogs/how-to-download-mutation-certificate-in-telangana-jaaga": "/blogs/apply-for-property-mutation-in-telangana-complete-guide-2025",
  "/blogs/how-to-download-fmb-village-maps-andhra-pradesh-online": "/blogs/how-to-download-andhra-pradesh-certified-copy-online-using-jaaga",
  "/blogs/how-to-download-telangana-pattadar-passbook-pahani-online": "/blogs/download-telangana-ec-ror-pahani-jaaga-app",
  "/blogs/ts-electricity-bill-name-change-tgspdcl": "/blogs/tgspdcl-electricity-bill-name-change-hyderabad",
  "/blogs/retrieve-property-documents-online": "/blogs/property-title-search-india-find-locate-property-ownership",
};

app.use((req, res, next) => {
  let cleanPath = req.path;
  if (cleanPath.endsWith("/") && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1);
  }
  const destination = redirectsMap[cleanPath];
  if (destination) {
    return res.redirect(301, destination);
  }
  next();
});

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
