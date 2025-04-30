import { NavLink, Navigate } from 'react-router-dom'
import React, { useState } from 'react'
//import { auth } from '../firebase/firebaseConfig'
//import { createUserWithEmailAndPassword, validatePassword } from "firebase/auth";
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';

export default function Register() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');  
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }

    const handleRegister = async (e) => {
    e.preventDefault();
  
    try{
  //  const user = await createUserWithEmailAndPassword(auth, email, password);
      if(!isRegistering){
        setIsRegistering(true)
        await doCreateUserWithEmailAndPassword(email, password)
      }
      //console.log(user);
    }
    catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorMessage);
      setIsRegistering(false);
      console.log(errorCode, errorMessage);
    };

  }

  // const status = await validatePassword(getAuth(), passwordFromUser);
  // if (!status.isValid) {
  //   // Password could not be validated. Use the status to show what
  //   // requirements are met and which are missing.

  //   // If a criterion is undefined, it is not required by policy. If the
  //   // criterion is defined but false, it is required but not fulfilled by
  //   // the given password. For example:
  //   const needsLowerCase = status.containsLowercaseLetter !== true;
  // }

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
      <div className="container shadow my-5">
        <div className="row justify-content-end">
          <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form order-2">
            <h1 className="display-4 fw-bolder">Hello</h1>
            <p className="lead text-center">Enter your details to register</p>
            <h5 className= "mb-4">OR</h5>
            <NavLink to="/login" className="btn btn-outline-light rounded-pill pb-2 w-50"><i className="fa fa-sign-in me-2"></i>Login</NavLink>
          </div>
          <div className="col-md-6 p-5">
            <h1 className="display-6 fw-bolder mb-5">Register</h1>
            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="email" onChange={handleEmailChange}/>
              </div>
              <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handlePasswordChange}/>
              </div>
              {errorMessage && (
                  <span className='text-red-600 font-bold'>{errorMessage}</span>
              )}
              <button type="submit" disabled={isRegistering} className={`btn btn-outline-primary rounded-pill w-100 mt-4 ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}><i className="fa fa-user-plus me-2"></i>Register</button>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  )
}
