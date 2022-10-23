import React, { useEffect } from 'react'
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProductDetails } from '../../actions/ProductActions';
import LoadingData from '../../others/LoadingData';


import Header from '../Home/Header';
const ProductDetails = ({match}) => {

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);


  return (
          
      <>
        <LoadingData/>
        <Header />
      </>
    
    
  )
}

export default ProductDetails