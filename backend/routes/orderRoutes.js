import express from "express";
import {
	placeOrder,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
} from "../controllers/orderControllers.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/myorders", protect, getMyOrders);
router.get("/get/:id", protect, getOrderById);
router.get("/pay/:id", protect, updateOrderToPaid);

router.get("/deliver/:id", protect, updateOrderToDelivered);

export default router;
