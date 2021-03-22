import express from "express";
import basicAuth from "express-basic-auth";

function initAdminRoutes({ db, router }) {
  router.use(
    ["/api/admin", "/admin"],
    basicAuth({
      users: { admin: "a" },
      challenge: true,
    })
  );

  if (process.env.NODE_END !== "production") {
    //https://github.com/parcel-bundler/parcel/issues/3098
    const Bundler = require("parcel-bundler");
    const bundler = new Bundler("src/admin/index.html", {
      publicUrl: "/admin/",
    });
    const parcel_middleware = bundler.middleware();
    router.use("/admin", function (req, res, next) {
      console.log(req.url, req.originalUrl);
      req.url = req.originalUrl;
      parcel_middleware(req, res, next);
    });
  } else {
    router.use("/admin", express.static("./src/admin"));
  }

  return router;
}

export default initAdminRoutes;
