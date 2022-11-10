import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import DashPage from "./pages/DashPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LiftLogPage from "./pages/LiftLogPage";
import CreateExercisePage from "./pages/CreateExercisePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  const token = localStorage.getItem("user");
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={token ? <DashPage /> : <LoginPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/register" element={token ? <RegisterPage />: <LoginPage />} />
        <Route exact path="/dashboard" element={token ? <DashPage />: <LoginPage />} />
        <Route exact path="/log-lift" element={token ? <LiftLogPage />: <LoginPage />} />
        <Route exact path="/create-exercise" element={token ? <CreateExercisePage />: <LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
