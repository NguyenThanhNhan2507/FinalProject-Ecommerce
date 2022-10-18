import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import Header from './Header'
import batgrou from "../../assets/images/background2.jpg";
import image from "../../assets/images/background3.jpg";
import "./HomePage.css"
import ProductCard from '../Product/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../action/ProductAction';
import { CLEAR_ERRORS } from '../../constants/ProductConstrant';
const HomePage = () => {
  const dispatch = useDispatch();
  const { products, } = useSelector(
    (state) => state.products
  );
  useEffect(()=>{
    if(error){ 
      toast.error(error);
      dispatch(CLEAR_ERRORS());
    }
    dispatch(getProduct())
  },[dispatch,error])
  return (
    <>
      {/* <Header /> */}
        {/* Carousel */}
        <div className="banner">
               <Carousel>
                 <img src={image} className="bgImg"/>
                 <img src={batgrou} className="bgImg"/>
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
                 textAlign:"center",
                 width:"150px",
                 height:"40px",
                 color: "#26c",
                 fontFamily: "Segoe Script",
                 fontSize: "2.4em",
                 display:"flex",
                 justifyContent:"center",
                 lineHeight:".7",
                 alignItems:"center"
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
                 }}>Collection</h2>
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
                 Get Free Shipping on all orders over $99.00
                 </h2>
               </div>
               <div>
                 <a href="#container">
                 <button type="submit" style={{
                   width:"120px",
                   height:"50px",
                   border:"none",
                   background:"#3BB77E",
                   margin:"10px 0",
                   fontSize:"1.2vmax",
                   color:"#fff",
                   cursor:"pointer"
                 }}
                 className="Home__button"
                 >SHOP NOW</button>
                 </a>
               </div>
             </div>
         </div>
 
 
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
      {/* {products && products.map((product) =>(
          <ProductCard key={product._id} product={product} />
        ))} */}
      </div>
      </>    
    )
}

export default HomePage
