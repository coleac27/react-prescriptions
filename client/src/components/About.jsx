import React from 'react'
import pillImage from '../images/gettyimages-163957000-640x640.jpg'

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
              <button className="btn btn-primary rounded-pill px-4 py-2">Get Started</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
