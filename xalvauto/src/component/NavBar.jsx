import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import logo from "../assets/logo.svg";

function NavBar() {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Ricerca:", search);
  };

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
          </Nav>

          {/* Icona utente */}
          <Nav className="d-flex align-items-center me-3">
            <Nav.Link as={Link} to="/login">
              <FaUser size={22} />
            </Nav.Link>
          </Nav>

          {/* Barra di ricerca */}
          <Form className="d-flex" role="search" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              placeholder="Cerca auto..."
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button variant="outline-primary" type="submit">
              Cerca
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
