import React, { useEffect } from 'react'
import  {useDispatch, useSelector} from "react-redux"
import { clearErrors, getProductDetails } from '../../actions/ProductActions';
const ProductDetails = ({match}) => {

  const dispatch = useDispatch();

  const { product, loading, error } = useSelector(
    (state) => state.ProductDetails
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);


  return (
          
      <div>

      </div>
    
    
  )
}

export default ProductDetails
