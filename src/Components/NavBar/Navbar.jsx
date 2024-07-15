import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../config/supabaseClient'
import './Navbar.css';
import logo from '../../images/logo.png';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.log("Error checking login status", error);
        return;
      }
      setIsLoggedIn(!!user);
    };

    checkLoginStatus();

    const handleScroll = () => {
      window.scrollY > 10 ? setSticky(true) : setSticky(false);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${sticky ? 'dark-nav' : ''}`}>
      <div className="container">
        <div className="Logo">
          <Link to="/" className='text'>
            Librazen
            <img src={logo} alt='' className='logo' />
          </Link>
        </div>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About us</Link></li>
          <li><Link to="/books">Catalogue</Link></li>
          <li><Link to="/charts">Charts</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          {isLoggedIn ? (
            <li><Link to="/profile">Profile</Link></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
