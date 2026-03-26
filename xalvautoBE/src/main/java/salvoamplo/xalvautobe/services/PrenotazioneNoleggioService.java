package salvoamplo.xalvautobe.services;

import org.springframework.stereotype.Service;
import salvoamplo.xalvautobe.entities.NoleggioAuto;
import salvoamplo.xalvautobe.entities.PrenotazioneNoleggio;
import salvoamplo.xalvautobe.entities.StatoPrenotazione;
import salvoamplo.xalvautobe.payloads.PrenotazioneNoleggioDTO;
import salvoamplo.xalvautobe.repositories.NoleggioAutoRepository;
import salvoamplo.xalvautobe.repositories.PrenotazioneNoleggioRepository;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class PrenotazioneNoleggioService {

    private final PrenotazioneNoleggioRepository prenotazioneRepository;
    private final NoleggioAutoRepository noleggioAutoRepository;
    private final ResendService resendService;

    public PrenotazioneNoleggioService(PrenotazioneNoleggioRepository prenotazioneRepository,
                                       NoleggioAutoRepository noleggioAutoRepository,
                                       ResendService resendService) {
        this.prenotazioneRepository = prenotazioneRepository;
        this.noleggioAutoRepository = noleggioAutoRepository;
        this.resendService = resendService;
    }

    public PrenotazioneNoleggio creaPrenotazione(PrenotazioneNoleggioDTO body) {

        if (body.getDataInizio() == null || body.getDataFine() == null) {
            throw new RuntimeException("Le date di prenotazione sono obbligatorie");
        }

        if (body.getDataFine().isBefore(body.getDataInizio())) {
            throw new RuntimeException("La data di fine non può essere prima della data di inizio");
        }

        NoleggioAuto auto = noleggioAutoRepository.findById(body.getAutoId())
                .orElseThrow(() -> new RuntimeException("Auto non trovata"));

        // blocco manuale admin
        if (!auto.isDisponibile()) {
            throw new RuntimeException("Questa auto al momento non è disponibile per il noleggio");
        }

        // controllo conflitti con altre prenotazioni attive
        List<PrenotazioneNoleggio> conflitti = prenotazioneRepository.findPrenotazioniConflittuali(
                body.getAutoId(),
                body.getDataInizio(),
                body.getDataFine()
        );

        if (!conflitti.isEmpty()) {
            throw new RuntimeException("Auto già prenotata per le date selezionate");
        }

        long giorni = ChronoUnit.DAYS.between(body.getDataInizio(), body.getDataFine()) + 1;

        if (giorni <= 0) {
            throw new RuntimeException("Intervallo date non valido");
        }

        double prezzoTotale = giorni * auto.getPrezzoGiornaliero();

        PrenotazioneNoleggio prenotazione = new PrenotazioneNoleggio();
        prenotazione.setAuto(auto);
        prenotazione.setNomeCliente(body.getNomeCliente());
        prenotazione.setCognomeCliente(body.getCognomeCliente());
        prenotazione.setEmailCliente(body.getEmailCliente());
        prenotazione.setTelefonoCliente(body.getTelefonoCliente());
        prenotazione.setDataInizio(body.getDataInizio());
        prenotazione.setDataFine(body.getDataFine());
        prenotazione.setPrezzoTotale(prezzoTotale);
        prenotazione.setStato(StatoPrenotazione.ATTIVA);
        prenotazione.setLettaAdmin(false);

        // 1. salvo SEMPRE la prenotazione
        PrenotazioneNoleggio salvata = prenotazioneRepository.save(prenotazione);

        // 2. provo a inviare la mail, ma se fallisce la prenotazione resta
        try {
            if (salvata.getEmailCliente() != null && !salvata.getEmailCliente().isBlank()) {
                resendService.inviaConfermaPrenotazione(salvata);
            }
        } catch (Exception e) {
            System.err.println("Errore invio email conferma prenotazione: " + e.getMessage());
        }

        return salvata;
    }

    public List<PrenotazioneNoleggio> getTuttePrenotazioni() {
        return prenotazioneRepository.findAllByOrderByDataCreazioneDesc();
    }

    public List<PrenotazioneNoleggio> getPrenotazioniNonLette() {
        return prenotazioneRepository
                .findByLettaAdminFalseAndStatoOrderByDataCreazioneDesc(StatoPrenotazione.ATTIVA);
    }

    public long countPrenotazioniNonLette() {
        return prenotazioneRepository.countByLettaAdminFalseAndStato(StatoPrenotazione.ATTIVA);
    }

    public PrenotazioneNoleggio segnaComeLetta(Long id) {
        PrenotazioneNoleggio prenotazione = prenotazioneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prenotazione non trovata"));

        prenotazione.setLettaAdmin(true);
        return prenotazioneRepository.save(prenotazione);
    }

    public void segnaTutteComeLette() {
        List<PrenotazioneNoleggio> prenotazioni =
                prenotazioneRepository.findByLettaAdminFalseAndStatoOrderByDataCreazioneDesc(
                        StatoPrenotazione.ATTIVA
                );

        for (PrenotazioneNoleggio p : prenotazioni) {
            p.setLettaAdmin(true);
        }

        prenotazioneRepository.saveAll(prenotazioni);
    }

    public PrenotazioneNoleggio annullaPrenotazione(Long id) {
        PrenotazioneNoleggio prenotazione = prenotazioneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prenotazione non trovata"));

        if (prenotazione.getStato() == StatoPrenotazione.ANNULLATA) {
            throw new RuntimeException("La prenotazione è già annullata");
        }

        prenotazione.setStato(StatoPrenotazione.ANNULLATA);
        prenotazione.setLettaAdmin(true);

        PrenotazioneNoleggio aggiornata = prenotazioneRepository.save(prenotazione);

        return aggiornata;
    }

    public PrenotazioneNoleggio concludiPrenotazione(Long id) {
        PrenotazioneNoleggio prenotazione = prenotazioneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prenotazione non trovata"));

        if (prenotazione.getStato() == StatoPrenotazione.ANNULLATA) {
            throw new RuntimeException("La prenotazione è annullata e non può essere conclusa");
        }

        prenotazione.setStato(StatoPrenotazione.CONCLUSA);
        prenotazione.setLettaAdmin(true);

        PrenotazioneNoleggio aggiornata = prenotazioneRepository.save(prenotazione);

        return aggiornata;
    }
}