import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function Noleggio() {
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [autoNoleggio, setAutoNoleggio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

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
                    {auto.disponibile ? "Disponibile" : "Non disponibile"}
                  </Badge>

                  <Card.Title>
                    {auto.marca} {auto.modello}
                  </Card.Title>

                  <Card.Text className="mb-1">
                    <strong>Prezzo giornaliero:</strong> €{" "}
                    {auto.prezzoGiornaliero}
                  </Card.Text>

                  <Card.Text className="mb-3">
                    <strong>Prezzo settimanale:</strong> €{" "}
                    {auto.prezzoSettimanale}
                  </Card.Text>

                  <Button
                    variant="outline-dark"
                    className="mt-auto"
                    disabled={!auto.disponibile}
                  >
                    {auto.disponibile ? "Prenota ora" : "Non disponibile"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Noleggio;