import React from 'react'
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import './Login.css'
import { Link } from "react-router-dom";
const Login = () => {
  return (
    <>
        <div title="Login or Signup" />
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p>LOGIN</p>
                  <p>REGISTER</p>
                </div>
                <button></button>
              </div>
              <form className="loginForm">
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    // value={loginEmail}
                    // onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    // value={loginPassword}
                    // onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <a to="/password/forgot">Forgot Password ?</a>
                <input type="submit" value="Login" className="loginBtn" />
                <a to="/">
                  <span>Login as a guest ?</span>
                </a>
              </form>

              <form
                className="signUpForm"
                // ref={registerTab}
                encType="multipart/form-data"
                // onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    // value={name}
                    // onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    // value={email}
                    // onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    // value={password}
                    // onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  {/* <img src={avatarPreview} alt="Avatar Preview" /> */}
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    // onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
          <div></div>
    </>
  )
}

export default Login
