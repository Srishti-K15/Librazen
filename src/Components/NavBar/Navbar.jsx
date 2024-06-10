
import React, {useEffect, useState} from 'react'
import './Navbar.css'


const Navbar = () => {

  const[sticky, setSticky] = useState(false);

  useEffect(()=>{
    window.addEventListener('scroll', ()=>{
      window.scrollY > 10 ? setSticky(true) : setSticky(false);
    })
  },[]);

  return (
    <nav className={`navbar ${sticky? 'dark-nav': ''}`}>
        <div className="navbar-logo">
        <h1 style={{fontFamily:"cursive"}}>Librazen</h1>
        </div>
        <div className="navbar-search"><input type="text" placeholder="Search books" className="search-bar"></input>
        </div>
        <ul className="navbar-menu">
            <li>Home</li>
            <li>Catalog</li>
            <li>Leaderboard</li>
            <li>Contact us</li>
            <li>Login</li>
        </ul>
    </nav>
  );
}

export default Navbar