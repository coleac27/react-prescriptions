import { NavLink, Navigate } from 'react-router-dom'
import React, { useState } from 'react'
// import { auth } from '../firebase/firebaseConfig'
// import { signInWithEmailAndPassword  } from "firebase/auth";
import { useAuth } from '../contexts/authContext';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';

export default function Login() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      //const user = await signInWithEmailAndPassword(auth, email, password);
      if(!isSigningIn){
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);
      }
      // console.log(user);
    }catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      setIsSigningIn(false);
      console.log(errorCode, errorMessage); 
    };
  }

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    try{
      if(!isSigningIn){
        setIsSigningIn(true);
        doSignInWithGoogle();
      }
    }catch(error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      setIsSigningIn(false);
      console.log(errorCode, errorMessage);
    };

  }

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/'} replace={true} />)}
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Welcome Back</h1>
            <p className="lead text-center">Sign in to your account to continue</p>
            <h5 className= "mb-4">OR</h5>
            <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50"><i className="fa fa-user-plus me-2"></i>Register</NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleEmailChange}/>
              </div>
              <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={handlePasswordChange}/>
              </div>
              {errorMessage && (
                <span className='text-red-600 font-bold'>{errorMessage}</span>
              )}
              <button type="submit" disabled={isSigningIn} className="btn btn-outline-primary rounded-pill w-100 mt-4"><i className="fa fa-sign-in me-2"></i>Login</button>
            </form>
            <div className="fw-bolder text-center mt-3">OR</div>
            <div className="text-center mt-3">
              <button disabled={isSigningIn} onClick={(e) => { onGoogleSignIn(e) }} className="gsi-material-button">
                <div className="gsi-material-button-state"></div>
                <div className="gsi-material-button-content-wrapper">
                  <div className="gsi-material-button-icon">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xlinkHref="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      <path fill="none" d="M0 0h48v48H0z"></path>
                    </svg>
                  </div>
                  <span className="gsi-material-button-contents">Sign in with Google</span>
                  <span style={{display: "none"}}>Sign in with Google</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
