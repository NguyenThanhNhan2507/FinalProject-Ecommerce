import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productDetailsReducer,
  productsReducer,
} from "./reducers/ProductReducer";
import { profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/CartReducer";


const reducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  productDetails: productDetailsReducer,
  profile: profileReducer,
  cart: cartReducer,
});

let initialState = {

};

const middleWare = [thunk];

const database = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default database;
