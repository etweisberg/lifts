import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashPage from "./pages/DashPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LiftLogPage from "./pages/LiftLogPage";
import CreateExercisePage from "./pages/CreateExercisePage";
import NotFoundPage from "./pages/NotFoundPage";
import LogoutPage from "./pages/LogoutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  UnauthenticatedRoutesWrapper,
  ProtectedRoutesWrapper,
  DynamicRedirect,
} from "./util/routes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <DynamicRedirect unAuthPath="/register" authPath="/dashboard" />
          }
        />
        <Route element={<UnauthenticatedRoutesWrapper />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoutesWrapper />}>
          <Route path="/dashboard" element={<DashPage />} />
          <Route path="/log-lift" element={<LiftLogPage />} />
          <Route path="/create-exercise" element={<CreateExercisePage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}
