import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function AutoDetail() {
  const { id } = useParams();

  const [auto, setAuto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/auto/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Auto non trovata");
        }
        return res.json();
      })
      .then((data) => {
        setAuto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrore("Non sono riuscito a caricare i dettagli dell'auto.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (errore) {
    return (
      <Container className="my-5">
        <Alert variant="danger" className="text-center">
          {errore}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col md={6}>
          <img
            src={auto.immagine}
            alt={`${auto.marca} ${auto.modello}`}
            className="img-fluid rounded shadow-sm"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Badge
                bg={auto.condizione === "NUOVA" ? "success" : "secondary"}
                className="mb-3"
              >
                {auto.condizione === "NUOVA" ? "Nuova" : "Usata"}
              </Badge>

              <h2 className="mb-3">
                {auto.marca} {auto.modello}
              </h2>

              <p>
                <strong>Anno:</strong> {auto.anno}
              </p>
              <p>
                <strong>Chilometri:</strong> {auto.chilometri} km
              </p>
              <p>
                <strong>Cilindrata:</strong> {auto.cilindrata} cc
              </p>
              <p>
                <strong>Carburante:</strong> {auto.carburante}
              </p>
              <p>
                <strong>Condizione:</strong> {auto.condizione}
              </p>
              <p>
                <strong>Prezzo:</strong> € {auto.prezzo}
              </p>
              <p>
                <strong>Descrizione:</strong> {auto.descrizione}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AutoDetail;
