import React, { useState } from 'react';
import Layout from '../Components/Layout/layout';
import './SignUp.css';
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName }
      }
    });

    if (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    } else {
      console.log('Sign-up successful:', data);
      const { user } = data;
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: user.id, email: user.email, full_name: fullName }
        ]);

      if (profileError) {
        console.error('Error inserting into profiles:', profileError.message);
        setError(profileError.message);
      } else {
      setSuccess('Sign-up successful! Please check your email for confirmation.');
      }
    }
  };

  return (
    <Layout>
    <div className='signup-page'>
      <div className='signup-container'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className='form-group'>
        <label >Name</label>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        </div>
        <div className='form-group'>
        <label >Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className='form-group'>
        <label >Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit" className='btn'>Sign Up</button>
      </form>
      <div className='link'><p>Already have an account? <Link to='/login' className='login'>Login</Link></p></div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
    </div>
    </Layout>
  );
};
export default SignUp;
