
import React, {useEffect, useState} from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'


const Navbar = () => {

  const[sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 10 ? setSticky(true) : setSticky(false);
    })
  },[]);

  return (
    <nav className={`navbar ${sticky? 'dark-nav': ''}`}>
        <div className="container">
          <div className="content">
            <Link to="/" className='text'>Librazen
            <img src={logo} alt='' className='logo'></img>
            </Link>
          </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search books" className="search-bar"></input>
        </div>
        <ul className="navbar-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/catalogue">Catalogue</Link></li>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/login">Login</Link></li> 
            <li><Link to="/profile">Profile</Link></li>
        </ul>
        </div>
    </nav>
  );
};

export default Navbar