import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import ReviewsSection from "./ReviewsSection";
import Hero from "./Hero";

function Home() {
  const [auto, setAuto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/auto")
      .then((res) => res.json())
      .then((data) => {
        setAuto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Hero />

      {/* RICERCA VELOCE */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">Ricerca veloce</h2>

          <Card className="shadow-sm">
            <Card.Body>
              <Row className="g-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Marca</Form.Label>
                    <Form.Control placeholder="BMW, Audi..." />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Condizione</Form.Label>
                    <Form.Select>
                      <option>Tutte</option>
                      <option>Nuova</option>
                      <option>Usata</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Prezzo massimo</Form.Label>
                    <Form.Control type="number" placeholder="30000" />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button as={Link} to="/auto">
                  Cerca auto
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </section>

      {/* AUTO IN EVIDENZA */}
      <Container className="my-5">
        <h2 className="text-center mb-4">Auto in evidenza</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row>
            {auto.slice(0, 3).map((a) => (
              <Col key={a.id} md={4} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={a.immagine}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <Card.Body className="d-flex flex-column">
  <Badge
    bg={a.condizione === "NUOVA" ? "success" : "secondary"}
    className="mb-2 align-self-start"
  >
    {a.condizione === "NUOVA" ? "Nuova" : "Usata"}
  </Badge>

  <Card.Title>
    {a.marca} {a.modello}
  </Card.Title>

  <Card.Text>Anno: {a.anno}</Card.Text>
  <Card.Text>Chilometri: {a.chilometri} km</Card.Text>
  <Card.Text>Cilindrata: {a.cilindrata} cc</Card.Text>
  <Card.Text>Carburante: {a.carburante}</Card.Text>
  <Card.Text className="fw-bold">€ {a.prezzo}</Card.Text>

  <Button
    as={Link}
    to={`/auto/${a.id}`}
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

      <ReviewsSection />
    </>
  );
}

export default Home;
