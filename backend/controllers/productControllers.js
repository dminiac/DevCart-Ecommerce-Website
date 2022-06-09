import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products/
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

// @desc    Fetch single products
// @route   GET /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc    Delete product by Id
// @route   DELETE /api/products/admin/:id
//@access   Private only admin
const deleteProductById = asyncHandler(async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	if (product) {
		await product.delete();
		res.send("Product deleted successfully");
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body.product;
	console.log(name, price, description, image, brand, category, countInStock);
	const product = new Product({
		user: req.user._id,
		name,
		price,
		description,
		image,
		brand,
		category,
		countInStock,
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, brand, category, countInStock } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.brand = brand;
		product.category = category;
		product.countInStock = countInStock;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error("Product not found");
	}
});

export {
	getProducts,
	getProductById,
	deleteProductById,
	createProduct,
	updateProduct,
};
