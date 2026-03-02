import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaUser } from 'react-icons/fa';  // icona persona da react-icons
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/logo.svg';

function BasicExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" width="150" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Auto</Nav.Link>
          </Nav>

          {/* Icona persona */}
          <Nav className="align-items-center me-3">
            <Nav.Link href="#login">
              <FaUser size={22} />
            </Nav.Link>
          </Nav>

          {/* Barra ricerca */}
          <Form className="d-flex" role="search" onSubmit={e => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Cerca auto..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary" type="submit">Cerca</Button>
          </Form>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;