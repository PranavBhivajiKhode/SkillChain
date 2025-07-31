package com.pranav_khode.rating_review_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.rating_review_service.DTO.request.ReviewRequestDTO;
import com.pranav_khode.rating_review_service.ReviewDAOService.ReviewService;
import com.pranav_khode.rating_review_service.database.Review;

@RestController

public class ReviewController {
	
	private ReviewService service;
	
	public ReviewController(ReviewService service) {
		this.service = service;
	}
	
	@PostMapping("/reviews")
	public ResponseEntity<Review> saveReview(@Validated @RequestBody ReviewRequestDTO requestBody) {
		Review review  = service.saveReviewToDatabase(requestBody);
		return ResponseEntity.created(null).body(review);
	}
	
	@GetMapping("/reviews/users/{userId}")
	public ResponseEntity<List<Review>> retriveAllReviewsForUser(@PathVariable String userId) {
		List<Review> reviews = service.retriveAllReviewsForUserFromDatabase(userId);
		return ResponseEntity.ok().body(reviews);
	}
}
