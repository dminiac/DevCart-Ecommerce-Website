import express from "express";
import {
	getProducts,
	getProductById,
	deleteProductById,
	createProduct,
	updateProduct,
} from "../controllers/productControllers.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts);
router.get("/create", createProduct);
router.delete("/admin/:id", protect, admin, deleteProductById);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, updateProduct);

export default router;
