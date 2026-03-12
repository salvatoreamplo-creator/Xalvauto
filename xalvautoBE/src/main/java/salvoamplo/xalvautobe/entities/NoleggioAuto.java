package salvoamplo.xalvautobe.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "noleggio_auto")
public class NoleggioAuto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marca;
    private String modello;
    private double prezzoGiornaliero;
    private double prezzoSettimanale;
    private String immagine;
    private boolean disponibile;

    public NoleggioAuto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }

    public String getModello() {
        return modello;
    }

    public void setModello(String modello) {
        this.modello = modello;
    }

    public double getPrezzoGiornaliero() {
        return prezzoGiornaliero;
    }

    public void setPrezzoGiornaliero(double prezzoGiornaliero) {
        this.prezzoGiornaliero = prezzoGiornaliero;
    }

    public double getPrezzoSettimanale() {
        return prezzoSettimanale;
    }

    public void setPrezzoSettimanale(double prezzoSettimanale) {
        this.prezzoSettimanale = prezzoSettimanale;
    }

    public String getImmagine() {
        return immagine;
    }

    public void setImmagine(String immagine) {
        this.immagine = immagine;
    }

    public boolean isDisponibile() {
        return disponibile;
    }

    public void setDisponibile(boolean disponibile) {
        this.disponibile = disponibile;
    }
}