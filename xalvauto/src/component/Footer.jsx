import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-light py-5 mt-5 border-top">
      <Container>
        <Row className="align-items-start text-center text-md-start">
          {/* CONTATTI */}
          <Col md={4} className="mb-4">
            <h5>XalvAuto</h5>

            <p className="mb-1">Via delle Gardenie 17</p>

            <p className="mb-1">92019 Sciacca (AG)</p>

            <p className="mb-1">Tel: 3273590047</p>

            <p>Email: xalvauto@gmail.com</p>
            <p>Orari: Lun-Ven 9:00-19:00 sab 9:00-13:00</p>
          </Col>

          {/* MAPPA */}
          <Col md={4} className="mb-4 text-center">
            <h5 className="mb-3">Dove siamo</h5>

            <iframe
              title="mappa xalvauto"
              src="https://www.google.com/maps?q=Via+delle+Gardenie+17+Sciacca&output=embed"
              width="100%"
              height="170"
              style={{ border: 0, borderRadius: "8px" }}
              loading="lazy"
            ></iframe>
          </Col>

          {/* SOCIAL */}
          <Col md={4} className="mb-4 text-center text-md-end">
            <h5 className="mb-3">Seguici</h5>

            <a
              href="https://www.facebook.com/salvatore.amplo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark me-3"
            >
              <FaFacebookF size={22} />
            </a>

            <a
              href="https://www.instagram.com/salvatore_amplo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark me-3"
            >
              <FaInstagram size={22} />
            </a>

            <a
              href="https://twitter.com/salvatore.amplo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark"
            >
              <FaTwitter size={22} />
            </a>
          </Col>
        </Row>

        <hr />

        <div className="text-center text-muted">
          © XalvAuto {new Date().getFullYear()}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
