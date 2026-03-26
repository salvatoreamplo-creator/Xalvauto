import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";

function AdminPrenotazioni() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
  const token = localStorage.getItem("token");

  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState("");

  const fetchPrenotazioni = async () => {
    try {
      setLoading(true);
      setErrore("");

      const response = await fetch(`${API_URL}/prenotazioni-noleggio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Errore nel caricamento delle prenotazioni");
      }

      const data = await response.json();
      setPrenotazioni(data);
    } catch (err) {
      console.error(err);
      setErrore("Non sono riuscito a caricare le prenotazioni.");
    } finally {
      setLoading(false);
    }
  };

  const segnaTutteComeLette = async () => {
    try {
      const response = await fetch(
        `${API_URL}/prenotazioni-noleggio/segna-tutte-lette`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel segnare le notifiche come lette");
      }
    } catch (err) {
      console.error("Errore segna lette:", err);
    }
  };

  useEffect(() => {
    const initPage = async () => {
      await segnaTutteComeLette();
      await fetchPrenotazioni();
    };

    initPage();
  }, []);

  const handleAnnulla = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/prenotazioni-noleggio/${id}/annulla`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'annullamento");
      }

      fetchPrenotazioni();
    } catch (err) {
      console.error(err);
      alert("Non sono riuscito ad annullare la prenotazione.");
    }
  };

  const handleConcludi = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/prenotazioni-noleggio/${id}/concludi`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante la conclusione");
      }

      fetchPrenotazioni();
    } catch (err) {
      console.error(err);
      alert("Non sono riuscito a concludere la prenotazione.");
    }
  };

  const renderBadge = (stato) => {
    if (stato === "ATTIVA") return <Badge bg="success">Attiva</Badge>;
    if (stato === "ANNULLATA") return <Badge bg="danger">Annullata</Badge>;
    if (stato === "CONCLUSA") return <Badge bg="secondary">Conclusa</Badge>;
    return <Badge bg="dark">{stato}</Badge>;
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Gestione Prenotazioni Noleggio</h2>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {errore && <Alert variant="danger">{errore}</Alert>}

      {!loading && !errore && prenotazioni.length === 0 && (
        <Alert variant="warning">Nessuna prenotazione trovata.</Alert>
      )}

      {!loading && !errore && prenotazioni.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Contatti</th>
              <th>Auto</th>
              <th>Dal</th>
              <th>Al</th>
              <th>Prezzo</th>
              <th>Stato</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {prenotazioni.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                  {p.nomeCliente} {p.cognomeCliente}
                </td>
                <td>
                  {p.emailCliente}
                  <br />
                  {p.telefonoCliente}
                </td>
                <td>
                  {p.auto?.marca} {p.auto?.modello}
                </td>
                <td>{p.dataInizio}</td>
                <td>{p.dataFine}</td>
                <td>€ {p.prezzoTotale}</td>
                <td>{renderBadge(p.stato)}</td>
                <td className="d-flex gap-2 flex-wrap">
                  {p.stato === "ATTIVA" && (
                    <>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleAnnulla(p.id)}
                      >
                        Annulla
                      </Button>

                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => handleConcludi(p.id)}
                      >
                        Concludi
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminPrenotazioni;