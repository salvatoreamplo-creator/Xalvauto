package salvoamplo.xalvautobe.services;

import com.resend.Resend;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
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
            throw new RuntimeException("Errore invio email con Resend: " + e.getMessage(), e);
        }
    }
}