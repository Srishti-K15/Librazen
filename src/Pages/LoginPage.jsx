import React, { useState } from 'react'
import Navbar from '../Components/NavBar/Navbar'
import Footer from '../Components/Footer/Footer'
import { Link } from 'react-router-dom'
import './LoginPage.css'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDafault();
    };

  return (
    <div>
        <Navbar />
        <div className="login-page-wrapper">
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    type='email' id='email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    requires />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    requires />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup" className='signup'>Sign Up</Link>
      </p>
        </div>
        </div>
        <Footer/>
    </div>
  );
};

export default LoginPage