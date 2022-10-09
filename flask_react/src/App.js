import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashPage from "./pages/DashPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LiftLogPage from "./pages/LiftLogPage";
import CreateExercisePage from "./pages/CreateExercisePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LoginPage/>} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route exact path="/register" element={<RegisterPage/>} />
        <Route exact path="/dashboard" element={<DashPage/>} />
        <Route exact path="/log-lift" element={<LiftLogPage/>} />
        <Route exact path="/create-exercise" element={<CreateExercisePage/>} />
        <Route exact={false} element={<NotFoundPage/>} />
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
