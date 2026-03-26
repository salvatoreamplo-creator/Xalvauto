package salvoamplo.xalvautobe.services;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import salvoamplo.xalvautobe.entities.Review;
import salvoamplo.xalvautobe.repositories.ReviewRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CloudinaryService cloudinaryService;

    public ReviewService(ReviewRepository reviewRepository, CloudinaryService cloudinaryService) {
        this.reviewRepository = reviewRepository;
        this.cloudinaryService = cloudinaryService;
    }

    public Review saveReview(String nome, String cognome, String testo, int voto, MultipartFile foto) {
        if (nome == null || nome.isBlank()) {
            throw new IllegalArgumentException("Il nome è obbligatorio");
        }

        if (cognome == null || cognome.isBlank()) {
            throw new IllegalArgumentException("Il cognome è obbligatorio");
        }

        if (testo == null || testo.isBlank() || testo.trim().length() < 10) {
            throw new IllegalArgumentException("Il testo deve avere almeno 10 caratteri");
        }

        if (voto < 1 || voto > 5) {
            throw new IllegalArgumentException("Il voto deve essere tra 1 e 5");
        }

        String fotoUrl = null;

        if (foto != null && !foto.isEmpty()) {
            try {
                fotoUrl = cloudinaryService.uploadImage(foto);
            } catch (Exception e) {
                throw new RuntimeException("Errore durante il caricamento della foto recensione", e);
            }
        }

        Review newReview = new Review();
        newReview.setNome(nome.trim());
        newReview.setCognome(cognome.trim());
        newReview.setTesto(testo.trim());
        newReview.setVoto(voto);
        newReview.setFoto(fotoUrl);
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