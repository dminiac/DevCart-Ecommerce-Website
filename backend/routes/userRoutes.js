import express from "express";
import {
	authUser,
	getUserProfile,
	updateUserProfile,
	registerUser,
	deleteUser,
	listAllUsers,
	getUserProfileById,
	updateUser,
} from "../controllers/userControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin/:id", protect, admin, getUserProfileById);
router.put("/admin/:id", protect, admin, updateUser);
router.get("/all", protect, admin, listAllUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/delete/:id", protect, admin, deleteUser);

export default router;
