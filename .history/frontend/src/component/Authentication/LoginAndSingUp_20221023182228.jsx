import React from 'react'
import { Link } from 'react-router-dom'
import './LoginAndSingUp.css'
const LoginAndSingUp = () => {
  return (
    <>
       <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p 
                //   onClick={(e) => switchTabs(e, "login")}
                  >LOGIN</p>
                  <p 
                //   onClick={(e) => switchTabs(e, "register")}
                  >REGISTER</p>
                </div>
                <button 
                // ref={switcherTab}
                ></button>
              </div>
              <form className="loginForm" 
            //   ref={loginTab} onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    // value={loginEmail}
                    // onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  {/* <LockOpenIcon /> */}
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    // value={loginPassword}
                    // onChange={(e) => setLoginPassword(e.target.value)}
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
                // ref={registerTab}
                encType="multipart/form-data"
                // onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  {/* <FaceIcon /> */}
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
                  {/* <MailOutlineIcon /> */}
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
                  {/* <LockOpenIcon /> */}
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
                  <img 
                //   src={avatarPreview} 
                  alt="Avatar Preview" />
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

export default LoginAndSingUp
