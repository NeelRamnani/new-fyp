import React, { useState } from 'react';
import { registerWithEmailAndPassword } from '../firebase';
import { Link } from 'react-router-dom';



const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const validatePassword = () => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    registerWithEmailAndPassword(name,email, password)
    .then((user) => {
        // Registration successful, redirect to login page
        console.log('Registration successful:', user);
        // Redirect to login page
       window.location.href='/dashboard';
      })
    .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="mt-14">
      {/* Image Marquee */}
      <div className="relative gap-8 m-auto flex overflow-hidden" data-aos="fade-up" data-aos-easing="ease" data-aos-duration={1000}>
        <div className="marquee__group gap-8 flex items-center justify-around flex-shrink-0 min-w-full">
          <img className="aspect-1 object-cover rounded-xl h-60 w-full" src="./images/ai/img-9.jpg" alt="Image 1" />
          {/* Add alt attribute */}
          {/* Other image tags */}
        </div>
      </div>

      <div className="login-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="login-form">
        <label>
            Username:
            <input type="text" placeholder='Enter username' required value={name} onChange={(event) => setName(event.target.value)} />
          </label>
        
          <label>
            Email:
            <input type="email" placeholder='john@gmail.com' required value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" className="form-control" required value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error && <p>{error}</p>}
        
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} required onChange={(event) => setConfirmPassword(event.target.value)} />
          </label>
          <button type="submit">Sign Up</button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className="signup">
            <br></br>
            <Link to='/login'>Already have an Account? Login Now</Link>
          </div>
        </form>
      </div>

      {/* Another Image Marquee */}
      <div className="mt-14">
        {/* Same image marquee code */}
      </div>
    </div>
  );
};

export default Signup;
