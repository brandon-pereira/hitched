import express from "express";

import database from "./database";

import hitched from "../src";

const app = express();

app.get("/", (req, res) => {
  res.send('<a href="/api/users">Hitched</a>');
});

app.use(
  hitched({
    database,
  })
);

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
