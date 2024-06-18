import React, { useState } from 'react'
import Navbar from '../Components/NavBar/Navbar'
import Footer from '../Components/Footer/Footer'
import { useNavigate, Link } from 'react-router-dom'
import supabase from '../config/supabaseClient'
import './LoginPage.css'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        setError(null);
        const {user, error} = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if(error){
            setError(error.message);
        }else{
            navigate('/profile');
        }
};

  return (
    <div className='loginPage'>
        <Navbar />
        <div className="login-page-wrapper">
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                    type='email' id='email' value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                    type="password" id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                </div>
                <button type="submit" className="btn">Login</button>
                {error && <p>{error}</p>}
            </form>
            <div className='link'><p>Don't have an account? <Link to='/signup' className='signup'>Sign Up</Link></p></div>
        </div>
        </div>
        <Footer/>
    </div>
  );
};

export default LoginPage