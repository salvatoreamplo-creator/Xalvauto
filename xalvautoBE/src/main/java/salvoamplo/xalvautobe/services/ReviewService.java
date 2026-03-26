package salvoamplo.xalvautobe.services;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import salvoamplo.xalvautobe.entities.Review;
import salvoamplo.xalvautobe.payloads.ReviewDTO;
import salvoamplo.xalvautobe.repositories.ReviewRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review saveReview(ReviewDTO body) {
        Review newReview = new Review();
        newReview.setNome(body.getNome());
        newReview.setCognome(body.getCognome());
        newReview.setTesto(body.getTesto());
        newReview.setVoto(body.getVoto());
        newReview.setFoto(body.getFoto());
        newReview.setDataCreazione(LocalDateTime.now());

        return reviewRepository.save(newReview);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCreazione"));
    }

    public List<Review> getLatestFiveReviews() {
        return reviewRepository.findAll(Sort.by(Sort.Direction.DESC, "dataCreazione"))
                .stream()
                .limit(5)
                .toList();
    }
}