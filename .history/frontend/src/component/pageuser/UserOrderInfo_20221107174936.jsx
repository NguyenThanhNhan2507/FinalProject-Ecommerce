import React, { useEffect } from "react";
import "./UserOrderInfo.css";
import { useSelector, useDispatch } from "react-redux";
import LoadingData from "../../others/LoadingData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/OrderAction";
import Loader from "../../others/Loader";
// import BottomTab from "../../more/BottomTab";

const UserOrderInfo = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.myOrderDetails);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, alert, error, match.params.id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <LoadingData title="Order Details" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              {/* <Typography component="h1">
                Order ID:{order && order._id}
              </Typography> */}
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.state}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >                  
                  </p>
                  <p style={{
                      color:"green"
                  }}>
                  PAID
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>$ {order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">

                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.Offer}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.Offer}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ${item.price} ={" "}
                        <b>${item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}


              </div>
            </div>
          </div>
        </>
      )}
      {/* <BottomTab /> */}
    </>
  );
};

export default UserOrderInfo;