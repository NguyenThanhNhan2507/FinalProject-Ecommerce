import './App.css';
import HomePage from "./component/Home/HomePage";
import WebFont from "webfontloader";
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { loadUser } from './actions/userAction';
import Store from "./store";

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
