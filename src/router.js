import express from "express";
import bodyParser from "body-parser";

import initAdminRoutes from "./routes/admin";

function initRouter({ db }) {
  const router = express.Router();

  router.use(bodyParser.json());

  initAdminRoutes({ db, router });

  return router;
}

export default initRouter;
