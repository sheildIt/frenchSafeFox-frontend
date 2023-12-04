import { useState } from 'react'
import './App.css'
import {  Route, Routes } from "react-router-dom";
import CompanyView from './pages/CompanyView'
import StartPage from './pages/StartPage';
import CompanyPage from './pages/Company/CompanyPage'

function App() {


  return (

    

    <Routes>
   <Route path='/' element={<CompanyView/>} />
   <Route path='companyID/:id' element={<CompanyPage/>} />
  </Routes>
    

  )
}

export default App
