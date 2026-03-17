import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Servizi() {
  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1>I nostri servizi</h1>
        <p className="text-muted">
          XalvAuto offre soluzioni complete per accompagnarti nella scelta,
          gestione e manutenzione della tua auto.
        </p>
      </div>

      <Row className="g-4">
        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
              alt="Vendita auto"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Vendita auto</Card.Title>
              <Card.Text>
                Scopri il nostro parco auto in vendita, con modelli nuovi e
                usati corredati da foto e dettagli tecnici.
              </Card.Text>
              <Button as={Link} to="/auto" variant="dark" className="mt-auto">
                Scopri le auto
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2"
              alt="Noleggio auto"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Noleggio auto</Card.Title>
              <Card.Text>
                Scegli il servizio di noleggio auto per esigenze giornaliere o
                settimanali, con veicoli pronti all’uso.
              </Card.Text>
              <Button
                as={Link}
                to="/noleggio"
                variant="dark"
                className="mt-auto"
              >
                Vai al noleggio
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c"
              alt="Finanziamenti"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Finanziamenti</Card.Title>
              <Card.Text>
                Offriamo soluzioni di finanziamento personalizzate per aiutarti
                ad acquistare l’auto più adatta alle tue esigenze.
              </Card.Text>
              <Button variant="outline-dark" className="mt-auto">
                Richiedi informazioni
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3}>
          <Card className="h-100 shadow-sm">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc"
              alt="Officina"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>Officina</Card.Title>
              <Card.Text>
                La nostra officina offre manutenzione, tagliandi, controlli e
                assistenza tecnica per mantenere la tua auto sempre efficiente.
              </Card.Text>
              <Button variant="outline-dark" className="mt-auto">
                Contattacci
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Servizi;
