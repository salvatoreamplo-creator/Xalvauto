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

  const [marca, setMarca] = useState("");
  const [modello, setModello] = useState("");
  const [anno, setAnno] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [chilometri, setChilometri] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [condizione, setCondizione] = useState("USATA");
  const [immagine, setImmagine] = useState(null);

  const [marcaNoleggio, setMarcaNoleggio] = useState("");
  const [modelloNoleggio, setModelloNoleggio] = useState("");
  const [prezzoGiornaliero, setPrezzoGiornaliero] = useState("");
  const [prezzoSettimanale, setPrezzoSettimanale] = useState("");
  const [disponibile, setDisponibile] = useState(true);
  const [immagineNoleggio, setImmagineNoleggio] = useState(null);

  const [loadingVendita, setLoadingVendita] = useState(false);
  const [loadingNoleggio, setLoadingNoleggio] = useState(false);

  const fetchAutoVendita = async () => {
    try {
      const response = await fetch("http://localhost:8080/auto");
      const data = await response.json();
      setAutoVendita(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAutoNoleggio = async () => {
    try {
      const response = await fetch("http://localhost:8080/noleggio");
      const data = await response.json();
      setAutoNoleggio(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAutoVendita();
    fetchAutoNoleggio();
  }, []);

  const resetVendita = () => {
    setMarca("");
    setModello("");
    setAnno("");
    setPrezzo("");
    setChilometri("");
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

  const handleSubmitVendita = async (e) => {
    e.preventDefault();
    setMessaggio("");
    setErrore("");
    setLoadingVendita(true);

    try {
      const formData = new FormData();
      formData.append("marca", marca);
      formData.append("modello", modello);
      formData.append("anno", anno);
      formData.append("prezzo", prezzo);
      formData.append("chilometri", chilometri);
      formData.append("descrizione", descrizione);
      formData.append("condizione", condizione);
      formData.append("immagine", immagine);

      const response = await fetch("http://localhost:8080/auto/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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
    } catch (err) {
      console.error(err);
      setErrore("Non sono riuscito ad aggiungere l'auto in vendita.");
    } finally {
      setLoadingVendita(false);
    }
  };

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
          Authorization: `Bearer ${token}`,
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

  const handleDeleteVendita = async (id) => {
    setMessaggio("");
    setErrore("");

    try {
      const response = await fetch(`http://localhost:8080/auto/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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

  const handleDeleteNoleggio = async (id) => {
    setMessaggio("");
    setErrore("");

    try {
      const response = await fetch(`http://localhost:8080/noleggio/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Dashboard Admin</h2>

      {messaggio && <Alert variant="success">{messaggio}</Alert>}
      {errore && <Alert variant="danger">{errore}</Alert>}

      <Tabs defaultActiveKey="vendita" className="mb-4">
        <Tab eventKey="vendita" title="Auto in vendita">
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h4 className="mb-4">Inserisci auto in vendita</h4>

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

                  <Col md={4}>
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

                  <Col md={4}>
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

                  <Col md={4}>
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

                <div className="mt-4">
                  <Button type="submit" variant="dark" disabled={loadingVendita}>
                    {loadingVendita ? "Salvataggio..." : "Aggiungi auto"}
                  </Button>
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
                      <td>
                        <Badge bg={a.condizione === "NUOVA" ? "success" : "secondary"}>
                          {a.condizione === "NUOVA" ? "Nuova" : "Usata"}
                        </Badge>
                      </td>
                      <td>
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
                        onChange={(e) => setDisponibile(e.target.value === "true")}
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
                  <Button type="submit" variant="dark" disabled={loadingNoleggio}>
                    {loadingNoleggio ? "Salvataggio..." : "Aggiungi auto a noleggio"}
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
                        <Badge bg={a.disponibile ? "success" : "secondary"}>
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