import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import { FaWhatsapp, FaPhone } from "react-icons/fa";

function AutoDetail() {
  const { id } = useParams();

  const [auto, setAuto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  // inserisci il tuo numero
  const telefono = "393273590047";

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

  const chiama = () => {
    window.location.href = `tel:+${telefono}`;
  };

  const whatsappLink = auto
    ? `https://wa.me/${telefono}?text=Ciao%20sono%20interessato%20alla%20${encodeURIComponent(
        auto.marca
      )}%20${encodeURIComponent(auto.modello)}`
    : "#";

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
        {/* FOTO AUTO */}
        <Col md={6}>
          <img
            src={auto.immagine}
            alt={`${auto.marca} ${auto.modello}`}
            className="img-fluid rounded shadow-sm"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </Col>

        {/* DETTAGLI AUTO */}
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Badge
                bg={auto.condizione === "NUOVA" ? "success" : "secondary"}
                className="mb-3"
              >
                {auto.condizione === "NUOVA" ? "Nuova" : "Usata"}
              </Badge>

              <h2 className="mb-2">
                {auto.marca} {auto.modello}
              </h2>

              {/* PREZZO EVIDENZIATO */}
              <h3 className="text-success fw-bold mb-4">€ {auto.prezzo}</h3>

              {/* CARATTERISTICHE AUTO */}
              <Row className="mb-3">
                <Col xs={6}>
                  <strong>Anno</strong>
                  <div>{auto.anno}</div>
                </Col>

                <Col xs={6}>
                  <strong>Chilometri</strong>
                  <div>{auto.chilometri} km</div>
                </Col>

                <Col xs={6} className="mt-2">
                  <strong>Cilindrata</strong>
                  <div>{auto.cilindrata} cc</div>
                </Col>

                <Col xs={6} className="mt-2">
                  <strong>Carburante</strong>
                  <div>{auto.carburante}</div>
                </Col>
              </Row>

              <p>
                <strong>Descrizione:</strong> {auto.descrizione}
              </p>

              

              {/* SEZIONE TEST DRIVE */}
              <Card className="mt-4 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <h4 className="mb-3">Interessato a questa auto?</h4>

                  <p className="text-muted">
                    Contattaci per maggiori informazioni oppure prenota un test
                    drive con uno dei nostri consulenti.
                  </p>

                  <div className="d-flex justify-content-center gap-3">
                    <Button variant="dark" onClick={chiama}>
                      <FaPhone className="me-2" />
                      Chiama ora
                    </Button>

                    <Button
                      variant="success"
                      href={whatsappLink}
                      target="_blank"
                    >
                      <FaWhatsapp className="me-2" />
                      WhatsApp
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AutoDetail;