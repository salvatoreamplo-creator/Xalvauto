import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaBell } from "react-icons/fa";
import logo from "../assets/logo.svg";

function NavBar() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [ruolo, setRuolo] = useState(localStorage.getItem("ruolo"));
  const [notifiche, setNotifiche] = useState([]);
  const [loadingNotifiche, setLoadingNotifiche] = useState(false);

  const isAdmin = ruolo === "ADMIN" || ruolo === "ROLE_ADMIN";

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setRuolo(localStorage.getItem("ruolo"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ruolo");
    setToken(null);
    setRuolo(null);
    setNotifiche([]);
    navigate("/");
  };

  const fetchNotifiche = async () => {
    if (!token || !isAdmin) return;

    try {
      setLoadingNotifiche(true);

      const response = await fetch(`${API_URL}/prenotazioni-noleggio/non-lette`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel caricamento notifiche");
      }

      const data = await response.json();
      setNotifiche(data);
    } catch (error) {
      console.error("Errore notifiche:", error);
    } finally {
      setLoadingNotifiche(false);
    }
  };

  useEffect(() => {
    if (token && isAdmin) {
      fetchNotifiche();
    }
  }, [token, isAdmin, API_URL, location]);

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

            {token && isAdmin && (
              <Nav.Link as={Link} to="/admin">
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav className="d-flex align-items-center gap-2">
            {token && isAdmin && (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-notifiche"
                  className="border-0 position-relative d-flex align-items-center justify-content-center"
                >
                  <FaBell size={20} />

                  {notifiche.length > 0 && (
                    <>
                      <Badge
                        bg="danger"
                        pill
                        className="position-absolute top-0 start-100 translate-middle"
                      >
                        {notifiche.length}
                      </Badge>

                      <span
                        style={{
                          position: "absolute",
                          bottom: "2px",
                          right: "2px",
                          width: "9px",
                          height: "9px",
                          backgroundColor: "#0d6efd",
                          borderRadius: "50%",
                          border: "2px solid white",
                        }}
                      ></span>
                    </>
                  )}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ minWidth: "340px" }}>
                  <Dropdown.Header>Nuove prenotazioni</Dropdown.Header>

                  {loadingNotifiche && (
                    <Dropdown.ItemText>Caricamento...</Dropdown.ItemText>
                  )}

                  {!loadingNotifiche && notifiche.length === 0 && (
                    <Dropdown.ItemText>
                      Nessuna nuova prenotazione
                    </Dropdown.ItemText>
                  )}

                  {!loadingNotifiche &&
                    notifiche.slice(0, 5).map((pren) => (
                      <Dropdown.Item
                        key={pren.id}
                        as={Link}
                        to="/admin/prenotazioni"
                      >
                        <div className="fw-semibold">
                          {pren.nomeCliente} {pren.cognomeCliente}
                        </div>
                        <small className="text-muted">
                          {pren.auto?.marca} {pren.auto?.modello} |{" "}
                          {pren.dataInizio} → {pren.dataFine}
                        </small>
                      </Dropdown.Item>
                    ))}

                  {!loadingNotifiche && notifiche.length > 0 && (
                    <>
                      <Dropdown.Divider />
                      <Dropdown.Item as={Link} to="/admin/prenotazioni">
                        Vai a gestione prenotazioni
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}

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