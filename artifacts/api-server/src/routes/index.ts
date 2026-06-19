import { Router, type IRouter } from "express";
import healthRouter from "./health";
import postsRouter from "./posts";
import sitemapRouter from "./sitemap";
import chatRouter from "./chat";

const router: IRouter = Router();

router.use(healthRouter);
router.use(postsRouter);
router.use(chatRouter);

export default router;

export { sitemapRouter };
