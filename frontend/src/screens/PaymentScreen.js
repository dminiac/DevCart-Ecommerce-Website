import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actioṉs/userActions.js";
import { savePaymentMethod } from "../actioṉs/cartActions";
import CheckOutSteps from "../components/CheckOutSteps";
const PaymentScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	if (!shippingAddress) {
		navigate("/shipping");
	}
	const [paymentMethod, setPaymentMethod] = useState("Cash");

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	return (
		<FormContainer>
			<h1>Payment Method</h1>
			<CheckOutSteps step1 step2 step3 />
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
				</Form.Group>
				<Col>
					<Form.Check
						type='radio'
						label='PayPal or Credit Card'
						id='PayPal'
						name='paymentMethod'
						value='PayPal'
						disabled={true}
						onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
					<Form.Check
						type='radio'
						label='Cash'
						id='cash'
						name='paymentMethod'
						value='cash'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
				</Col>

				<Button type='submit' variant='primary' style={{ marginTop: "10px" }}>
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
};

export default PaymentScreen;
