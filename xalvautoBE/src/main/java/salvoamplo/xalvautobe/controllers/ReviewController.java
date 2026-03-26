package salvoamplo.xalvautobe.controllers;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import salvoamplo.xalvautobe.entities.Review;
import salvoamplo.xalvautobe.payloads.ReviewDTO;
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

    @PostMapping("")
    @ResponseStatus(HttpStatus.CREATED)
    public Review saveReview(@RequestBody @Valid ReviewDTO body) {
        return reviewService.saveReview(body);
    }
}