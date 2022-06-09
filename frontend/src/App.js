import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen.js";
import CartScreen from "./screens/CartScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ShippingScreen from "./screens/ShippingScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderDetailsScreen from "./screens/OrderDetailsScreen.js";
import UserListScreen from "./screens/UserListScreen.js";
import UserEditScreen from "./screens/UserEditScreen.js";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Routes>
						<Route path='/' element={<HomeScreen />} />
						<Route path='/login' element={<LoginScreen />} />
						<Route path='/register' element={<RegisterScreen />} />
						<Route path='/profile' element={<ProfileScreen />} />
						<Route path='/updateProduct/:productId' element={<ProductEditScreen />} />
						<Route path='/createProduct' element={<ProductEditScreen />} />
						<Route path='/product/:productId' element={<ProductScreen />} />
						<Route path='/shipping/' element={<ShippingScreen />} />
						<Route path='/payment/' element={<PaymentScreen />} />
						<Route path='/placeorder/' element={<PlaceOrderScreen />} />
						<Route path='/order/:id' element={<OrderDetailsScreen />} />
						<Route path='/cart/' element={<CartScreen />} />
						<Route path='/cart/:id' element={<CartScreen />} />
						<Route path='/admin/userlist' element={<UserListScreen />} />
						<Route
							path='/admin/user/:userId/edit'
							element={<UserEditScreen />}
						/>
						<Route
							path='/admin/productlist'
							element={<ProductListScreen />}
							exact
						/>
						<Route
							path='/admin/productlist/:pageNumber'
							element={<h2>Hello</h2>}
							exact
						/>
						<Route path='/admin/product/:id/edit' element={<h2>Hello</h2>} />
						<Route path='/admin/orderlist' element={<h2>Hello</h2>} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
