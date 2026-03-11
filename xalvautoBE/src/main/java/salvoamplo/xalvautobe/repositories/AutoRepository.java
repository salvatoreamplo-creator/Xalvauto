package salvoamplo.xalvautobe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import salvoamplo.xalvautobe.entities.Auto;

@Repository
public interface AutoRepository extends JpaRepository<Auto, Long> {
}