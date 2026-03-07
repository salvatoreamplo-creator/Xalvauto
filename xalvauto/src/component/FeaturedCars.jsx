import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function FeaturedCars() {
  const [autoInEvidenza, setAutoInEvidenza] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/auto")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento delle auto");
        }
        return res.json();
      })
      .then((data) => {
        setAutoInEvidenza(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrore("Non sono riuscito a caricare le auto in evidenza.");
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-5">
      <Container>
        <h2 className="text-center mb-4">Auto in evidenza</h2>

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

        {!loading && !errore && autoInEvidenza.length === 0 && (
          <Alert variant="warning" className="text-center">
            Nessuna auto disponibile al momento.
          </Alert>
        )}

        {!loading && !errore && autoInEvidenza.length > 0 && (
          <Row>
            {autoInEvidenza.slice(0, 3).map((auto) => (
              <Col key={auto.id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={auto.immagine}
                    alt={`${auto.marca} ${auto.modello}`}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <Card.Body className="d-flex flex-column">
                    <Badge
                      bg={auto.condizione === "NUOVA" ? "success" : "secondary"}
                      className="mb-2 align-self-start"
                    >
                      {auto.condizione === "NUOVA" ? "Nuova" : "Usata"}
                    </Badge>

                    <Card.Title>
                      {auto.marca} {auto.modello}
                    </Card.Title>

                    <Card.Text className="mb-1">
                      <strong>Anno:</strong> {auto.anno}
                    </Card.Text>

                    <Card.Text className="mb-1">
                      <strong>Chilometri:</strong> {auto.chilometri} km
                    </Card.Text>

                    <Card.Text className="fw-bold fs-5 mt-2">
                      € {auto.prezzo}
                    </Card.Text>

                    <Button
                      as={Link}
                      to={`/auto/${auto.id}`}
                      variant="outline-primary"
                      className="mt-auto"
                    >
                      Vedi dettagli
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="text-center mt-3">
          <Button as={Link} to="/auto" variant="dark">
            Vai al catalogo completo
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedCars;