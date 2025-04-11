import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AboutUs from "./pages/AboutUs"
import Appointment from "./pages/Appointment"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import {ToastContainer} from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/appointment' element={<Appointment/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
        <ToastContainer position='top-center' />
      </Router>
    </div>
  )
}

export default App