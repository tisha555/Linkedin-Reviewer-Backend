import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { checkoutPayment, myPayments, paymentWebhook } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/checkout", protect, checkoutPayment);
router.get("/my", protect, myPayments);
router.post("/webhook", paymentWebhook);

export default router;

