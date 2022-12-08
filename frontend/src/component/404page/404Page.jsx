import React from 'react';
import "./404page.css"
import errorImg from "../../Assets/404.png"
import { useHistory } from "react-router-dom";




const Page404 = () => {
    const history = useHistory();

    const handleClickBack = () => {
        history.push("/");
    }
  return (
    <div class="errorPage">
    <img src={errorImg} alt=""></img>
    <button className="errorPage-button"
        onClick={handleClickBack}
    >
        Quay lại trang chủ
    </button>
</div>
  )
}

export default Page404