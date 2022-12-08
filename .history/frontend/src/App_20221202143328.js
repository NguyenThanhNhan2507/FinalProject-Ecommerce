import './App.css';
import HomePage from "./component/Home/HomePage";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetail from './component/Products/ProductDetail';
import LoginAndSingUp from './component/Authentication/LoginAndSingUp';
import { useSelector } from 'react-redux';
import UserDb from './others/UserDB';
import ProtectRouter from './router/ProtectRouter';
import UserProfile from './component/pageuser/UserProfile'
import ChangePassword from './component/pageuser/ChangePassword';
import UpdateProfile from './component/pageuser/UpdateProfile';
import Products from './component/Products/Products';
import Search from './component/Products/Search';
import Cart from './component/cart/Cart';
import Favourite from './component/cart/Favourite';
import Shipping from './component/cart/Shipper';
import ComfirmOrder from './component/cart/ComfirmOder';
import database from './database';
import axios from 'axios';
import { useState } from 'react';
import { loadUser } from './actions/userAction';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Payment from './component/cart/Payment';
import CartSucess from './component/cart/CartSucess';
import Options from './component/pageuser/Options';
import DardBoard from './component/Admin/DardBoard';
import UserOrder from './component/pageuser/UserOrder';
import UserOrderInfo from './component/pageuser/UserOrderInfo';
import CreateProducts from './component/Admin/CreateProducts';
import ProductsAdmin from './component/Admin/ProductsAdmin';
import ProductEdit from './component/Admin/ProductEdit';
import OrderAdmin from './component/Admin/OrderAdmin';
import EditOrder from './component/Admin/EditOrder';
import UserAdmin from './component/Admin/UserAdmin';
import EditUser from './component/Admin/EditUser';
import ReviewAdmin from './component/Admin/ReviewAdmin';
import AdminPassword from './component/Admin/AdminPassword';
import ResetPassword from './component/pageuser/ResetPassword';
import About from './component/About/About';
import Page404 from './component/404page/404Page';
import Contact from './others/Contact';
import Support from './others/Support';

function App() {

  const {isAuthenticated,user} = useSelector((state) =>state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v2/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    database.dispatch(loadUser());
    
    getStripeApiKey();
  }, []);
  return (
     
     <Router>
        {isAuthenticated && <UserDb user={user} />}
        {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectRouter exact path="/process/payment" component={Payment} />
        </Elements>
      )}
       <Switch>
         <Route exact path="/" component={HomePage} />
         <Route exact path="/product/:id" component={ProductDetail} />
         <Route exact path="/login" component={LoginAndSingUp} />
         <Route exact path="/about" component={About} />
         <Route exact path="/products" component={Products} />
         <Route exact path="/search" component={Search} />
         <Route exact path="/products/:keyword" component={Products} />
         <Route exact path="/cart" component={Cart} />
         <Route exact path="/shipping" component={Shipping} />
         <Route exact path="/more" component={Options} />
         <Route exact path="/password/forgot" component={AdminPassword} />
         <Route exact path="/password/reset/:token" component={ResetPassword} />
         <Route exact path="/order/confirm" component={ComfirmOrder} />
         <Route exact path="/favourites" component={Favourite} />
         <Route exact path="/contact" component={Contact} />
         <Route exact path="/contact" component={Support} />
         <ProtectRouter exact path="/me" component={UserProfile}/>
         <ProtectRouter exact path="/success" component={CartSucess} />
         <ProtectRouter exact path="/orders" component={UserOrder} />
         <ProtectRouter exact path="/order/:id" component={UserOrderInfo} />
         <ProtectRouter exact path="/me/update" component={ChangePassword}/>
         <ProtectRouter exact path="/me/update/info" component={UpdateProfile}/>
         <ProtectRouter isAdmin={true} exact path="/dashboard" component={DardBoard} />
         <ProtectRouter isAdmin={true} exact path="/admin/product" component={CreateProducts} />
         <ProtectRouter isAdmin={true} exact path="/admin/products" component={ProductsAdmin} />
         <ProtectRouter isAdmin={true} exact path="/edit/product/:id" component={ProductEdit} />
         <ProtectRouter isAdmin={true} exact path="/admin/orders" component={OrderAdmin} />
         <ProtectRouter isAdmin={true} exact path="/admin/order/:id" component={EditOrder} />
         <ProtectRouter isAdmin={true} exact path="/admin/users" component={UserAdmin} />
         <ProtectRouter isAdmin={true} exact path="/admin/user/:id" component={EditUser} />
         <ProtectRouter isAdmin={true} exact path="/admin/reviews" component={ReviewAdmin} />
       </Switch>
     </Router>

  );
}

export default App;
