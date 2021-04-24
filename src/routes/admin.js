import express from "express";
import basicAuth from "express-basic-auth";
import _get from "lodash.get";

function initAdminRoutes({ db, config, router }) {
  router.use(
    ["/api/admin", "/admin"],
    basicAuth({
      users: _get(config, "admin.users", { admin: "hitched" }),
      challenge: true,
    })
  );

  if (process.env.NODE_END !== "production") {
    //https://github.com/parcel-bundler/parcel/issues/3098
    const Bundler = require("parcel-bundler");
    const bundler = new Bundler("src/admin/index.html", {
      publicUrl: "/admin/",
      // logLevel: "2",
    }).middleware();
    router.use("/admin", function (req, res, next) {
      req.url = req.originalUrl;
      bundler(req, res, next);
    });
  } else {
    router.use("/admin", express.static("./src/admin"));
  }

  router.get("/api/admin/guests", async (req, res) => {
    const guests = await db.Guest.find({});
    res.json({
      success: true,
      guests: guests || [],
    });
  });

  router.put("/api/admin/guests", async (req, res) => {
    try {
      console.log(req.body);
      const guest = new db.Guest(req.body);
      await guest.save();
      res.json({
        success: true,
        guest,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  });

  return router;
}

export default initAdminRoutes;
