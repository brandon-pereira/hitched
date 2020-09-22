import express from "express";

const router = express.Router();

router.get("/api/users", (req, res) => {
  res.send("hi");
});

export default router;
