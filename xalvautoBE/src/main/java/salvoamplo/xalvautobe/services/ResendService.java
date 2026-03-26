package salvoamplo.xalvautobe.services;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import salvoamplo.xalvautobe.entities.PrenotazioneNoleggio;
import salvoamplo.xalvautobe.payloads.ContattoDTO;

@Service
public class ResendService {

    @Value("${resend.api.key}")
    private String apiKey;

    @Value("${mail.from}")
    private String fromEmail;

    @Value("${mail.to}")
    private String toEmail;


    public void inviaMessaggio(ContattoDTO dto) {
        try {
            Resend resend = new Resend(apiKey);

            String testo = "Nome: " + dto.getNome() + "\n"
                    + "Email: " + dto.getEmail() + "\n\n"
                    + "Messaggio:\n" + dto.getMessaggio();

            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(fromEmail)
                    .to(toEmail)
                    .subject("Nuovo messaggio dal sito XalvAuto")
                    .text(testo)
                    .replyTo(dto.getEmail())
                    .build();

            resend.emails().send(params);

        } catch (Exception e) {
            throw new RuntimeException("Errore invio email contatto: " + e.getMessage(), e);
        }
    }

    public void inviaConfermaPrenotazione(PrenotazioneNoleggio prenotazione) {
        try {
            Resend resend = new Resend(apiKey);

            String testo = """
                    Ciao %s %s,
                    
                    la tua prenotazione è stata registrata con successo.
                    
                    Dettagli:
                    Auto: %s %s
                    Dal: %s
                    Al: %s
                    Prezzo: € %.2f
                    
                    Grazie per aver scelto XalvAuto!
                    """.formatted(
                    prenotazione.getNomeCliente(),
                    prenotazione.getCognomeCliente(),
                    prenotazione.getAuto().getMarca(),
                    prenotazione.getAuto().getModello(),
                    prenotazione.getDataInizio(),
                    prenotazione.getDataFine(),
                    prenotazione.getPrezzoTotale()
            );

            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from(fromEmail)
                    .to(prenotazione.getEmailCliente()) // 👈 CLIENTE
                    .subject("Conferma prenotazione XalvAuto")
                    .text(testo)
                    .build();

            resend.emails().send(params);

        } catch (Exception e) {

            System.err.println("Errore invio email prenotazione: " + e.getMessage());
        }
    }
}