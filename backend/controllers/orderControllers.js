import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @desc    Place Order
// @route   POST /api/orders/
//@access   Private
const placeOrder = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;
	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No items found for order");
		return;
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const placedOrder = await order.save();
		res.send(placedOrder);
	}
});

// @desc    Get Order By Id
// @route   get /api/orders/:orderId
//@access   Private
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		"user",
		"name email"
	);
	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("No Order found");
	}
});
// @desc    Update order to paid
// @route   get /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		const updatedOrder = await order.save();
		// console.log(updatedOrder);
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
	
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isDelivered = true;
		order.deliveredAt = Date.now();

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

//@desc     Get Logged In user orders
//@routes   GET /api/orders/myorders
//@access   PRIVATE
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });

	res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({}).populate("user", "id name");
	res.json(orders);
});

export {
	placeOrder,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
};
