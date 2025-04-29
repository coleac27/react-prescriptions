import React from 'react';
import { NavLink} from 'react-router-dom';
import pillImage from '../images/gettyimages-163957000-640x640.jpg';

export default function About() {
  return (
    <div>
      <section id="about">
        <div className="container my-5 py-5">
          <div className="row">
            <div className="col-md-6">
              <img src={pillImage} alt="Pill" className="w-75 mt-5" />
            </div>
            <div className="col-md-6">
              <h3 className="fs-5">About Us</h3>
              <p className="lead">Now we have more bottles than can fit in our cabinet...</p>
              <NavLink className="btn btn-primary rounded-pill px-4 py-2" to="/dashboard">Get Started</NavLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
