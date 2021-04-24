import express from "express";
import bodyParser from "body-parser";

import initAdminRoutes from "./routes/admin";

function initRouter(opts) {
  const router = express.Router();

  router.use(bodyParser.json());

  initAdminRoutes({ ...opts, router });

  return router;
}

export default initRouter;
