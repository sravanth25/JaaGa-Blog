import app from "./app";
import { logger } from "./lib/logger";

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(port, "0.0.0.0", () => {
  logger.info({ host: "0.0.0.0", port }, "Server listening");
});
