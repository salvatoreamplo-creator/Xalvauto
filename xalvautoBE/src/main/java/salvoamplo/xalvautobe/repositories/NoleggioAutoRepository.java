package salvoamplo.xalvautobe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import salvoamplo.xalvautobe.entities.NoleggioAuto;

import java.util.List;

@Repository
public interface NoleggioAutoRepository extends JpaRepository<NoleggioAuto, Long> {
    List<NoleggioAuto> findByDisponibile(boolean disponibile);

    List<NoleggioAuto> findByMarcaContainingIgnoreCase(String marca);
}