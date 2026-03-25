import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import ReviewsSection from "./ReviewsSection";
import Hero from "./Hero";

function Home() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [autoEvidenza, setAutoEvidenza] = useState([]);
  const [loading, setLoading] = useState(true);

  const getRandomAuto = (lista, numero) => {
    const shuffled = [...lista].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numero);
  };

  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const response = await fetch(`${API_URL}/auto`);

        if (!response.ok) {
          throw new Error("Errore nel caricamento delle auto");
        }

        const data = await response.json();
        setAutoEvidenza(getRandomAuto(data, 3));
      } catch (err) {
        console.error(err);
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
        ) : autoEvidenza.length > 0 ? (
          <Carousel interval={5000} pause="hover">
            {autoEvidenza.map((a) => (
              <Carousel.Item key={a.id}>
                <div className="d-flex justify-content-center">
                  <Card className="shadow-sm" style={{ width: "28rem" }}>
                    <Card.Img
                      variant="top"
                      src={a.immagine}
                      style={{ height: "260px", objectFit: "cover" }}
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
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <p className="text-center">Nessuna auto disponibile.</p>
        )}

        <div className="text-center mt-4">
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