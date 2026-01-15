import express from "express";
import fs from "fs";
import path from "path";

import { protect } from "../middlewares/authMiddleware.js";
import upload from "../config/multer.js";
import Review from "../models/Review.js";

const router = express.Router();


router.post("/resume", protect, upload.single("resume"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded. Use key resume." });
  }

  res.status(201).json({
    message: "Resume uploaded successfully",
    file: req.file.path
  });
});



router.put("/resume/:reviewId", protect, upload.single("resume"), async (req, res) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) return res.status(404).json({ message: "Review not found" });

  // only owner can replace resume
  if (String(review.userId) !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  // Delete old resume if stored locally
  if (review.resumeUrl && fs.existsSync(review.resumeUrl)) {
    fs.unlinkSync(review.resumeUrl);
  }

  review.resumeUrl = req.file.path;
  await review.save();

  res.json({
    message: "Resume replaced successfully",
    resumeUrl: review.resumeUrl
  });
});


router.get("/resume/:reviewId", protect, async (req, res) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) return res.status(404).json({ message: "Review not found" });

  
  if (
    String(review.userId) !== req.user.id &&
    String(review.expertId) !== req.user.id &&
    req.user.role !== "ADMIN"
  ) {
    return res.status(403).json({ message: "Not allowed" });
  }

  if (!review.resumeUrl || !fs.existsSync(review.resumeUrl)) {
    return res.status(404).json({ message: "Resume file not found" });
  }

  res.download(path.resolve(review.resumeUrl));
});


router.delete("/resume/:reviewId", protect, async (req, res) => {
  const review = await Review.findById(req.params.reviewId);

  if (!review) return res.status(404).json({ message: "Review not found" });

  if (String(review.userId) !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  if (review.resumeUrl && fs.existsSync(review.resumeUrl)) {
    fs.unlinkSync(review.resumeUrl);
  }

  review.resumeUrl = "";
  await review.save();

  res.json({ message: "Resume deleted successfully" });
});

export default router;
