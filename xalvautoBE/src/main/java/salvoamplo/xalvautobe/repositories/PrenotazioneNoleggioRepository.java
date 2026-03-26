package salvoamplo.xalvautobe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import salvoamplo.xalvautobe.entities.PrenotazioneNoleggio;
import salvoamplo.xalvautobe.entities.StatoPrenotazione;

import java.time.LocalDate;
import java.util.List;

public interface PrenotazioneNoleggioRepository extends JpaRepository<PrenotazioneNoleggio, Long> {

    @Query("""
                SELECT p FROM PrenotazioneNoleggio p
                WHERE p.auto.id = :autoId
                AND p.stato = 'ATTIVA'
                AND (
                    :dataInizio <= p.dataFine
                    AND :dataFine >= p.dataInizio
                )
            """)
    List<PrenotazioneNoleggio> findPrenotazioniConflittuali(Long autoId, LocalDate dataInizio, LocalDate dataFine);

    List<PrenotazioneNoleggio> findByLettaAdminFalseAndStatoOrderByDataCreazioneDesc(StatoPrenotazione stato);

    List<PrenotazioneNoleggio> findAllByOrderByDataCreazioneDesc();

    long countByLettaAdminFalseAndStato(StatoPrenotazione stato);
}