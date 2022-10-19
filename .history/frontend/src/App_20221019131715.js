import './App.css';
import HomePage from "./component/Home/HomePage";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserData from './more/UserData';
import { useSelector } from 'react-redux';
import { loadUser } from './actions/userAction';
import Store from "./store";
import ProtectedRoute from './route/ProtectedRoute';

import axios from 'axios';
import { useState } from 'react';
import Payment from './component/cart/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

function App() {


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    
    Store.dispatch(loadUser());

  }, []);
  return (
     
     <Router>
       <Switch>
         <Route exact path="/" component={HomePage} />
       </Switch>
     </Router>

  );
}

export default App;
