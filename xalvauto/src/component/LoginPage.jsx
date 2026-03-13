import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errore, setErrore] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrore("");

    if (email === "admin@xalvauto.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
      return;
    }

    localStorage.removeItem("isAdmin");
    setErrore("Credenziali non valide");
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: "420px" }} className="shadow-sm">
        <Card.Body>
          <h3 className="text-center mb-4">Login</h3>

          {errore && <Alert variant="danger">{errore}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" variant="dark" className="w-100">
              Accedi
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;