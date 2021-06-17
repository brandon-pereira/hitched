import express from "express";
import bodyParser from "body-parser";

import initAdminRoutes from "./routes/admin";
import initLookupRoutes from "./routes/lookup";
import initRsvpRoutes from "./routes/rsvp";

function initRouter(opts) {
  const router = express.Router();

  router.use(bodyParser.json());

  initAdminRoutes({ ...opts, router });
  initLookupRoutes({ ...opts, router });
  initRsvpRoutes({ ...opts, router });

  return router;
}

export default initRouter;
