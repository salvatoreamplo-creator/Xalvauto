package salvoamplo.xalvautobe.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import salvoamplo.xalvautobe.entities.Review;
import salvoamplo.xalvautobe.services.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://xalvauto.netlify.app"
})
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("")
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/latest")
    public List<Review> getLatestFiveReviews() {
        return reviewService.getLatestFiveReviews();
    }

    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public Review saveReview(
            @RequestParam("nome") String nome,
            @RequestParam("cognome") String cognome,
            @RequestParam("testo") String testo,
            @RequestParam("voto") int voto,
            @RequestParam(value = "foto", required = false) MultipartFile foto
    ) {
        return reviewService.saveReview(nome, cognome, testo, voto, foto);
    }
}