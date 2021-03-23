import express from "express";
import initAdminRoutes from "./routes/admin";

function initRouter({ db }) {
  const router = express.Router();

  router.get("/api/admin/guests", async (req, res) => {
    console.log(db);
    const guests = await db.Guest.find({});
    // const stats = await countUsers(users);

    res.json({
      success: true,
      guests,
      stats: 0,
    });
  });

  initAdminRoutes({ db, router });

  return router;
}

export default initRouter;
