import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../src/component/Home/Footer";
import Header from "../component/Home/Header";
import Loader from "../../src/others/Loader";
import LoadingData from "../../src/others/LoadingData";
import "./Contact.css";
import logo from '../../src/Assets/bgr3.jpg'
import TapMobile from "../../src/others/TapMobile";

const Contact = () => {
    const { loading } = useSelector(
        (state) => state.profile
      );
  return (
    <>
    {loading ? <Loader /> : 
    <>
    <LoadingData title="About" />
    <div>
    <Header />
    <div
      style={{
        width: "90%",
        margin: "0px auto",
      }}
    >
      <div className="about__page">
        <div className="row flex">
          <div className="col__2">
            <img src={logo} />
          </div>
          <div className="col__2">
            <div className="meta">
              <span
                style={{
                  fontSize: "40px",
                  fontWeight: "700",
                  lineHeight: "1.2",
                }}
              >
                Welcome to TN Market
              </span>
              <p>
              Address: 97 Ly Thuong Kiet, Hoi An
              </p>
              <p>
              Email: nhandaica125@gmail
              </p>
              <p>
            Phone number: 0903453456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  <TapMobile />
  </>
    }
    </>
  );
};

export default Contact;
