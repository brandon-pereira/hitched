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
    config: {
      admin: {
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
