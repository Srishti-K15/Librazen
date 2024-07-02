import React, { useState } from 'react';
import Layout from '../Components/Layout/layout';
import './SignUp.css';
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

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
    if (!name) {
      setMessage('Name is required');
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

    if (error) {
      setLoading(false);
      setMessage(error.message);
    } else {
      try {
        const userId = data.user.id;
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: userId, email, name }]);

        if (profileError) {
          setMessage(`Error creating profile: ${profileError.message}`);
        } else {
          setIsSignedUp(true);
          setMessage('Sign up successful! Please check your email to confirm your account.');
        }
      } catch (err) {
        setMessage('An error occurred while creating the profile.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className='signupPage'>
        <div className="signup-container">
          <h2>Sign up</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type='text' id='name' value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </div>
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
            {!isSignedUp && (
              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            )}
          </form>
          <p>{message}</p>
          <div className='link'>
            <p>Already have an account? <Link to='/login' className='login'>Login</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignUp;
