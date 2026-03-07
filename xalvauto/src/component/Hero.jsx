import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-dark text-white py-5">
      <Container className="text-center">
        <h1 className="display-4 fw-bold">Trova la tua prossima auto</h1>
        <p className="lead">
          Nuove e usate garantite da XalvAuto
        </p>

        <Button as={Link} to="/auto" variant="primary" size="lg">
          Sfoglia il catalogo
        </Button>
      </Container>
    </section>
  );
}

export default Hero;