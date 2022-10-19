import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newReviewReducer,
  productReviewsReducer,
  productsReducer,
} from "./reducers/ProductReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/OrderReducer";

const reducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  profile: profileReducer,
  order: newOrderReducer,
  myOrder: myOrdersReducer,
  myOrderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  AllOrders: allOrdersReducer,
  // allUsers: allUsersReducer,
  // userDetails: userDetailsReducer,
  // productReviews: productReviewsReducer,
  // forgotPassword:forgotPasswordReducer,
});

let initialState = {
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
