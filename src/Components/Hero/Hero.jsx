import React from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="hero">
         <div className="hero-text">
         <h1>Welcome to Librazen</h1>
         <h2>Library management system</h2>
         <button className="next"><Link to="/books">Browse Catalog</Link> </button>
         </div>
    </div>
  )
}

export default Hero