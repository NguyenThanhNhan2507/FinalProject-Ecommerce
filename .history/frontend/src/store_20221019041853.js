import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteProductReducer,
  deleteReviewReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReviewsReducer,
  productsReducer,
} from "./reducers/ProductReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/CartReducer";
import { favouriteReducer } from "./reducers/FavouriteReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/OrderReducer";

const reducer = combineReducers({
  products: productsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  favourite: {
    favouriteItems: localStorage.getItem("favouriteItems")
      ? JSON.parse(localStorage.getItem("favouriteItems"))
      : [],
  },
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
