
import './App.css';
import Header from './components/Home/Header';
import HomePage from './components/Home/HomePage';
import webFont from 'webfontloader'
import { useEffect } from 'react';
import { Route, Router, Switch } from 'react-router-dom';


function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <Router>
      <Switch>
          <Route exact path="/" component={HomePage}/>
      </Switch>
    </Router>
  );
}

export default App;
