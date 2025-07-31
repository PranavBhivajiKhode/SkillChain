package com.pranav_khode.rating_review_service.database;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, UUID>{
	public List<Review> findAllByReviewedUserId(UUID reviewedUserId);
}
