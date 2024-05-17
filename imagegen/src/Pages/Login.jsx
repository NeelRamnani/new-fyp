import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signInWithGoogle, logInWithEmailAndPassword } from '../firebase';

const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const notify = () => toast("Login Successful");
  const handleSubmit = async (event) => {

    event.preventDefault();
    try {
      setError("");
  
      const userCredential = await logInWithEmailAndPassword(email, password);
  
  notify();
  
      // Redirect to dashboard page
      window.location.href = '/dashboard';
  
    } catch (error) {
      setError(error.message);
    }
  };
  const getUsers = async () => {
    try {
      const usersRef = collection(db, "users"); // Reference to "users" collection
      const querySnapshot = await getDocs(usersRef); // Get all documents in the collection
  
      const users = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        users.push(data); // Add user data to an array
      });
  
      console.log("Users:", users); // Log the retrieved user data
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };
  
  // Call the function to retrieve and view users
 
  const getUserDoc = async (userId) => { // Receive setError as a parameter
    try {
      const userRef = firebase.firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();
      return userDoc.exists ? userDoc.data() : null;
    } catch (error) {
      setError(error.message);
      return null;
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Login</button>
        <Link to='/forgotpassword'>Forgot Password? </Link>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
      <div className="social-login">
        <button className="google" onClick={signInWithGoogle}>
          <i className="fa-brands fa-google"></i> Sign in with google
        </button>
      </div>
      <div className="social-login">
        <button className="facebook">Login with Facebook</button>
      </div>
      <br />
      <div className="signup">
        <Link to='/Signup'>Don't have an Account? Signup Now</Link>
      </div>
      <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
    </div>
  );
};

export default Login;
