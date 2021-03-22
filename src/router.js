import express from "express";
import initAdminRoutes from "./routes/admin";

function initRouter({ db }) {
  const router = express.Router();

  router.get("/api/users", async (req, res) => {
    console.log(db);
    const users = await db.Guest.find({});
    // const stats = await countUsers(users);

    res.json({
      success: true,
      users,
      stats: 0,
    });
  });

  initAdminRoutes({ db, router });

  return router;
}

export default initRouter;
