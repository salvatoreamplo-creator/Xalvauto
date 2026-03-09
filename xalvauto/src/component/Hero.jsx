import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero-car.png";

function Hero() {
  return (
    <section
      className="text-white py-5 d-flex align-items-center"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        minHeight: "420px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.45)",
        }}
      ></div>

      <Container className="text-center position-relative">
        <h1 className="display-3 fw-bold">Trova la tua prossima auto</h1>
        <p className="lead mt-3">Nuove e usate garantite da XalvAuto</p>

        <Button as={Link} to="/auto" variant="primary" size="lg" className="mt-3">
          Sfoglia il catalogo
        </Button>
      </Container>
    </section>
  );
}

export default Hero;
