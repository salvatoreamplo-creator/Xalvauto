package salvoamplo.xalvautobe.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import salvoamplo.xalvautobe.payloads.ContattoDTO;
import salvoamplo.xalvautobe.services.MailgunService;

@RestController
@RequestMapping("/contatti")
@CrossOrigin(origins = "http://localhost:5173")
public class ContattiController {

    private final MailgunService mailgunService;

    public ContattiController(MailgunService mailgunService) {
        this.mailgunService = mailgunService;
    }

    @PostMapping("/invia")
    public ResponseEntity<String> inviaMessaggio(@RequestBody ContattoDTO dto) {
        mailgunService.inviaMessaggio(dto);
        return new ResponseEntity<>("Messaggio inviato con successo", HttpStatus.OK);
    }
}