package salvoamplo.xalvautobe.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import salvoamplo.xalvautobe.payloads.ContattoDTO;
import salvoamplo.xalvautobe.services.ResendService;

@RestController
@RequestMapping("/contatti")
public class ContattiController {

    private final ResendService resendService;

    public ContattiController(ResendService resendService) {
        this.resendService = resendService;
    }

    @PostMapping("/invia")
    public ResponseEntity<String> inviaMessaggio(@RequestBody ContattoDTO dto) {
        try {
            resendService.inviaMessaggio(dto);
            return new ResponseEntity<>("Messaggio inviato con successo", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Errore invio: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}