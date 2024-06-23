import React, { useState } from 'react'
import Layout from '../Components/Layout/Layout'
import './SignUp.css'
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient';

function SignUp ()  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignedUp, setisSignedUp] = useState(false);

  const validateForm = () => {
    if (!email) {
      setMessage('Email is required');
      return false;
    }
    if (!password) {
      setMessage('Password is required');
      return false;
    }
    if (password.length < 6) {
      setMessage('Password should be at least 6 characters long');
      return false;
    }
    return true;
  };
    const handleSignUp = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setMessage('');

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
        console.log(data);
        setisSignedUp(true);
      setMessage(`Sign up successful! Please check your email to confirm your account.`);
    }
  };


  return (
    <Layout>
    <div className='signupPage'>
        <div className="signup-container">
            <h2>Sign up</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
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
                { !isSignedUp && (
                <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        )}
      </form>
      <p>{message}</p>
      <div className='link'> <p>Already have an account? <Link to='/login' className='login'>Login</Link></p></div>
        </div>
    </div>
    </Layout>
  );
};

export default SignUp;