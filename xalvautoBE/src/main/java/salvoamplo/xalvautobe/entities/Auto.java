package salvoamplo.xalvautobe.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "auto")
public class Auto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String marca;
    private String modello;
    private int anno;
    private double prezzo;
    private int chilometri;
    private String immagine;

    @Enumerated(EnumType.STRING)
    private CondizioneAuto condizione;

    @Column(length = 2000)
    private String descrizione;

    public Auto() {
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

    public int getAnno() {
        return anno;
    }

    public void setAnno(int anno) {
        this.anno = anno;
    }

    public double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(double prezzo) {
        this.prezzo = prezzo;
    }

    public int getChilometri() {
        return chilometri;
    }

    public void setChilometri(int chilometri) {
        this.chilometri = chilometri;
    }

    public String getImmagine() {
        return immagine;
    }

    public void setImmagine(String immagine) {
        this.immagine = immagine;
    }

    public CondizioneAuto getCondizione() {
        return condizione;
    }

    public void setCondizione(CondizioneAuto condizione) {
        this.condizione = condizione;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
}