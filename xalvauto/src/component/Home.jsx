import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Hero from "./Hero";
import ReviewsSection from "./ReviewsSection";

function Home() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [auto, setAuto] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const response = await fetch(`${API_URL}/auto`);

        if (!response.ok) {
          throw new Error("Errore nel caricamento auto");
        }

        const data = await response.json();

        const autoMescolate = [...data].sort(() => Math.random() - 0.5);
        const autoInEvidenza = autoMescolate.slice(0, 3);

        setAuto(autoInEvidenza);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuto();
  }, [API_URL]);

  return (
    <>
      <Hero />

      <Container className="my-5">
        <h2 className="text-center mb-4">Auto in evidenza</h2>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Row className="g-4">
            {auto.map((car) => (
              <Col key={car.id} md={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Img
                    variant="top"
                    src={car.immagine}
                    alt={`${car.marca} ${car.modello}`}
                    style={{ height: "220px", objectFit: "cover" }}
                  />

                  <Card.Body className="d-flex flex-column">
                    <Badge
                      bg={car.condizione === "NUOVA" ? "success" : "secondary"}
                      className="mb-2 align-self-start"
                    >
                      {car.condizione === "NUOVA" ? "Nuova" : "Usata"}
                    </Badge>

                    <Card.Title>
                      {car.marca} {car.modello}
                    </Card.Title>

                    <Card.Text className="text-success fw-bold fs-5">
                      € {car.prezzo}
                    </Card.Text>

                    <Card.Text>
                      <strong>Anno:</strong> {car.anno}
                    </Card.Text>

                    <Card.Text>
                      <strong>Chilometri:</strong> {car.chilometri} km
                    </Card.Text>

                    <Button
                      as={Link}
                      to={`/auto/${car.id}`}
                      variant="primary"
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
      </Container>

      <ReviewsSection />
    </>
  );
}

export default Home;
