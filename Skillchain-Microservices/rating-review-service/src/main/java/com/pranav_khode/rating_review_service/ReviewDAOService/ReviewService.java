package com.pranav_khode.rating_review_service.ReviewDAOService;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranav_khode.rating_review_service.DTO.request.ReviewRequestDTO;
import com.pranav_khode.rating_review_service.database.Review;
import com.pranav_khode.rating_review_service.database.ReviewRepository;

@Service
public class ReviewService {
	
	private ReviewRepository repository;
	
	public ReviewService(ReviewRepository repository) {
		this.repository = repository;
	}

	public Review saveReviewToDatabase(ReviewRequestDTO dto) {
		Review review = new Review();
		review.setJobId(UUID.fromString(dto.getJobId()));
		review.setReviewedUserId(UUID.fromString(dto.getReviewedUserId()));
		review.setReviewerId(UUID.fromString(dto.getReviewerId()));
		review.setRating(dto.getRating());
		review.setComment(dto.getComment());
		
		return repository.save(review);
	}

	public List<Review> retriveAllReviewsForUserFromDatabase(String userId) {
		return repository.findAllByReviewedUserId(UUID.fromString(userId));
	}
	
	
}
