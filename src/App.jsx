import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import CompanyView from "./pages/CompanyView";
import LoginPage from "./pages/LoginPage";
import CompanyPage from "./pages/Company/CompanyPage";
import Layout from "./pages/Layout";
import EmailDrafts from "./pages/Email/EmailDrafts";
import GenerateEmail from "./pages/Email/GenerateEmail";
import ScenarioPage from "./pages/Scenario/ScenarioPage/ScenarioPage";
import CreateScenario from "./pages/Scenario/CreateScenario";
import PrivateRoute from "./auth/privateRoute/privateRoute";
import Employees from "./pages/Employees/Employees";
import SendEmail from "./pages/Email/SendEmail";
import EditorView from "./pages/EditorPage/EditorView";

function App() {
  return (
    <Routes>
      {/* Company part */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<CompanyView />} />
      <Route path="/" element={<Layout />}>
        {/*Private route, user logs in then sees all other pages and components*/}
        <Route element={<PrivateRoute />}>
          <Route path="home" element={<CompanyPage />} />
          {/* Email part */}
          <Route path="emailDrafts" element={<EmailDrafts />} />
          <Route path="/create_email" element={<GenerateEmail />} />
          <Route path="/send_email" element={<SendEmail />} />

          {/* EditorView */}
          <Route path="/edit/:id" element={<EditorView />} />
          {/* Scenario part */}
          <Route path="scenarios/" element={<ScenarioPage />} />
          <Route path="/create_scenario/" element={<CreateScenario />} />
          <Route path="/employees/" element={<Employees />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
