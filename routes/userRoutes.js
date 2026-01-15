import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createUser,
getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  changePassword,
  deleteMe
} from "../controllers/userController.js";

const router = express.Router();
// For password User login
router.post("/", createUser);
router.get("/me", protect, getMe);
router.put("/me", protect, updateMe);
router.put("/change-password", protect, changePassword);
router.delete("/me", protect, deleteMe);

router.get("/", protect, getUsers);


router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);


export default router;

