import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import {
	listProductDetails,
	createProduct,
	updateProduct,
} from "../actioṉs/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditScreen = () => {
	const { productId } = useParams();
	console.log(productId);
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");
	const [uploading, setUploading] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const product = "jcjc";
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;

	const productUpdate = useSelector((state) => state.productUpdate);
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate;
	const productCreate = useSelector((state) => state.productCreate);
	const { product: tempProduct } = productCreate;

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET });
		}
		if (productId !== undefined) {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId));
				navigate("/admin/productList");
			} else {
				console.log("object");
				setName(product.name);
				setPrice(product.price);
				setImage(product.image);
				setBrand(product.brand);
				setCategory(product.category);
				setCountInStock(product.countInStock);
				setDescription(product.description);
			}
		} else {
			console.log("here");
		}
	}, [product, dispatch, navigate, successUpdate, productCreate]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (productId) {
			dispatch(
				updateProduct({
					_id: productId,
					name,
					price,
					image,
					brand,
					category,
					description,
					countInStock,
				})
			);
		} else {
			dispatch(
				createProduct({
					name,
					price,
					image,
					brand,
					category,
					description,
					countInStock,
				})
			);
			navigate(`/product/ygu`);
		}
		//Update or create Product
	};

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							type='name'
							placeholder='Enter name'
							value={name}
							onChange={(e) => setName(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='price'>
						<Form.Label>Price</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='image'>
						<Form.Label>Image</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter image'
							value={image}
							onChange={(e) => setImage(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='brand'>
						<Form.Label>Brand</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter brand'
							value={brand}
							onChange={(e) => setBrand(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='countInStock'>
						<Form.Label>Count In Stock</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter countInStock'
							value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='category'>
						<Form.Label>Category</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter category'
							value={category}
							onChange={(e) => setCategory(e.target.value)}></Form.Control>
					</Form.Group>

					<Form.Group controlId='description'>
						<Form.Label>Description</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}></Form.Control>
					</Form.Group>

					<Button type='submit' variant='primary'>
						{productId ? "Update" : "Create"}
					</Button>
				</Form>
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
