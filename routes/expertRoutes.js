import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { assignedReviews, submitFeedback } from "../controllers/expertController.js";

const router = express.Router();

router.get("/reviews", protect, allowRoles("EXPERT"), assignedReviews);
router.post("/reviews/:id/feedback", protect, allowRoles("EXPERT"), submitFeedback);

export default router;
