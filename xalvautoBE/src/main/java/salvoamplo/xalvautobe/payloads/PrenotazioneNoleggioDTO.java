package salvoamplo.xalvautobe.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class PrenotazioneNoleggioDTO {

    @NotNull(message = "L'id dell'auto è obbligatorio")
    private Long autoId;

    @NotBlank(message = "Il nome è obbligatorio")
    private String nomeCliente;

    @NotBlank(message = "Il cognome è obbligatorio")
    private String cognomeCliente;

    @NotBlank(message = "L'email è obbligatoria")
    @Email(message = "Email non valida")
    private String emailCliente;

    @NotBlank(message = "Il telefono è obbligatorio")
    private String telefonoCliente;

    @NotNull(message = "La data di inizio è obbligatoria")
    @FutureOrPresent(message = "La data di inizio non può essere nel passato")
    private LocalDate dataInizio;

    @NotNull(message = "La data di fine è obbligatoria")
    @FutureOrPresent(message = "La data di fine non può essere nel passato")
    private LocalDate dataFine;

    public Long getAutoId() {
        return autoId;
    }

    public void setAutoId(Long autoId) {
        this.autoId = autoId;
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
}