import { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";

function ReviewsSection() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    testo: "",
    voto: 5,
    foto: "",
  });

  const [errors, setErrors] = useState({});

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/reviews`);

      if (!response.ok) {
        throw new Error("Errore nel recupero delle recensioni");
      }

      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error(error);
      setErrorMessage("Non sono riuscito a caricare le recensioni.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const visibleReviews = useMemo(() => {
    return showAll ? reviews : reviews.slice(0, 5);
  }, [reviews, showAll]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.voto, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "voto" ? Number(value) : value,
    }));
  };

  const handleStarClick = (starValue) => {
    setFormData((prev) => ({
      ...prev,
      voto: starValue,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nome.trim()) {
      newErrors.nome = "Inserisci il nome";
    }

    if (!formData.cognome.trim()) {
      newErrors.cognome = "Inserisci il cognome";
    }

    if (!formData.testo.trim()) {
      newErrors.testo = "Inserisci una recensione";
    } else if (formData.testo.trim().length < 10) {
      newErrors.testo = "La recensione deve avere almeno 10 caratteri";
    }

    if (formData.voto < 1 || formData.voto > 5) {
      newErrors.voto = "Il voto deve essere da 1 a 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      setSending(true);

      const response = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: formData.nome.trim(),
          cognome: formData.cognome.trim(),
          testo: formData.testo.trim(),
          voto: formData.voto,
          foto: formData.foto.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Errore durante il salvataggio della recensione");
      }

      setFormData({
        nome: "",
        cognome: "",
        testo: "",
        voto: 5,
        foto: "",
      });

      setErrors({});
      setSuccessMessage("Recensione pubblicata con successo.");
      setShowAll(false);

      await fetchReviews();
    } catch (error) {
      console.error(error);
      setErrorMessage("Non sono riuscito a pubblicare la recensione.");
    } finally {
      setSending(false);
    }
  };

  const renderStars = (rating, clickable = false) => {
    return [...Array(5)].map((_, index) => {
      const starNumber = index + 1;
      const isFilled = starNumber <= rating;

      return (
        <span
          key={starNumber}
          onClick={clickable ? () => handleStarClick(starNumber) : undefined}
          style={{
            cursor: clickable ? "pointer" : "default",
            fontSize: "1.1rem",
            marginRight: "4px",
          }}
        >
          {isFilled ? <FaStar /> : <FaRegStar />}
        </span>
      );
    });
  };

  return (
    <section className="py-5 bg-light">
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold">Cosa dicono i nostri clienti</h2>
          <p className="text-muted mb-2">Recensioni dei clienti XalvAuto</p>

          {reviews.length > 0 && (
            <div className="d-flex justify-content-center align-items-center gap-2 text-warning fw-semibold">
              <span>{renderStars(Math.round(averageRating))}</span>
              <span className="text-dark">
                {averageRating}/5 su {reviews.length} recensioni
              </span>
            </div>
          )}
        </div>

        <Row className="g-4">
          <Col lg={5}>
            <Card className="border-0 shadow-sm rounded-4 h-100">
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-3">Lascia una recensione</h4>

                {successMessage && (
                  <Alert variant="success">{successMessage}</Alert>
                )}

                {errorMessage && (
                  <Alert variant="danger">{errorMessage}</Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          type="text"
                          name="nome"
                          value={formData.nome}
                          onChange={handleChange}
                          placeholder="Inserisci il nome"
                          isInvalid={!!errors.nome}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nome}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                          type="text"
                          name="cognome"
                          value={formData.cognome}
                          onChange={handleChange}
                          placeholder="Inserisci il cognome"
                          isInvalid={!!errors.cognome}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.cognome}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Foto profilo (facoltativa)</Form.Label>
                        <Form.Control
                          type="text"
                          name="foto"
                          value={formData.foto}
                          onChange={handleChange}
                          placeholder="Incolla un URL immagine opzionale"
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Valutazione</Form.Label>
                        <div className="text-warning fs-5">
                          {renderStars(formData.voto, true)}
                        </div>
                        {errors.voto && (
                          <div className="text-danger small mt-1">
                            {errors.voto}
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group>
                        <Form.Label>Recensione</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          name="testo"
                          value={formData.testo}
                          onChange={handleChange}
                          placeholder="Scrivi qui la tua esperienza..."
                          isInvalid={!!errors.testo}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.testo}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Button
                        type="submit"
                        className="w-100 rounded-pill fw-semibold"
                        disabled={sending}
                      >
                        {sending ? "Pubblicazione..." : "Pubblica recensione"}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={7}>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            ) : (
              <>
                <Row className="g-4">
                  {visibleReviews.map((review) => (
                    <Col xs={12} key={review.id}>
                      <Card className="border-0 shadow-sm rounded-4 h-100">
                        <Card.Body className="p-4">
                          <div className="d-flex align-items-start gap-3">
                            <div className="flex-shrink-0">
                              {review.foto ? (
                                <Image
                                  src={review.foto}
                                  roundedCircle
                                  width={60}
                                  height={60}
                                  style={{ objectFit: "cover" }}
                                />
                              ) : (
                                <div
                                  className="d-flex align-items-center justify-content-center bg-secondary-subtle rounded-circle"
                                  style={{ width: "60px", height: "60px" }}
                                >
                                  <FaUserCircle
                                    size={34}
                                    className="text-secondary"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="w-100">
                              <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
                                <h6 className="fw-bold mb-1 mb-md-0">
                                  {review.nome} {review.cognome}
                                </h6>

                                <small className="text-muted">
                                  {new Date(review.dataCreazione).toLocaleDateString("it-IT")}
                                </small>
                              </div>

                              <div className="text-warning mb-2">
                                {renderStars(review.voto)}
                              </div>

                              <p className="mb-0 text-secondary">{review.testo}</p>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                {reviews.length > 5 && (
                  <div className="text-center mt-4">
                    <Button
                      variant="outline-dark"
                      className="rounded-pill px-4"
                      onClick={() => setShowAll((prev) => !prev)}
                    >
                      {showAll ? "Mostra meno" : "Mostra altre recensioni"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ReviewsSection;