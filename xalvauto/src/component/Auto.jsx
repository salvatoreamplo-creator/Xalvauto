import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { Link } from "react-router-dom";

function Auto() {
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [auto, setAuto] = useState([]);

  const [marca, setMarca] = useState("");
  const [condizione, setCondizione] = useState("");
  const [prezzoMax, setPrezzoMax] = useState("");

  const fetchAuto = async () => {
    try {
      let url = `${API_URL}/auto?`;

      if (marca) url += `marca=${encodeURIComponent(marca)}&`;
      if (condizione) url += `condizione=${encodeURIComponent(condizione)}&`;
      if (prezzoMax) url += `prezzoMax=${encodeURIComponent(prezzoMax)}&`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Errore nel caricamento delle auto");
      }

      const data = await response.json();
      setAuto(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAuto();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Catalogo Auto</h2>

      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Marca</Form.Label>
                <Form.Control
                  placeholder="Audi, BMW..."
                  value={marca}
                  onChange={(e) => setMarca(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Condizione</Form.Label>
                <Form.Select
                  value={condizione}
                  onChange={(e) => setCondizione(e.target.value)}
                >
                  <option value="">Tutte</option>
                  <option value="NUOVA">Nuova</option>
                  <option value="USATA">Usata</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Prezzo massimo</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="30000"
                  value={prezzoMax}
                  onChange={(e) => setPrezzoMax(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <Button variant="dark" onClick={fetchAuto}>
              Applica filtri
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Row>
        {auto.map((a) => (
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
    </Container>
  );
}

export default Auto;