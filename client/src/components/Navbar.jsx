import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const handleLogout = async () => {
    await signOut(auth);
  };

    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow">
        <div className="container">          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/resources">Resources</NavLink>
              </li>              
            </ul>
            <NavLink className="navbar-brand fw-bolder fs-4 mx-auto" to="/">"WHAT A PAIN" MED TRACKER</NavLink>
            {user?.email ? (<><span>{user.email}</span><button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button></>) : (
            <NavLink className="btn btn-outline-primary ms-auto px-4 rounded-pill" to="/login">
              <i className="fa fa-sign-in me-2"></i>Login</NavLink>
            )}
            <NavLink className="btn btn-outline-primary ms-auto px-4 rounded-pill" to="/register">
            <i className="fa fa-user-plus me-2"></i>Register</NavLink>
            <NavLink className="btn btn-outline-primary ms-auto px-4 rounded-pill" to="/dashboard">
            <i className="fa fa-user-circle me-2"></i>Dashboard</NavLink>
            {/* {user?.email} */}
            {/* <NavLink className="btn btn-outline-primary ms-auto px-4 rounded-pill" to="/logout">
            <i className="fa fa-user-sign-out me-2"></i>Logout</NavLink> */}
          </div>
        </div>
      </nav>
    )
}
