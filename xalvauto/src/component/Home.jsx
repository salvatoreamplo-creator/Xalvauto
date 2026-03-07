import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";

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
                  {/* Badge nuova/usata */}
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
    </Container>
  );
}

export default Home;
