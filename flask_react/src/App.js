import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DashPage from "./pages/DashPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LiftLogPage from "./pages/LiftLogPage";
import CreateExercisePage from "./pages/CreateExercisePage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/dashboard" component={DashPage} />
        <Route exact path="/log-lift" component={LiftLogPage} />
        <Route exact path="/create-exercise" component={CreateExercisePage} />
        <Route exact={false} component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
