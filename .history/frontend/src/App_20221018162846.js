
import './App.css';
import Header from './components/Home/Header';
import HomePage from './components/Home/HomePage';
import webFont from 'webfontloader'
import { useEffect } from 'react';
import Login from './components/Auth/Login';


function App() {
  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div className="App">
    {/* <Header/>
    <HomePage/> */}
    <Login/>
    </div>
  );
}

export default App;
