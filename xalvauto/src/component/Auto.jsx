import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaFilter } from "react-icons/fa";

function Auto() {
  const [auto, setAuto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [condizioneFiltro, setCondizioneFiltro] = useState("");
  const [prezzoMassimo, setPrezzoMassimo] = useState("");
  const [ordinamento, setOrdinamento] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/auto")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Errore nel caricamento delle auto");
        }
        return res.json();
      })
      .then((data) => {
        setAuto(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrore("Non sono riuscito a caricare le auto.");
        setLoading(false);
      });
  }, []);

  const autoFiltrate = useMemo(() => {
    let risultato = auto.filter((a) => {
      const matchMarca =
        marcaFiltro.trim() === "" ||
        a.marca.toLowerCase().includes(marcaFiltro.toLowerCase());

      const matchCondizione =
        condizioneFiltro === "" || a.condizione === condizioneFiltro;

      const matchPrezzo =
        prezzoMassimo === "" || a.prezzo <= Number(prezzoMassimo);

      return matchMarca && matchCondizione && matchPrezzo;
    });

    if (ordinamento === "prezzoAsc") {
      risultato.sort((a, b) => a.prezzo - b.prezzo);
    } else if (ordinamento === "prezzoDesc") {
      risultato.sort((a, b) => b.prezzo - a.prezzo);
    } else if (ordinamento === "annoDesc") {
      risultato.sort((a, b) => b.anno - a.anno);
    } else if (ordinamento === "kmAsc") {
      risultato.sort((a, b) => a.chilometri - b.chilometri);
    }

    return risultato;
  }, [auto, marcaFiltro, condizioneFiltro, prezzoMassimo, ordinamento]);

  const resetFiltri = () => {
    setMarcaFiltro("");
    setCondizioneFiltro("");
    setPrezzoMassimo("");
    setOrdinamento("");
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 className="mb-0">Catalogo Auto</h2>

        <Button variant="dark" onClick={() => setShowFilters(true)}>
          <FaFilter className="me-2" />
          Filtri
        </Button>
      </div>

      {!loading && !errore && (
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
          <p className="mb-0">
            Auto trovate: <strong>{autoFiltrate.length}</strong>
          </p>

          <Form.Select
            value={ordinamento}
            onChange={(e) => setOrdinamento(e.target.value)}
            style={{ maxWidth: "260px" }}
          >
            <option value="">Ordina per</option>
            <option value="prezzoAsc">Prezzo crescente</option>
            <option value="prezzoDesc">Prezzo decrescente</option>
            <option value="annoDesc">Anno più recente</option>
            <option value="kmAsc">Meno chilometri</option>
          </Form.Select>
        </div>
      )}

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

      {!loading && !errore && autoFiltrate.length === 0 && (
        <Alert variant="warning" className="text-center">
          Nessuna auto trovata con questi filtri.
        </Alert>
      )}

      {!loading && !errore && autoFiltrate.length > 0 && (
        <Row>
          {autoFiltrate.map((a) => (
            <Col key={a.id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={a.immagine}
                  alt={`${a.marca} ${a.modello}`}
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

                  <Card.Text className="mb-1">
                    <strong>Anno:</strong> {a.anno}
                  </Card.Text>

                  <Card.Text className="mb-1">
                    <strong>Chilometri:</strong> {a.chilometri} km
                  </Card.Text>

                  <Card.Text className="fw-bold fs-5 mt-2">
                    € {a.prezzo}
                  </Card.Text>

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

      <Offcanvas
        show={showFilters}
        onHide={() => setShowFilters(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtra auto</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                placeholder="BMW, Audi, Mercedes..."
                value={marcaFiltro}
                onChange={(e) => setMarcaFiltro(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Condizione</Form.Label>
              <Form.Select
                value={condizioneFiltro}
                onChange={(e) => setCondizioneFiltro(e.target.value)}
              >
                <option value="">Tutte</option>
                <option value="NUOVA">Nuova</option>
                <option value="USATA">Usata</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Prezzo massimo</Form.Label>
              <Form.Control
                type="number"
                placeholder="Es. 30000"
                value={prezzoMassimo}
                onChange={(e) => setPrezzoMassimo(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" onClick={() => setShowFilters(false)}>
                Applica filtri
              </Button>

              <Button variant="secondary" onClick={resetFiltri}>
                Reset filtri
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default Auto;