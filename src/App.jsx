import { useState } from 'react'
import './App.css'
import {  Route, Routes } from "react-router-dom";
import CompanyView from './pages/CompanyView'
import StartPage from './pages/StartPage';
import CompanyPage from './pages/Company/CompanyPage'
import Layout from './pages/Layout';
import EmailDrafts from './pages/Email/EmailDrafts';
import EmailTemplate from './pages/Email/EmailTemplate';
import GenerateEmail from './pages/Email/GenerateEmail';

function App() {


  return (

    

    <Routes>
   <Route path='/' element={<CompanyView/>} />
   <Route path='/' element={<Layout/>}>
   <Route path='companyID/:id' element={<CompanyPage/>} />
   <Route path='emailDrafts' element={<EmailDrafts/>} />
   <Route path='templates/' element={<EmailTemplate/>} />
   <Route path='generate/' element={<GenerateEmail/>} />
   </Route>
   
  </Routes>
    

  )
}

export default App
