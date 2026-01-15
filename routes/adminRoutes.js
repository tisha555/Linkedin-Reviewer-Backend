import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { allowRoles } from "../middlewares/roleMiddleware.js";
import { createPackage } from "../controllers/packageController.js";


import {
  getAllUsers,
  getAllReviews,
  assignExpert,
  reassignExpert,
  changeUserRole,
  blockUnblockUser
} from "../controllers/adminController.js";

const router = express.Router();

// ✅ Protect all admin routes
router.use(protect, allowRoles("ADMIN"));

router.get("/users", getAllUsers);
router.get("/reviews", getAllReviews);

router.post("/reviews/:id/assign", assignExpert);
router.put("/reviews/:id/reassign", reassignExpert);

router.put("/users/:id/role", changeUserRole);
router.put("/users/:id/status", blockUnblockUser);

router.post("/packages", createPackage);



export default router;
