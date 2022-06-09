import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants.js";
export const cartReducer = (
	state = { cartItems: [], shippingAddress: {} },
	action
) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.product === item.product);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) => {
						return x.product === existItem.product ? item : x;
					}),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			const id = action.payload;
			return {
				...state,
				cartItems: state.cartItems.filter((x) => {
					return x.product !== id && x;
				}),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			return {
				...state,
				shippingAddress: action.payload,
			};
		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload,
			};

		default:
			return state;
	}
};
