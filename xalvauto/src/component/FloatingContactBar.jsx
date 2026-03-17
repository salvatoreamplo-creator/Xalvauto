import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import ContactModal from "./Contactmodal";

function FloatingContactBar() {
  const telefono = "393273590047";
  const whatsappLink = `https://wa.me/${telefono}?text=Ciao,%20vorrei%20avere%20maggiori%20informazioni`;

  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <div className="floating-contact-mobile">
        <a href={`tel:+${telefono}`} className="floating-btn call-btn">
          <FaPhoneAlt className="me-2" />
          Chiama
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn whatsapp-btn"
        >
          <FaWhatsapp className="me-2" />
          WhatsApp
        </a>

        <button type="button" className="floating-btn contact-btn" onClick={handleOpen}>
          <MdEmail className="me-2" />
          Contatta
        </button>
      </div>

      <div className="floating-contact-desktop">
        <a href={`tel:+${telefono}`} className="desktop-contact-btn call-btn">
          <FaPhoneAlt />
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="desktop-contact-btn whatsapp-btn"
        >
          <FaWhatsapp />
        </a>

        <button type="button" className="desktop-contact-btn contact-btn" onClick={handleOpen}>
          <MdEmail />
        </button>
      </div>

      <ContactModal show={showModal} handleClose={handleClose} />
    </>
  );
}

export default FloatingContactBar;