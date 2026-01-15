import express from "express";
import { getPackages } from "../controllers/packageController.js";

const router = express.Router();

// GET /packages
router.get("/", getPackages);

export default router;
