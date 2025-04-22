import { NavLink } from 'react-router-dom'
import React, { useState } from 'react'
import { auth } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword  } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
    const user = await signInWithEmailAndPassword(auth, email, password);
    console.log(user);
      // .then((userCredential) => {
      //   // Signed in 
      //   const user = userCredential.user;
      //   // ...
      // })
      }catch(error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage); 
      };
  }

  return (
    <div>
      <div className="container shadow my-5">
        <div className="row">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
            <h1 className="display-4 fw-bolder">Welcome Back</h1>
            <p className="lead text-center">Sign in to your account to continue</p>
            <h5 className= "mb-4">OR</h5>
            <NavLink to="/register" className="btn btn-outline-light rounded-pill pb-2 w-50">Register</NavLink>
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
              <button type="submit" className="btn btn-outline-primary rounded-pill w-100 mt-4">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
