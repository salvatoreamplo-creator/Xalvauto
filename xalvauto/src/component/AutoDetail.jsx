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
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {
  FaWhatsapp,
  FaPhone,
  FaFacebookF,
  FaLink,
} from "react-icons/fa";

function AutoDetail() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [auto, setAuto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");
  const [messaggioCopia, setMessaggioCopia] = useState("");

  const telefono = "393273590047";

  useEffect(() => {
    const fetchAutoDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/auto/${id}`);

        if (!response.ok) {
          throw new Error("Auto non trovata");
        }

        const data = await response.json();
        setAuto(data);
      } catch (err) {
        console.error(err);
        setErrore("Non sono riuscito a caricare i dettagli dell'auto.");
      } finally {
        setLoading(false);
      }
    };

    fetchAutoDetail();
  }, [id, API_URL]);

  const chiama = () => {
    window.location.href = `tel:+${telefono}`;
  };

  const currentUrl = window.location.href;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  const whatsappShareUrl = auto
    ? `https://wa.me/?text=${encodeURIComponent(
        `Guarda questa auto su Xalvauto: ${auto.marca} ${auto.modello} - ${currentUrl}`
      )}`
    : `https://wa.me/?text=${encodeURIComponent(
        `Guarda questa auto su Xalvauto: ${currentUrl}`
      )}`;

  const whatsappContactLink = auto
    ? `https://wa.me/${telefono}?text=Ciao%20sono%20interessato%20alla%20${encodeURIComponent(
        auto.marca
      )}%20${encodeURIComponent(auto.modello)}`
    : "#";

  const copiaUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setMessaggioCopia("Link copiato!");
      setTimeout(() => setMessaggioCopia(""), 2000);
    } catch (error) {
      console.error("Errore nella copia del link:", error);
      setMessaggioCopia("Errore nella copia del link");
      setTimeout(() => setMessaggioCopia(""), 2000);
    }
  };

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
              <div className="d-flex justify-content-between align-items-start mb-3">
                <Badge
                  bg={auto.condizione === "NUOVA" ? "success" : "secondary"}
                >
                  {auto.condizione === "NUOVA" ? "Nuova" : "Usata"}
                </Badge>

                <div className="d-flex gap-2">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-url">Copia URL</Tooltip>}
                  >
                    <Button
                      variant="light"
                      onClick={copiaUrl}
                      className="rounded-circle border d-flex align-items-center justify-content-center"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <FaLink />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-facebook">
                        Condividi su Facebook
                      </Tooltip>
                    }
                  >
                    <Button
                      as="a"
                      href={facebookShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="light"
                      className="rounded-circle border d-flex align-items-center justify-content-center"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <FaFacebookF />
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-whatsapp">
                        Condividi su WhatsApp
                      </Tooltip>
                    }
                  >
                    <Button
                      as="a"
                      href={whatsappShareUrl}
                      target="_blank"
                      rel="noreferrer"
                      variant="light"
                      className="rounded-circle border d-flex align-items-center justify-content-center"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <FaWhatsapp />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>

              {messaggioCopia && (
                <p className="copy-message text-success mb-3">
                  {messaggioCopia}
                </p>
              )}

              <h2 className="mb-2">
                {auto.marca} {auto.modello}
              </h2>

              <h3 className="text-success fw-bold mb-4">€ {auto.prezzo}</h3>

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

              <Card className="mt-4 border-0 shadow-sm">
                <Card.Body className="text-center">
                  <h4 className="mb-3">Interessato a questa auto?</h4>

                  <p className="text-muted">
                    Contattaci per maggiori informazioni oppure prenota un test
                    drive con uno dei nostri consulenti.
                  </p>

                  <div className="d-flex justify-content-center gap-3 flex-wrap">
                    <Button variant="dark" onClick={chiama}>
                      <FaPhone className="me-2" />
                      Chiama ora
                    </Button>

                    <Button
                      variant="success"
                      href={whatsappContactLink}
                      target="_blank"
                      rel="noreferrer"
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