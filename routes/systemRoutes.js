import express from "express";

const router = express.Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server healthy " });
});

router.get("/version", (req, res) => {
  res.json({ version: "1.0.0", name: "LinkedInReviewer API" });
});

export default router;
