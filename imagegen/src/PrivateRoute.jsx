import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; // Routes aur Route import karein
import { auth } from './firebase'; // Firebase se authentication functions import karein

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (authenticated === null) return null; // Wait for authentication status

  return (
    <Route
      {...rest}
      element={authenticated === true ? <Component /> : navigate('/login')} // Use navigate to redirect to login page if not authenticated
    />
  );
};

export default PrivateRoute;
