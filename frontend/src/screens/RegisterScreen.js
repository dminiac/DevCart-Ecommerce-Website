import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actioṉs/userActions.js";

const RegisterScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();
	let location = useLocation();
	const redirect = location.search ? location.search.split("=")[1] : "";

	const userLogin = useSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const userRegister = useSelector((state) => state.userRegister);
	const { error: registerError } = userRegister;

	useEffect(() => {
		if (userInfo) {
			navigate("/" + redirect);
		}
	}, [navigate, userInfo, redirect, registerError]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("password not matched");
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<FormContainer>
			<h1>Register</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{registerError && <Message variant='danger'>{registerError}</Message>}
			{loading && <Loader />}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='name'
						placeholder='Enter your name'
						value={name}
						onChange={(e) => setName(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}></Form.Control>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}></Form.Control>
				</Form.Group>
				<Form.Group controlId='confirmpassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
				</Form.Group>

				<Button type='submit' variant='primary' style={{ marginTop: "10px" }}>
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Already have an account?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						Login
					</Link>
				</Col>
			</Row>
		</FormContainer>
	);
};

export default RegisterScreen;
