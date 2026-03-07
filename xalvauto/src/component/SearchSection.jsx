import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function SearchSection() {
  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Ricerca veloce</h2>

        <Card className="shadow-sm border-0">
          <Card.Body>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Marca</Form.Label>
                  <Form.Control type="text" placeholder="BMW, Audi, Mercedes..." />
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
                  <Form.Control type="number" placeholder="Es. 30000" />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-4">
              <Button as={Link} to="/auto" variant="primary">
                Cerca auto
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  );
}

export default SearchSection;