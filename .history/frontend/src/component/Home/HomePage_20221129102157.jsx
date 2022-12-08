import React, { useEffect } from "react";
import "./HomePage.css";
import Carousel from "react-material-ui-carousel";
import bg from "../../Assets/bgr1.jpg";
import bg2 from "../../Assets/fl2.jpg";
import ProductCard from "../Products/ProductCard";
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProduct } from "../../actions/ProductActions";
import Header from "./Header";
import {  toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingData from "../../others/LoadingData";
import TapMobile from "../../others/TapMobile";
import Footer from "./Footer";


const Home = () => {
  const dispatch = useDispatch();
  const { products,error,loading } = useSelector(
    (state) => state.products
  );

   useEffect(() => {
    if(error){ 
      toast.error(error);
      dispatch(clearErrors());
 }
  dispatch(getProduct());
   }, [dispatch,error])
   
  return (
    <>
      <LoadingData title="Home Page"/>
      <Header/>
      <div className="banner">
               <Carousel>
                 <img src={bg} className="bgImg"/>
                 <img src={bg2} className="bgImg"/>
               </Carousel>
             <div className="home__content">
               <div style={{
                 display:"flex",
                 alignItems:"center",
               }}>
               <h2 style={{
                 fontFamily: "Segoe Script",
                 fontSize: "3em",
                 fontWeight:"500"
               }}>Buy 2 Get</h2>
               <span style={{
                 padding:"10px",
                 backgroundColor:"#fff",
                 margin:"0px 10px",
                 color: "#26c",
                 fontSize: "2.4em",
                 display:"flex",
                 justifyContent:"center",
                 fontFamily: "Segoe Script",
                 lineHeight:".7",
                 alignItems:"center",
                 textAlign:"center",
                 width:"150px",
                 height:"40px",
              
               }}>1 Free</span>
               </div>
               <div>
                 <h2 style={{
                   fontSize:"4.5em",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                 }}>Fashionable</h2>
               </div>
               <div>
                 <h2 style={{
                   fontSize:"4.5em",
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                   lineHeight:".7"
                 }}>Good price</h2>
               </div>
               <div>
                 <h2
                 style={{
                   fontWeight:"400",
                   fontFamily:"Poppins,sans-serif",
                   color:"#fff",
                   fontSize:"1em",
                   paddingTop:"10px"
                 }}
                 >
                  Get voucher value for all orders over $100
                 </h2>
               </div>
               <div>
                 <a href="#container">
                 <button type="submit" style={{
                   width:"150px",
                   height:"50px",
                   border:"none",
                   background:"#33FF66",
                   margin:"10px 0",
                   fontSize:"1.2vmax",
                   color:"#000000",
                   cursor:"pointer"
                 }}
                 className="Home__button"
                 >BUY NOW</button>
                 </a>
               </div>
             </div>
         </div>
 
 
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products && products.map((product) =>(
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
      <Footer/>
      <TapMobile/>
    </>
  );
};

export default Home;
