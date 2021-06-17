import "dotenv/config";
import express from "express";

import database from "./database";
import hitched from "../src";

const app = express();

app.get("/", (req, res) => {
  res.send('<a href="/admin">Admin Panel</a>');
});

app.use(
  hitched({
    database,
    options: {
      emails: {
        templates: "./demo/templates/*.html",
        emailSender: process.env.AWS_SES_EMAIL_SOURCE,
        emailReplyAddress: process.env.EMAIL_REPLY_ADDRESS,
        calendarAttachment: {
          domain: "hitched-demo.com",
          prodId: "//hitched-demo.com//ical-generator//EN",
          events: [
            {
              start: new Date(Date.UTC(2021, 3, 23, 20)),
              end: new Date(Date.UTC(2021, 3, 24, 8)),
              summary: "Test & Test's Wedding",
            },
          ],
        },
      },
      admin: {
        accounts: {
          admin: "hitched",
        },
      },
    },
  })
);

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
