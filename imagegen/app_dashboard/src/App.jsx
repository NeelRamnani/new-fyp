import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import neel from '../Pages/neel';
function App() {
 

  return (
    <BrowserRouter>
 
    <Routes>
   
    <Route path='/neel' element={<neel/>}></Route>
    </Routes>
 
    </BrowserRouter>
  )
}

export default App
