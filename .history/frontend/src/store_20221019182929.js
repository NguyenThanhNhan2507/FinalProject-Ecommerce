import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
} from "./reducers/ProductReducer";
import { userReducer } from "./reducers/userReducer";


const reducer = combineReducers({
  products: productsReducer,
  user: userReducer,
});

let initialState = {
  // products: productsReducer,
};

const middleWare = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
