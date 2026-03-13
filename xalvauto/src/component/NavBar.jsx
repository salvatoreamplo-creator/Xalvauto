import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.svg";

function NavBar() {
  return (
    <Navbar expand="lg" bg="light" className="shadow-sm">
      <Container>

        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="XalvAuto Logo" width="130" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          {/* Link principali */}
          <Nav className="me-auto">

            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={Link} to="/auto">
              Auto
            </Nav.Link>

            <Nav.Link as={Link} to="/noleggio">
              Noleggio
            </Nav.Link>

            <Nav.Link as={Link} to="/admin">
              Admin
            </Nav.Link>

          </Nav>

          {/* Icona utente */}
          <Nav className="d-flex align-items-center">
            <Nav.Link as={Link} to="/login">
              <FaUser size={22} />
            </Nav.Link>
          </Nav>
          <Button
  variant="outline-dark"
  size="sm"
  onClick={() => {
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  }}
>
  Logout
</Button>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
