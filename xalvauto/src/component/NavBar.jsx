import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.svg";

function NavBar() {
  useLocation(); // forza il rerender al cambio pagina
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="XalvAuto Logo" width="130" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
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
            <Nav.Link as={Link} to="/servizi">
              Servizi
            </Nav.Link>

            {token && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav className="d-flex align-items-center">
            {!token ? (
              <Nav.Link as={Link} to="/login">
                <FaUser size={22} />
              </Nav.Link>
            ) : (
              <Button variant="outline-dark" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
