import express from "express";
import basicAuth from "express-basic-auth";
import _get from "lodash.get";
import path from "path";

function initAdminRoutes({ db, config, mailer, router }) {
  router.use(
    ["/api/admin", "/admin"],
    basicAuth({
      users: _get(config, "admin.accounts", { admin: "hitched" }),
      challenge: true,
    })
  );

  if (process.env.HITCHED_ENV === "development") {
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
    router.use("/admin", express.static(path.resolve(__dirname, "../../dist")));
  }

  router.get("/api/admin/email/templates", async (req, res) => {
    try {
      const templates = await mailer.getTemplates();

      res.json(templates);
    } catch (err) {
      res.status(500).json({ success: false, error: err.toString() });
    }
  });

  router.post("/api/admin/email", async (req, res) => {
    try {
      console.log(req.body);
      const emails = req.body.emails;
      const templateId = req.body.templateId;
      const subject = req.body.subject;
      const sendCalendarAttachment = req.body.sendCalendarAttachment || false;
      if (!emails || !templateId || !subject) {
        throw new Error("Missing params");
      }
      const allEmails = emails.map(async (email) => {
        const user = await db.Guest.findOne({ email });
        if (!user) {
          throw new Error("Invalid email");
        }
        const html = await mailer.useTemplate(templateId, user.toObject());
        await mailer.sendMail({
          to: user.email,
          subject,
          html,
          sendCalendarAttachment,
        });
      });
      await Promise.all(allEmails);
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
    try {
      const guests = await db.Guest.find({});
      res.json(guests || []);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err });
    }
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
