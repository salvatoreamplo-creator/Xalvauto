import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function Noleggio() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [autoNoleggio, setAutoNoleggio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [autoSelezionata, setAutoSelezionata] = useState(null);

  const [nomeCliente, setNomeCliente] = useState("");
  const [cognomeCliente, setCognomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefonoCliente, setTelefonoCliente] = useState("");
  const [dataInizio, setDataInizio] = useState("");
  const [dataFine, setDataFine] = useState("");

  const [invioLoading, setInvioLoading] = useState(false);
  const [messaggioSuccesso, setMessaggioSuccesso] = useState("");
  const [errorePrenotazione, setErrorePrenotazione] = useState("");

  useEffect(() => {
    const fetchNoleggio = async () => {
      try {
        const response = await fetch(`${API_URL}/noleggio`);

        if (!response.ok) {
          throw new Error("Errore nel caricamento delle auto a noleggio");
        }

        const data = await response.json();
        setAutoNoleggio(data);
      } catch (err) {
        console.error(err);
        setErrore("Non sono riuscito a caricare le auto a noleggio.");
      } finally {
        setLoading(false);
      }
    };

    fetchNoleggio();
  }, [API_URL]);

  const apriModal = (auto) => {
    setAutoSelezionata(auto);
    setShowModal(true);
    setMessaggioSuccesso("");
    setErrorePrenotazione("");
    setNomeCliente("");
    setCognomeCliente("");
    setEmailCliente("");
    setTelefonoCliente("");
    setDataInizio("");
    setDataFine("");
  };

  const chiudiModal = () => {
    setShowModal(false);
    setAutoSelezionata(null);
    setErrorePrenotazione("");
  };

  const handlePrenotazione = async (e) => {
    e.preventDefault();

    setErrorePrenotazione("");
    setMessaggioSuccesso("");

    if (!autoSelezionata) {
      setErrorePrenotazione("Auto non selezionata.");
      return;
    }

    if (!nomeCliente || !cognomeCliente || !emailCliente || !telefonoCliente || !dataInizio || !dataFine) {
      setErrorePrenotazione("Compila tutti i campi.");
      return;
    }

    if (new Date(dataFine) < new Date(dataInizio)) {
      setErrorePrenotazione("La data di fine non può essere prima della data di inizio.");
      return;
    }

    try {
      setInvioLoading(true);

      const response = await fetch(`${API_URL}/prenotazioni-noleggio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          autoId: autoSelezionata.id,
          nomeCliente,
          cognomeCliente,
          emailCliente,
          telefonoCliente,
          dataInizio,
          dataFine,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Errore durante la prenotazione.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch {
          // ignore
        }
        throw new Error(errorMessage);
      }

      setMessaggioSuccesso("Prenotazione effettuata con successo!");
      setTimeout(() => {
        chiudiModal();
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorePrenotazione(err.message || "Prenotazione non riuscita.");
    } finally {
      setInvioLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h2>Noleggio Auto</h2>
        <p className="text-muted">
          Scegli la tua auto a noleggio giornaliero o settimanale
        </p>
      </div>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {errore && (
        <Alert variant="danger" className="text-center">
          {errore}
        </Alert>
      )}

      {!loading && !errore && autoNoleggio.length === 0 && (
        <Alert variant="warning" className="text-center">
          Nessuna auto a noleggio disponibile.
        </Alert>
      )}

      {!loading && !errore && autoNoleggio.length > 0 && (
        <Row>
          {autoNoleggio.map((auto) => (
            <Col key={auto.id} md={6} lg={3} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={auto.immagine}
                  alt={`${auto.marca} ${auto.modello}`}
                  style={{ height: "220px", objectFit: "cover" }}
                />

                <Card.Body className="d-flex flex-column">
                  <Badge
                    bg={auto.disponibile ? "success" : "secondary"}
                    className="mb-2 align-self-start"
                  >
                    {auto.disponibile ? "Prenotabile" : "Non disponibile"}
                  </Badge>

                  <Card.Title>
                    {auto.marca} {auto.modello}
                  </Card.Title>

                  <Card.Text className="mb-1">
                    <strong>Prezzo giornaliero:</strong> € {auto.prezzoGiornaliero}
                  </Card.Text>

                  <Card.Text className="mb-3">
                    <strong>Prezzo settimanale:</strong> € {auto.prezzoSettimanale}
                  </Card.Text>

                  <Button
                    variant="outline-dark"
                    className="mt-auto"
                    disabled={!auto.disponibile}
                    onClick={() => apriModal(auto)}
                  >
                    {auto.disponibile ? "Prenota ora" : "Non disponibile"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <Modal show={showModal} onHide={chiudiModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {autoSelezionata
              ? `Prenota ${autoSelezionata.marca} ${autoSelezionata.modello}`
              : "Prenotazione"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {errorePrenotazione && (
            <Alert variant="danger">{errorePrenotazione}</Alert>
          )}

          {messaggioSuccesso && (
            <Alert variant="success">{messaggioSuccesso}</Alert>
          )}

          <Form onSubmit={handlePrenotazione}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Cognome</Form.Label>
              <Form.Control
                type="text"
                value={cognomeCliente}
                onChange={(e) => setCognomeCliente(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={emailCliente}
                onChange={(e) => setEmailCliente(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Telefono</Form.Label>
              <Form.Control
                type="text"
                value={telefonoCliente}
                onChange={(e) => setTelefonoCliente(e.target.value)}
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Data inizio</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataInizio}
                    onChange={(e) => setDataInizio(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Data fine</Form.Label>
                  <Form.Control
                    type="date"
                    value={dataFine}
                    onChange={(e) => setDataFine(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="dark" disabled={invioLoading} className="w-100">
              {invioLoading ? "Invio in corso..." : "Conferma prenotazione"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Noleggio;