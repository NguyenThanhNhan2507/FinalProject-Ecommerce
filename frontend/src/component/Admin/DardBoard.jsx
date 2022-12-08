import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./DardBoard.css";
import { Typography } from "@material-ui/core";
import {Link} from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useSelector, useDispatch } from "react-redux";
import LoadingData from "../../others/LoadingData";
import Loader from "../../others/Loader";
import { getAdminProduct } from "../../actions/ProductActions.js";
import { getAllOrders } from "../../actions/OrderAction.js";
import { getAllUsers } from "../../actions/userAction.js";

const DardBoard = () => {

  const dispatch = useDispatch();

  const { products,loading } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.AllOrders);

  const { users } = useSelector((state) => state.allUsers);

   let outOfStock = 0;
     
   products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    useEffect(() => {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
      }, [dispatch]);    

    let totalAmount = 0;
      orders &&
        orders.forEach((item) => {
          totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["#3BB77E"],
            hoverBackgroundColor: ["#3BB77E"],
            data: [0, totalAmount],
          },
        ],
      };

     const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

    return (
       <>
       {loading ?
       <Loader />
       :(
        <div className="dashboard">
        <LoadingData title="Dashboard" />
        <Sidebar />
  
        <div className="Dashboard_page">
          <Typography component="h1">Dashboard</Typography>
        
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ${totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
  
          <div className="lineChart">
            <Line data={lineState} />
          </div>
  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
       )
       }
       </>
    );
  };
export default DardBoard

