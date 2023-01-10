import logo from "../images/favicon.ico";
import Navbar from "react-bootstrap/Navbar";

export default function UnauthedNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand className="px-2" href="/">
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
        />
        Lifts
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="px-4 justify-content-end">
        <a href="/login" className="btn btn-outline-primary mx-1 my-2 my-sm-0">
          Login
        </a>
        <a
          href="/register"
          className="btn btn-outline-success mx-1 my-2 my-sm-0"
        >
          Sign Up
        </a>
      </Navbar.Collapse>
    </Navbar>
  );
}
