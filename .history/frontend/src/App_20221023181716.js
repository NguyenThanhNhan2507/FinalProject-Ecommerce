import './App.css';
import HomePage from "./component/Home/HomePage";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductDetail from './component/Products/ProductDetail';
import LoginAndSingUp from './component/Authentication/LoginAndSingUp';

function App() {


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

  }, []);
  return (
     
     <Router>
       <Switch>
         <Route exact path="/" component={HomePage} />
         <Route exact path="/product/:id" component={ProductDetail} />
         <Route exact path="/login" component={LoginAndSingUp} />
       </Switch>
     </Router>

  );
}

export default App;
