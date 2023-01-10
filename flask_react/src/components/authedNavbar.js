import logo from "../images/favicon.ico";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function AuthedNavbar() {
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
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/log-lift">Log Lift</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="px-4 justify-content-end">
        <a href="/logout" className="btn btn-outline-danger my-2 my-sm-0">
          Logout
        </a>
      </Navbar.Collapse>
    </Navbar>
  );
}
