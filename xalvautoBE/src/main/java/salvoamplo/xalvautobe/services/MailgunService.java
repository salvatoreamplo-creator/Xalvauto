package salvoamplo.xalvautobe.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import salvoamplo.xalvautobe.payloads.ContattoDTO;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class MailgunService {

    @Value("${mailgun.api.key}")
    private String apiKey;

    @Value("${mailgun.domain}")
    private String domain;

    @Value("${mailgun.from}")
    private String fromEmail;

    @Value("${mailgun.to}")
    private String toEmail;

    public void inviaMessaggio(ContattoDTO dto) {
        String url = "https://api.mailgun.net/v3/" + domain + "/messages";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        String auth = "api:" + apiKey;
        String encodedAuth = Base64.getEncoder()
                .encodeToString(auth.getBytes(StandardCharsets.UTF_8));
        headers.set("Authorization", "Basic " + encodedAuth);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("from", fromEmail);
        body.add("to", toEmail);
        body.add("subject", "Nuovo messaggio dal sito XalvAuto");
        body.add("text",
                "Nome: " + dto.getNome() + "\n" +
                        "Email: " + dto.getEmail() + "\n\n" +
                        "Messaggio:\n" + dto.getMessaggio()
        );

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

        if (!response.getStatusCode().is2xxSuccessful()) {
            throw new RuntimeException("Errore invio email con Mailgun");
        }
    }
}