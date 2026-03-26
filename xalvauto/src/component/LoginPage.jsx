import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

function LoginPage() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");
  const [messaggio, setMessaggio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrore("");
    setMessaggio("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const text = await response.text();

      console.log("RISPOSTA SERVER:", text);

      if (!response.ok) {
        throw new Error(text || "Credenziali non valide");
      }

      const data = JSON.parse(text);

      localStorage.setItem("token", data.token);

      // salvo anche il ruolo admin
      // se il backend non restituisce il ruolo, lo imposto direttamente
      localStorage.setItem("ruolo", data.role || data.ruolo || "ADMIN");

      setMessaggio("Login effettuato con successo!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("ERRORE LOGIN:", err);
      setErrore(err.message || "Email o password non valide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: "420px" }} className="shadow-sm">
        <Card.Body>
          <h3 className="text-center mb-4">Login Admin</h3>

          {errore && <Alert variant="danger">{errore}</Alert>}
          {messaggio && <Alert variant="success">{messaggio}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Inserisci la tua email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Inserisci la password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              variant="dark"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Accesso...
                </>
              ) : (
                "Accedi"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;