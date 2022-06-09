import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { logout } from "../actioṉs/userActions.js";
import { useNavigate } from "react-router-dom";

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const logOutHandler = () => {
		if (userInfo) {
			dispatch(logout());
			navigate("/");
		}
	};

	return (
		<>
			<Navbar bg='dark' expand='lg' variant='dark' collapseOnSelect>
				<Container>
					<LinkContainer to='/'>
						<Navbar.Brand>MernShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Container>
							<Nav className='ml-auto'>
								<LinkContainer to='/cart'>
									<Nav.Link>
										<i className='fa fa-shopping-cart'></i>CART
									</Nav.Link>
								</LinkContainer>
								{userInfo ? (
									<NavDropdown title={userInfo.name} id='username'>
										<LinkContainer to='/profile'>
											<NavDropdown.Item>Profile</NavDropdown.Item>
										</LinkContainer>
										<NavDropdown.Item onClick={logOutHandler}>
											Log out{" "}
										</NavDropdown.Item>
									</NavDropdown>
								) : (
									<LinkContainer to='/login'>
										<Nav.Link href='#link'>
											<i className='fa fa-user'></i>SIGN IN
										</Nav.Link>
									</LinkContainer>
								)}
								{userInfo && userInfo.isAdmin && (
									<NavDropdown title='Admin' id='adminmenu'>
										<LinkContainer to='/admin/userlist'>
											<NavDropdown.Item>Users</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/admin/productlist'>
											<NavDropdown.Item>Products</NavDropdown.Item>
										</LinkContainer>
										<LinkContainer to='/admin/orderlist'>
											<NavDropdown.Item>Orders</NavDropdown.Item>
										</LinkContainer>
									</NavDropdown>
								)}
							</Nav>
						</Container>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Header;
