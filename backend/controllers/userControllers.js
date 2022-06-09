import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user and get token
// @route   GET /api/users/login
//@access   Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	// res.send({ email, password });
	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else throw new Error("Invalid email or password");
});

// @desc    get user profile
// @route   GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = User.findById(req.user._id).select("-password");
	if (user) {
		res.json({
			_id: req.user._id,
			name: req.user.name,
			email: req.user.email,
			isAdmin: req.user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not Found");
	}
});

// @desc    Register new user
// @route   POST /api/users/
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password, isAdmin } = req.body;
	const userExist = await User.findOne({ email });
	console.log("object");

	if (!userExist) {
		const user = await User.create({ name, email, password, isAdmin });
		if (user) {
			res.status(201).json({
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
			});
		} else {
			res.status(401);
			throw new Error("Invalid user details");
		}
	} else {
		res.status(401);
		throw new Error("Email already exist");
	}
});

// @desc    Delete user
// @route   DELETE /api/users/delete
//@access   Private only admin
const deleteUser = asyncHandler(async (req, res) => {
	const userExist = await User.findById(req.params.id);

	if (userExist) {
		await userExist.remove();
		res.json({ message: "User deleted Successfully" });
	} else {
		res.status(401);
		throw new Error("Email do not exist");
	}
});

// @desc    List all users
// @route   GET /api/users/all
//@access   Private only admin
const listAllUsers = asyncHandler(async (req, res) => {
	const users = await User.find().select("-password");

	if (users) {
		res.json(users);
	} else {
		res.status(401);
		throw new Error("Canonot get users");
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		if (req.body.password) {
			user.password = req.body.password;
		}
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not Found");
	}
});
// @desc    get user profile by Id
// @route   GET /api/users/profile/:id
//@access   Private only Admin
const getUserProfileById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not Found");
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile/:id
//@access   Private only Admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.isAdmin = req.body.isAdmin || user.isAdmin;
		const updatedUser = await user.save();
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not Found");
	}
});
export {
	authUser,
	getUserProfile,
	updateUserProfile,
	registerUser,
	deleteUser,
	listAllUsers,
	getUserProfileById,
	updateUser,
};
