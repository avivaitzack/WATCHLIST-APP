import React from 'react'
import {  Route,  Link, Routes} from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import RegisterForm from './Pages/RegisterForm';
import Home from './Pages/Home';
import Nav from './Components/nav';
import GenreGallery from './Pages/GenreGallery';
import ViewMore from './Pages/ViewMore';

export default function App() {
  return (
    <div>
      <Nav/>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/genre/:genre" element={<GenreGallery/>} />
        <Route path="/viewmore/:showname" element={<ViewMore />} />
      </Routes>
    </div>
  )
}
