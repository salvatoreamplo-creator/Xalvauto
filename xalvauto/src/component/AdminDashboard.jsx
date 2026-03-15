import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [messaggio, setMessaggio] = useState("");
  const [errore, setErrore] = useState("");

  const [autoVendita, setAutoVendita] = useState([]);
  const [autoNoleggio, setAutoNoleggio] = useState([]);

  const [editingId, setEditingId] = useState(null);

  // =========================
  // STATE AUTO IN VENDITA
  // =========================
  const [marca, setMarca] = useState("");
  const [modello, setModello] = useState("");
  const [anno, setAnno] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [chilometri, setChilometri] = useState("");
  const [cilindrata, setCilindrata] = useState("");
  const [carburante, setCarburante] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [condizione, setCondizione] = useState("USATA");
  const [immagine, setImmagine] = useState(null);

  // =========================
  // STATE AUTO A NOLEGGIO
  // =========================
  const [marcaNoleggio, setMarcaNoleggio] = useState("");
  const [modelloNoleggio, setModelloNoleggio] = useState("");
  const [prezzoGiornaliero, setPrezzoGiornaliero] = useState("");
  const [prezzoSettimanale, setPrezzoSettimanale] = useState("");
  const [disponibile, setDisponibile] = useState(true);
  const [immagineNoleggio, setImmagineNoleggio] = useState(null);

  const [loadingVendita, setLoadingVendita] = useState(false);
  const [loadingNoleggio, setLoadingNoleggio] = useState(false);

  const authHeaders = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  // =========================
  // FETCH DATI
  // =========================
  const fetchAutoVendita = async () => {
    try {
      const response = await fetch("http://localhost:8080/auto");
      const data = await response.json();
      setAutoVendita(data);
    } catch (err) {
      console.error(err);
      setErrore("Errore nel caricamento delle auto in vendita.");
    }
  };

  const fetchAutoNoleggio = async () => {
    try {
      const response = await fetch("http://localhost:8080/noleggio");
      const data = await response.json();
      setAutoNoleggio(data);
    } catch (err) {
      console.error(err);
      setErrore("Errore nel caricamento delle auto a noleggio.");
    }
  };

  useEffect(() => {
    fetchAutoVendita();
    fetchAutoNoleggio();
  }, []);

  // =========================
  // RESET FORM
  // =========================
  const resetVendita = () => {
    setEditingId(null);
    setMarca("");
    setModello("");
    setAnno("");
    setPrezzo("");
    setChilometri("");
    setCilindrata("");
    setCarburante("");
    setDescrizione("");
    setCondizione("USATA");
    setImmagine(null);
  };

  const resetNoleggio = () => {
    setMarcaNoleggio("");
    setModelloNoleggio("");
    setPrezzoGiornaliero("");
    setPrezzoSettimanale("");
    setDisponibile(true);
    setImmagineNoleggio(null);
  };

  // =========================
  // MODIFICA AUTO VENDITA
  // =========================
  const handleEditVendita = (auto) => {
    setEditingId(auto.id);
    setMarca(auto.marca);
    setModello(auto.modello);
    setAnno(auto.anno);
    setPrezzo(auto.prezzo);
    setChilometri(auto.chilometri);
    setCilindrata(auto.cilindrata);
    setCarburante(auto.carburante);
    setDescrizione(auto.descrizione);
    setCondizione(auto.condizione);
    setImmagine(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // =========================
  // SUBMIT AUTO VENDITA
  // =========================
  const handleSubmitVendita = async (e) => {
    e.preventDefault();
    setMessaggio("");
    setErrore("");
    setLoadingVendita(true);

    try {
      if (editingId) {
        const autoAttuale = autoVendita.find((a) => a.id === editingId);

        const body = {
          marca,
          modello,
          anno: Number(anno),
          prezzo: Number(prezzo),
          chilometri: Number(chilometri),
          cilindrata: Number(cilindrata),
          carburante,
          descrizione,
          condizione,
          immagine: autoAttuale?.immagine || "",
        };

        const response = await fetch(
          `http://localhost:8080/auto/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              ...authHeaders,
            },
            body: JSON.stringify(body),
          },
        );

        if (!response.ok) {
          throw new Error("Errore durante la modifica dell'auto");
        }

        await response.json();
        setMessaggio("Auto modificata con successo!");
        resetVendita();
        fetchAutoVendita();
      } else {
        const formData = new FormData();
        formData.append("marca", marca);
        formData.append("modello", modello);
        formData.append("anno", anno);
        formData.append("prezzo", prezzo);
        formData.append("chilometri", chilometri);
        formData.append("cilindrata", cilindrata);
        formData.append("carburante", carburante);
        formData.append("descrizione", descrizione);
        formData.append("condizione", condizione);
        formData.append("immagine", immagine);

        const response = await fetch("http://localhost:8080/auto/upload", {
          method: "POST",
          headers: {
            ...authHeaders,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Errore durante il salvataggio dell'auto");
        }

        await response.json();
        setMessaggio("Auto in vendita aggiunta con successo!");
        resetVendita();
        fetchAutoVendita();
      }
    } catch (err) {
      console.error(err);
      setErrore(
        editingId
          ? "Non sono riuscito a modificare l'auto."
          : "Non sono riuscito ad aggiungere l'auto in vendita.",
      );
    } finally {
      setLoadingVendita(false);
    }
  };

  // =========================
  // SUBMIT AUTO NOLEGGIO
  // =========================
  const handleSubmitNoleggio = async (e) => {
    e.preventDefault();
    setMessaggio("");
    setErrore("");
    setLoadingNoleggio(true);

    try {
      const formData = new FormData();
      formData.append("marca", marcaNoleggio);
      formData.append("modello", modelloNoleggio);
      formData.append("prezzoGiornaliero", prezzoGiornaliero);
      formData.append("prezzoSettimanale", prezzoSettimanale);
      formData.append("disponibile", disponibile);
      formData.append("immagine", immagineNoleggio);

      const response = await fetch("http://localhost:8080/noleggio/upload", {
        method: "POST",
        headers: {
          ...authHeaders,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Errore durante il salvataggio dell'auto a noleggio");
      }

      await response.json();
      setMessaggio("Auto a noleggio aggiunta con successo!");
      resetNoleggio();
      fetchAutoNoleggio();
    } catch (err) {
      console.error(err);
      setErrore("Non sono riuscito ad aggiungere l'auto a noleggio.");
    } finally {
      setLoadingNoleggio(false);
    }
  };

  // =========================
  // DELETE AUTO VENDITA
  // =========================
  const handleDeleteVendita = async (id) => {
    setMessaggio("");
    setErrore("");

    try {
      const response = await fetch(`http://localhost:8080/auto/${id}`, {
        method: "DELETE",
        headers: {
          ...authHeaders,
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione dell'auto");
      }

      setMessaggio("Auto in vendita eliminata con successo!");
      fetchAutoVendita();
    } catch (err) {
      console.error(err);
      setErrore("Non sono riuscito a eliminare l'auto in vendita.");
    }
  };

  // =========================
  // DELETE AUTO NOLEGGIO
  // =========================
  const handleDeleteNoleggio = async (id) => {
    setMessaggio("");
    setErrore("");

    try {
      const response = await fetch(`http://localhost:8080/noleggio/${id}`, {
        method: "DELETE",
        headers: {
          ...authHeaders,
        },
      });

      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione dell'auto a noleggio");
      }

      setMessaggio("Auto a noleggio eliminata con successo!");
      fetchAutoNoleggio();
    } catch (err) {
      console.error(err);
      setErrore("Non sono riuscito a eliminare l'auto a noleggio.");
    }
  };

  // =========================
  // TOGGLE DISPONIBILITÀ
  // =========================
  const toggleDisponibile = async (id) => {
    setMessaggio("");
    setErrore("");

    try {
      const response = await fetch(
        `http://localhost:8080/noleggio/${id}/toggle-disponibile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Errore cambio disponibilità");
      }

      const data = await response.json();

      setMessaggio(
        data.disponibile
          ? "Auto segnata come disponibile."
          : "Auto segnata come non disponibile.",
      );

      fetchAutoNoleggio();
    } catch (err) {
      console.error(err);
      setErrore("Non sono riuscito a cambiare la disponibilità.");
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Dashboard Admin</h2>

      {messaggio && <Alert variant="success">{messaggio}</Alert>}
      {errore && <Alert variant="danger">{errore}</Alert>}

      <Tabs defaultActiveKey="vendita" className="mb-4">
        <Tab eventKey="vendita" title="Auto in vendita">
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 className="mb-4">
                {editingId
                  ? "Modifica auto in vendita"
                  : "Inserisci auto in vendita"}
              </h4>

              <Form onSubmit={handleSubmitVendita}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Marca</Form.Label>
                      <Form.Control
                        type="text"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Modello</Form.Label>
                      <Form.Control
                        type="text"
                        value={modello}
                        onChange={(e) => setModello(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Anno</Form.Label>
                      <Form.Control
                        type="number"
                        value={anno}
                        onChange={(e) => setAnno(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Prezzo</Form.Label>
                      <Form.Control
                        type="number"
                        value={prezzo}
                        onChange={(e) => setPrezzo(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Chilometri</Form.Label>
                      <Form.Control
                        type="number"
                        value={chilometri}
                        onChange={(e) => setChilometri(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Cilindrata</Form.Label>
                      <Form.Control
                        type="number"
                        value={cilindrata}
                        onChange={(e) => setCilindrata(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Carburante</Form.Label>
                      <Form.Select
                        value={carburante}
                        onChange={(e) => setCarburante(e.target.value)}
                        required
                      >
                        <option value="">Seleziona carburante</option>
                        <option value="BENZINA">Benzina</option>
                        <option value="DIESEL">Diesel</option>
                        <option value="IBRIDA">Ibrida</option>
                        <option value="ELETTRICA">Elettrica</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Condizione</Form.Label>
                      <Form.Select
                        value={condizione}
                        onChange={(e) => setCondizione(e.target.value)}
                      >
                        <option value="NUOVA">Nuova</option>
                        <option value="USATA">Usata</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  {!editingId && (
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Immagine</Form.Label>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImmagine(e.target.files[0])}
                          required
                        />
                      </Form.Group>
                    </Col>
                  )}

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Descrizione</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={descrizione}
                        onChange={(e) => setDescrizione(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4 d-flex gap-2">
                  <Button
                    type="submit"
                    variant="dark"
                    disabled={loadingVendita}
                  >
                    {loadingVendita
                      ? "Salvataggio..."
                      : editingId
                        ? "Salva modifiche"
                        : "Aggiungi auto"}
                  </Button>

                  {editingId && (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={resetVendita}
                    >
                      Annulla modifica
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Lista auto in vendita</h4>

              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Modello</th>
                    <th>Anno</th>
                    <th>Prezzo</th>
                    <th>Cilindrata</th>
                    <th>Carburante</th>
                    <th>Condizione</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {autoVendita.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.marca}</td>
                      <td>{a.modello}</td>
                      <td>{a.anno}</td>
                      <td>€ {a.prezzo}</td>
                      <td>{a.cilindrata} cc</td>
                      <td>{a.carburante}</td>
                      <td>
                        <Badge
                          bg={
                            a.condizione === "NUOVA" ? "success" : "secondary"
                          }
                        >
                          {a.condizione === "NUOVA" ? "Nuova" : "Usata"}
                        </Badge>
                      </td>
                      <td className="d-flex gap-2">
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => handleEditVendita(a)}
                        >
                          Modifica
                        </Button>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteVendita(a.id)}
                        >
                          Elimina
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="noleggio" title="Auto a noleggio">
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 className="mb-4">Inserisci auto a noleggio</h4>

              <Form onSubmit={handleSubmitNoleggio}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Marca</Form.Label>
                      <Form.Control
                        type="text"
                        value={marcaNoleggio}
                        onChange={(e) => setMarcaNoleggio(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Modello</Form.Label>
                      <Form.Control
                        type="text"
                        value={modelloNoleggio}
                        onChange={(e) => setModelloNoleggio(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Prezzo giornaliero</Form.Label>
                      <Form.Control
                        type="number"
                        value={prezzoGiornaliero}
                        onChange={(e) => setPrezzoGiornaliero(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Prezzo settimanale</Form.Label>
                      <Form.Control
                        type="number"
                        value={prezzoSettimanale}
                        onChange={(e) => setPrezzoSettimanale(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Disponibilità</Form.Label>
                      <Form.Select
                        value={disponibile ? "true" : "false"}
                        onChange={(e) =>
                          setDisponibile(e.target.value === "true")
                        }
                      >
                        <option value="true">Disponibile</option>
                        <option value="false">Non disponibile</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Immagine</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImmagineNoleggio(e.target.files[0])}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="mt-4">
                  <Button
                    type="submit"
                    variant="dark"
                    disabled={loadingNoleggio}
                  >
                    {loadingNoleggio
                      ? "Salvataggio..."
                      : "Aggiungi auto a noleggio"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="mb-4">Lista auto a noleggio</h4>

              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Marca</th>
                    <th>Modello</th>
                    <th>Prezzo giornaliero</th>
                    <th>Prezzo settimanale</th>
                    <th>Disponibilità</th>
                    <th>Azioni</th>
                  </tr>
                </thead>
                <tbody>
                  {autoNoleggio.map((a) => (
                    <tr key={a.id}>
                      <td>{a.id}</td>
                      <td>{a.marca}</td>
                      <td>{a.modello}</td>
                      <td>€ {a.prezzoGiornaliero}</td>
                      <td>€ {a.prezzoSettimanale}</td>
                      <td>
                        <Badge
                          pill
                          bg={a.disponibile ? "success" : "danger"}
                          className="px-3 py-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleDisponibile(a.id)}
                          title="Clicca per cambiare disponibilità"
                        >
                          {a.disponibile ? "Disponibile" : "Non disponibile"}
                        </Badge>
                      </td>

                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteNoleggio(a.id)}
                        >
                          Elimina
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdminDashboard;
