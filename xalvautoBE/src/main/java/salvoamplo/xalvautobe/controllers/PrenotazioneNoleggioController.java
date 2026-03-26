package salvoamplo.xalvautobe.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import salvoamplo.xalvautobe.entities.PrenotazioneNoleggio;
import salvoamplo.xalvautobe.payloads.PrenotazioneNoleggioDTO;
import salvoamplo.xalvautobe.services.PrenotazioneNoleggioService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/prenotazioni-noleggio")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://xalvauto.netlify.app"
})
public class PrenotazioneNoleggioController {

    private final PrenotazioneNoleggioService prenotazioneService;

    public PrenotazioneNoleggioController(PrenotazioneNoleggioService prenotazioneService) {
        this.prenotazioneService = prenotazioneService;
    }

    // CREA PRENOTAZIONE CLIENTE
    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public PrenotazioneNoleggio creaPrenotazione(@RequestBody @Valid PrenotazioneNoleggioDTO body) {
        return prenotazioneService.creaPrenotazione(body);
    }

    // TUTTE LE PRENOTAZIONI - ADMIN
    @GetMapping("")
    public List<PrenotazioneNoleggio> getTuttePrenotazioni() {
        return prenotazioneService.getTuttePrenotazioni();
    }

    // SOLO NON LETTE - ADMIN
    @GetMapping("/non-lette")
    public List<PrenotazioneNoleggio> getPrenotazioniNonLette() {
        return prenotazioneService.getPrenotazioniNonLette();
    }

    // COUNT NON LETTE - ADMIN
    @GetMapping("/non-lette/count")
    public Map<String, Long> countPrenotazioniNonLette() {
        Map<String, Long> response = new HashMap<>();
        response.put("count", prenotazioneService.countPrenotazioniNonLette());
        return response;
    }

    // SEGNA UNA COME LETTA - ADMIN
    @PatchMapping("/{id}/letta")
    public PrenotazioneNoleggio segnaComeLetta(@PathVariable Long id) {
        return prenotazioneService.segnaComeLetta(id);
    }

    // SEGNA TUTTE COME LETTE - ADMIN
    @PatchMapping("/segna-tutte-lette")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void segnaTutteComeLette() {
        prenotazioneService.segnaTutteComeLette();
    }

    // ANNULLA PRENOTAZIONE - ADMIN
    @PatchMapping("/{id}/annulla")
    public PrenotazioneNoleggio annullaPrenotazione(@PathVariable Long id) {
        return prenotazioneService.annullaPrenotazione(id);
    }

    // CONCLUDI PRENOTAZIONE - ADMIN
    @PatchMapping("/{id}/concludi")
    public PrenotazioneNoleggio concludiPrenotazione(@PathVariable Long id) {
        return prenotazioneService.concludiPrenotazione(id);
    }
}