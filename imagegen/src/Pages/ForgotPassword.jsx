import React, { useState } from 'react';
import {sendPasswordReset } from '../firebase';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordReset(email);
      setMessage('Password reset link has been sent to your email.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div><br></br><br></br><br></br>
    <div className="login-container">
        
    
      <h2 htmlFor="email">Forgot Password?</h2><br></br>
    <form className="login-form" onSubmit={handleResetPassword}>
 
      <label htmlFor="email">Email</label>
      <input type="email" id="email"  placeholder='Enter your email' required value={email}
        onChange={(e) => setEmail(e.target.value)}/>
  
      <button type="submit">Send Email</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      <div><br></br>
      <center><a href=''>need help?</a></center>
    </div>
    </form>
   
    <br></br> <br></br></div></div>
  )
}

export default ForgotPassword