import React, { useEffect, useState } from "react";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../actioṉs/productActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
const ProductScreen = () => {
	const [qty, setQty] = useState(0);
	const dispatch = useDispatch();
	const { productId } = useParams();
	const Navigate = useNavigate();
console.log(qty)
	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	useEffect(() => {
		dispatch(listProductDetails(productId));
	}, [dispatch, productId]);

	const addToCartHandler = () => {
		if (qty) Navigate(`/cart/${productId}?qty=${qty}`);
	};

	return (
		<>
			{loading ? (
				<h2>
					<Loader />
				</h2>
			) : error ? (
				<h3>
					<Message variant='danger'>{error}</Message>
				</h3>
			) : (
				<>
					<Link className='btn btn-light my-3' to='/'>
						Go Back
					</Link>
					<Row>
						<Col md={6}>
							<Image src={product.image} fluid alt={product.name} />
						</Col>
						<Col md={3}>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h3>{product.name}</h3>
								</ListGroup.Item>
								<ListGroup.Item>
									<Rating
										value={product.rating}
										numReviews={product.numReviews}
									/>
								</ListGroup.Item>
								<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
								<ListGroup.Item>
									Description: ${product.description}
								</ListGroup.Item>
							</ListGroup>
						</Col>
						<Col md={3}>
							<Card>
								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>

								<ListGroup variant='flush'>
									<ListGroup.Item>
										<Row>
											<Col>Status:</Col>
											<Col>
												<strong>
													{product.countInStock > 0
														? "Available"
														: "Out Of Stock"}
												</strong>
											</Col>
										</Row>
									</ListGroup.Item>
								</ListGroup>
								{product.countInStock > 0 && (
									<ListGroup.Item>
										<Row>
											<Col>Select Qty:</Col>
											<Col>
												<Form.Control
													as='select'
													value={qty}
													onChange={(e) => {
														setQty(e.target.value);
													}}>
													<option key='0' value='0'>
														0
													</option>
													{[...Array(product.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroup.Item>
								)}
								<ListGroup.Item>
									<Button
										className='btn btn-block'
										type='button'
										disabled={product.countInStock === 0}
										onClick={addToCartHandler}>
										<i className='fas fa-shopping-cart'></i>
										<span style={{ padding: "5px" }}>Add To Cart</span>
									</Button>
								</ListGroup.Item>
							</Card>
						</Col>
					</Row>
				</>
			)}
		</>
	);
};

export default ProductScreen;
