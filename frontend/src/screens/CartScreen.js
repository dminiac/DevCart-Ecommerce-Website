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
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actioṉs/cartActions.js";
import Message from "../components/Message.js";

const CartScreen = () => {
	const dispatch = useDispatch();
	const Navigate = useNavigate();
	const { id } = useParams();
	const { search } = useLocation();
	const qty = search ? Number(search.split("=")[1]) : 1;

	useEffect(() => {
		if (id) {
			dispatch(addToCart(id, qty));
		}
	}, [dispatch, id, qty]);

	const { cartItems } = useSelector((state) => state.cart);

	const removeFromCartHandler = (id) => {
		console.log(id);
		dispatch(removeFromCart(id));
	};

	const checkOutHandler = () => {
		Navigate("/login?redirect=shipping");
	};

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>

				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty. <Link to='/'>Shop Now</Link>
					</Message>
				) : (
					<ListGroup variant='flush'>
						{cartItems.map((item) => {
							return (
								<ListGroup.Item key={item.product}>
									<Row>
										<Col md={2}>
											<Image src={item.image} alt={item.name} fluid rounded />
										</Col>
										<Col md={3}>
											<Link to={`/product/${item.product}`}>{item.name}</Link>
										</Col>
										<Col md={2}>${item.price}</Col>
										<Col md={2}>
											<Form.Control
												as='select'
												value={item.qty}
												onChange={(e) => {
													dispatch(
														addToCart(item.product, Number(e.target.value))
													);
												}}>
												<option key='0' value='0'>
													0
												</option>
												{[...Array(item.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
										<Col md={2}>
											<Button
												type='button'
												variant='light'
												onClick={() => removeFromCartHandler(item.product)}>
												<i className='fa fa-trash'></i>
											</Button>
										</Col>
									</Row>
								</ListGroup.Item>
							);
						})}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn btn-block btn-dark'
								disabled={cartItems.length === 0}
								onClick={checkOutHandler}>
								Proceed to checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
};

export default CartScreen;
