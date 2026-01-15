import express from "express";
import { protect } from "../middlewares/authMiddleware.js";


import { createReview, 
    myReviews,
    getReviewById,
    updateReview,
    deleteReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/my", protect, myReviews);
router.get("/:id", protect, getReviewById);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);


export default router;
