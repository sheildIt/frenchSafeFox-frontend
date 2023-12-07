import { useState } from 'react'
import './App.css'
import {  Route, Routes } from "react-router-dom";
import CompanyView from './pages/CompanyView';
import LoginPage from './pages/LoginPage';
import CompanyPage from './pages/Company/CompanyPage'
import Layout from './pages/Layout';
import EmailDrafts from './pages/Email/EmailDrafts';
import EmailTemplate from './pages/Email/EmailTemplate';
import ScenarioPage from './pages/Scenario/ScenarioPage/ScenarioPage';
import CreateScenario from './pages/Scenario/CreateScenario';
import PrivateRoute from './auth/privateRoute/privateRoute';

function App() {


  return (

    

    <Routes>
         {/* Company part */}
         <Route path='/login' element={<LoginPage/>} />
   <Route path='/' element={<CompanyView/>} />
   <Route path='/' element={<Layout/>}>
    {/*Private route, user logs in then sees all other pages and components*/}
   <Route element={<PrivateRoute/>}>
   <Route path='companyID/:id' element={<CompanyPage/>} />
      {/* Email part */}
   <Route path='emailDrafts' element={<EmailDrafts/>} />
   <Route path='templates/' element={<EmailTemplate/>} />
   {/* Scenario part */}
   <Route path='scenarios/' element={<ScenarioPage/>} />
   <Route path='/create_scenario/' element={<CreateScenario/>} />
   </Route>
   </Route>
   
  </Routes>
    

  )
}

export default App
