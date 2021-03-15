import express from "express";

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

  return router;
}

export default initRouter;
