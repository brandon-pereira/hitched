import express from "express";
import "dotenv/config";

import database from "./database";

import hitched from "../src";

const app = express();

app.get("/", (req, res) => {
  res.send('<a href="/admin">Admin Panel</a>');
});

app.use(
  hitched({
    database,
    config: {
      admin: {
        emailTemplates: "./demo/templates/*.html",
        users: {
          admin: "hitched",
        },
      },
    },
  })
);

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
