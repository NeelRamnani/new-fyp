import React, { useState } from 'react';
import {BrowserRouter, Routes, Route  } from "react-router-dom";
import Home from './Pages/Home';
import Contact from './Pages/Contact';
import Nav from './Components/Nav';
import Login from './Pages/Login';
import Footer from './Components/Footer';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import Dashboard from './Pages/Dashboard';
import Documentation from './Pages/Documentation';

import 'firebase/auth';


function App  () {
  

  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(true);

  return (
    
   <BrowserRouter>
    {showNavbarAndFooter && <Nav />}
   <Routes>
   <Route path='/' element={<Home/>}></Route>
   <Route path='/contact' element={<Contact/>}></Route>
   <Route path='/Documentation' element={<Documentation/>}></Route>
   <Route path='/Login' element={<Login/>}></Route>
   <Route path='/neel' element={<neel/>}></Route>
   <Route path='/Signup' element={<Signup/>}></Route>
   {/* <ProtectedRoute path='/dashboard' component={Dashboard} /> */}
   
   <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
   
   </Routes>
   {showNavbarAndFooter && <Footer />}
   </BrowserRouter>
  )
}

export default App