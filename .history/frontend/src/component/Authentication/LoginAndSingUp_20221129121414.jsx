import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import './LoginAndSingUp.css'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../others/Loader';
import { clearErrors, login, register } from '../../actions/userAction';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginAndSingUp = ({ history, location }) => {
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
      );
    

    const [avatar, setAvatar] = useState("/profile.png");
    const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
      });
    
      const { name, email, password } = user;
        

      const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
      };
    
      const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
      };
    
      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };
    
      const redirect = location.search ? location.search.split("=")[1] : "/";
    
      useEffect(() => {
        if (error) {
          toast.error(error);
          dispatch(clearErrors());
        }
    
        if (isAuthenticated) {
          history.push(redirect);
        }
      }, [dispatch, error, alert, history, isAuthenticated]);

    const switchTabs = (e, tab) => {
        if (tab === "login") {
          switcherTab.current.classList.add("shiftToNeutral");
          switcherTab.current.classList.remove("shiftToRight");
    
          registerTab.current.classList.remove("shiftToNeutralForm");
          loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
          switcherTab.current.classList.add("shiftToRight");
          switcherTab.current.classList.remove("shiftToNeutral");
    
          registerTab.current.classList.add("shiftToNeutralForm");
          loginTab.current.classList.add("shiftToLeft");
        }
      };


  return (
   <>
    {
        loading ? (<Loader/>) : 
        (
            <>
       <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="page_login_singup">
                  <p 
                  onClick={(e) => switchTabs(e, "login")}
                  >LOGIN</p>
                  <p 
                  onClick={(e) => switchTabs(e, "register")}
                  >REGISTER</p>
                </div>
                <button 
                ref={switcherTab}
                ></button>
              </div>
              <form className="loginForm" 
              ref={loginTab} 
            onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
                <Link to="/">
                  <span>Login as a guest ?</span>
                </Link>
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="password_singup">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="register_image">
                  <img 
                  src={avatarPreview} 
                  alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
          <div></div>
          <ToastContainer
            position="bottom-center"
            rtl={false}
            pauseOnFocusLoss
            autoClose={5000}
            closeOnClick
            draggable
            pauseOnHover
            hideProgressBar={false}
            newestOnTop={false}
          />
    </>
        )
    }
   </>
  )
}

export default LoginAndSingUp
