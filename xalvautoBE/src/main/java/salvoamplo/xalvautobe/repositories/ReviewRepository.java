package salvoamplo.xalvautobe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import salvoamplo.xalvautobe.entities.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
}