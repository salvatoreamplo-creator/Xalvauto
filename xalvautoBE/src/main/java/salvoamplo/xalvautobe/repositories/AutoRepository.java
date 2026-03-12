package salvoamplo.xalvautobe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import salvoamplo.xalvautobe.entities.Auto;
import salvoamplo.xalvautobe.entities.CondizioneAuto;

import java.util.List;

@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {

    List<Auto> findByMarcaContainingIgnoreCase(String marca);

    List<Auto> findByCondizione(CondizioneAuto condizione);

    List<Auto> findByPrezzoLessThanEqual(double prezzo);

    List<Auto> findByMarcaContainingIgnoreCaseAndCondizione(String marca, CondizioneAuto condizione);

    List<Auto> findByMarcaContainingIgnoreCaseAndPrezzoLessThanEqual(String marca, double prezzo);

    List<Auto> findByCondizioneAndPrezzoLessThanEqual(CondizioneAuto condizione, double prezzo);

    List<Auto> findByMarcaContainingIgnoreCaseAndCondizioneAndPrezzoLessThanEqual(
            String marca,
            CondizioneAuto condizione,
            double prezzo
    );
}