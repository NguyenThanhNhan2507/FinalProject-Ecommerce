import './App.css';
import HomePage from "./component/Home/HomePage";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetail from './component/Products/ProductDetail';
import LoginAndSingUp from './component/Authentication/LoginAndSingUp';
import Loader from './others/Loader';
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

function App() {

  const {isAuthenticated,user} = useSelector((state) =>state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

  }, []);
  return (
     
     <Router>
        {isAuthenticated && <UserDb user={user} />}
       <Switch>
         <Route exact path="/" component={HomePage} />
         <Route exact path="/product/:id" component={ProductDetail} />
         <Route exact path="/login" component={LoginAndSingUp} />
         <Route exact path="/products" component={Products} />
         <Route exact path="/search" component={Search} />
         <Route exact path="/products/:keyword" component={Products} />
         <Route exact path="/cart" component={Cart} />
         <Route exact path="/shipping" component={Shipping} />
         <Route exact path="/order/confirm" component={ComfirmOrder} />
         <Route exact path="/favourites" component={Favourite} />
         <ProtectRouter exact path="/me" component={UserProfile}/>
         <ProtectRouter exact path="/me/update" component={ChangePassword}/>
         <ProtectRouter exact path="/me/update/info" component={UpdateProfile}/>
 
       </Switch>
     </Router>

  );
}

export default App;
