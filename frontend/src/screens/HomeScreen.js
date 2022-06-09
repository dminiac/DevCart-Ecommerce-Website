import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product.js";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actioṉs/productActions.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
const HomeScreen = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	const { loading, error, products } = productList;
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<h2>
					<Loader />
				</h2>
			) : error ? (
				<h3>
					<Message variant='danger'>{error}</Message>
				</h3>
			) : (
				<Row>
					{products.map((product) => {
						return (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						);
					})}
				</Row>
			)}
		</>
	);
};

export default HomeScreen;
