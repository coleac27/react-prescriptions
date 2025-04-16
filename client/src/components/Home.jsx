import React from 'react'
import flintstonesImage from '../images/2021-01-07-flintstones-tablets-pile-shutterstock.jpg'
import About from './About'
import Resources from './Resources'

export default function Home() {
  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <h1 className="text-white display-4 text-center">Welcome to your Prescription Tracker</h1>
              <p className="lead text-white mt-5">Remember when we just chewed a Flintstones vitamin?</p>
              <img style={{maxWidth:"25rem"}} src={flintstonesImage} alt="Flintstones Vitamins"/>
            </div>
          </div>
        </div>
      </section>
      <About />
      <Resources />
    </div>
  )
}

//https://www.saturdayeveningpost.com/2021/01/five-facts-about-flintstones-vitamins/
