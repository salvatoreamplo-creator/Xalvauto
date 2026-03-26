package salvoamplo.xalvautobe.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "prenotazioni_noleggio")
public class PrenotazioneNoleggio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeCliente;
    private String cognomeCliente;
    private String emailCliente;
    private String telefonoCliente;

    private LocalDate dataInizio;
    private LocalDate dataFine;

    private Double prezzoTotale;

    @Enumerated(EnumType.STRING)
    private StatoPrenotazione stato = StatoPrenotazione.ATTIVA;

    private boolean lettaAdmin = false;

    private LocalDateTime dataCreazione = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "noleggio_auto_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private NoleggioAuto auto;

    public PrenotazioneNoleggio() {
    }

    public Long getId() {
        return id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getCognomeCliente() {
        return cognomeCliente;
    }

    public void setCognomeCliente(String cognomeCliente) {
        this.cognomeCliente = cognomeCliente;
    }

    public String getEmailCliente() {
        return emailCliente;
    }

    public void setEmailCliente(String emailCliente) {
        this.emailCliente = emailCliente;
    }

    public String getTelefonoCliente() {
        return telefonoCliente;
    }

    public void setTelefonoCliente(String telefonoCliente) {
        this.telefonoCliente = telefonoCliente;
    }

    public LocalDate getDataInizio() {
        return dataInizio;
    }

    public void setDataInizio(LocalDate dataInizio) {
        this.dataInizio = dataInizio;
    }

    public LocalDate getDataFine() {
        return dataFine;
    }

    public void setDataFine(LocalDate dataFine) {
        this.dataFine = dataFine;
    }

    public Double getPrezzoTotale() {
        return prezzoTotale;
    }

    public void setPrezzoTotale(Double prezzoTotale) {
        this.prezzoTotale = prezzoTotale;
    }

    public StatoPrenotazione getStato() {
        return stato;
    }

    public void setStato(StatoPrenotazione stato) {
        this.stato = stato;
    }

    public boolean isLettaAdmin() {
        return lettaAdmin;
    }

    public void setLettaAdmin(boolean lettaAdmin) {
        this.lettaAdmin = lettaAdmin;
    }

    public LocalDateTime getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDateTime dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    public NoleggioAuto getAuto() {
        return auto;
    }

    public void setAuto(NoleggioAuto auto) {
        this.auto = auto;
    }
}