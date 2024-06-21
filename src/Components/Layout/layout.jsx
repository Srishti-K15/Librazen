import React from 'react'
import Navbar from '../NavBar/Navbar'
import Footer from '../Footer/Footer'
import './layout.css'

const layout = ({children}) => {
  return (
    <div className='layout'>
        <Navbar/>
        <div className='content'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default layout