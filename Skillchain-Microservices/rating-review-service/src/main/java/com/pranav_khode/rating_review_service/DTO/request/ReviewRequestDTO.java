package com.pranav_khode.rating_review_service.DTO.request;

import org.hibernate.validator.constraints.Range;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ReviewRequestDTO {
	@NotBlank
	private String jobId;
	
	@NotBlank
	private String reviewerId;
	
	@NotBlank
	private String reviewedUserId;
	
	@Range(min = 1, max = 5)
	private int rating;
	
	@NotBlank
	@Size(min = 3, max = 1000)
	private String comment;
	
	public ReviewRequestDTO() {
		
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getReviewerId() {
		return reviewerId;
	}

	public void setReviewerId(String reviewerId) {
		this.reviewerId = reviewerId;
	}

	public String getReviewedUserId() {
		return reviewedUserId;
	}

	public void setReviewedUserId(String reviewedUserId) {
		this.reviewedUserId = reviewedUserId;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	
	
	
}
