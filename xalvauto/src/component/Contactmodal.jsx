import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

function ContactModal({ show, handleClose }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: "",
  });

  const [loading, setLoading] = useState(false);
  const [successo, setSuccesso] = useState("");
  const [errore, setErrore] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      messaggio: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccesso("");
    setErrore("");

    try {
      const response = await fetch("http://localhost:8080/contatti/invia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio del messaggio");
      }

      setSuccesso("Messaggio inviato con successo.");
      resetForm();

      setTimeout(() => {
        handleClose();
        setSuccesso("");
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrore("Non sono riuscito a inviare il messaggio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Contattaci</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {successo && <Alert variant="success">{successo}</Alert>}
        {errore && <Alert variant="danger">{errore}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Messaggio</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="messaggio"
              value={formData.messaggio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="dark" className="w-100" disabled={loading}>
            {loading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Invio...
              </>
            ) : (
              "Invia messaggio"
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ContactModal;