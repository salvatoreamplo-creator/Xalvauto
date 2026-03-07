import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import { FaStar } from "react-icons/fa";

function ReviewsSection() {

  const reviews = [
    {
      id: 1,
      nome: "Ajeje B.",
      testo:
        "Ho acquistato la mia Subaru SW su XalvAuto e l'esperienza è stata fantastica. Tutto semplice e veloce.",
      foto: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 2,
      nome: "Tony P.",
      testo:
        "Catalogo molto chiaro e auto di qualità. Ho trovato subito l'auto perfetta per me.",
      foto: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 3,
      nome: "Salvo C.",
      testo:
        "Ottimo sito e prezzi competitivi. Consiglio XalvAuto a chi cerca un'auto affidabile.",
      foto: "https://i.pravatar.cc/100?img=8",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <Container>

        <h2 className="text-center mb-5">
          Cosa dicono i nostri clienti
        </h2>

        <Carousel interval={5000} indicators={false} controls={false}>

          {reviews.map((review) => (

            <Carousel.Item key={review.id}>

              <Card
                className="text-center shadow-sm border-0 mx-auto"
                style={{ maxWidth: "500px" }}
              >

                <Card.Body>

                  <Image
                    src={review.foto}
                    roundedCircle
                    width={70}
                    height={70}
                    className="mb-3"
                  />

                  <div className="mb-2 text-warning">

                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />

                  </div>

                  <p className="mb-3">
                    {review.testo}
                  </p>

                  <h6 className="fw-bold">
                    {review.nome}
                  </h6>

                </Card.Body>

              </Card>

            </Carousel.Item>

          ))}

        </Carousel>

      </Container>
    </section>
  );
}

export default ReviewsSection;