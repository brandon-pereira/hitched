import express from "express";
import basicAuth from "express-basic-auth";
import _get from "lodash.get";

function initAdminRoutes({ db, config, mailer, router }) {
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

  router.get("/api/admin/emails", async (req, res) => {
    try {
      const templates = await mailer.getEmailTemplates();

      res.json({
        templates,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  });

  router.get("/api/admin/email/:template", async (req, res) => {
    try {
      const email = req.query.email;
      const params = req.params.template;
      if (!email || !params) {
        throw new Error("Missing params");
      }
      const user = await db.Guest.findOne({ email: req.query.email });
      if (!user) {
        throw new Error("Invalid email");
      }
      const template = await mailer.useTemplate("invite", user.toObject());

      return res.send(template);
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, error: err ? err.toString() : null });
    }
  });

  router.post("/api/admin/email", async (req, res) => {
    try {
      const email = req.params.email;
      const params = req.params.template;
      if (!email || !params) {
        throw new Error("Missing params");
      }
      const user = await db.Guest.findOne({ email: req.query.email });
      if (!user) {
        throw new Error("Invalid email");
      }
      const template = await mailer.useTemplate("invite", user.toObject());
      await mailer.sendMail({
        to: user.email,
        subject: "Reminder: Emma & Brandon's Wedding Postponed!",
        html: template,
      });
      return res.send({
        success: true,
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, error: err ? err.toString() : null });
    }
  });

  router.get("/api/admin/guests", async (req, res) => {
    const guests = await db.Guest.find({});
    res.json({
      success: true,
      guests: guests || [],
    });
  });

  router.put("/api/admin/guests", async (req, res) => {
    try {
      console.log("Create Guest", req.body);
      const guest = new db.Guest(req.body);
      await guest.save();
      res.json({
        success: true,
        guest,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    }
  });

  router.post("/api/admin/guests", async (req, res) => {
    try {
      console.log("Modify Guest", req.body);
      const guest = await db.Guest.findById(req.body._id);
      guest.set(req.body);

      await guest.save();
      res.json({
        success: true,
        guest,
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err });
    }
  });

  router.delete("/api/admin/guests/:guestId", async (req, res) => {
    try {
      const guest = await db.Guest.deleteOne({ id: req.body._id });

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
