import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <div className="row justify-content-center">
        <div className="col-6 text-center">

          {/* Icone social cliccabili */}
          <div className="mb-3">
            <a href="https://www.facebook.com/salvatore.amplo/" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="footer-icon me-3" size={24} />
            </a>
            <a href="https://www.instagram.com/salvatore_amplo/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="footer-icon me-3" size={24} />
            </a>
            <a href="https://twitter.com/salvatore.amplo/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="footer-icon me-3" size={24} />
            </a>
          </div>

          {/* Copyright automatico */}
          <div className="copyright text-muted">
            © Xalvauto {new Date().getFullYear()}.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;