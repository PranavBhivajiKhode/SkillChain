package com.pranav_khode.rating_review_service.database;

import java.time.ZonedDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;

@Entity
public class Review {
	@Id
    @Column(nullable = false, unique = true)
    private UUID reviewId; 

    @Column(nullable = false)
    private UUID jobId; 

    @Column(nullable = false)
    private UUID reviewerId; 

    @Column(nullable = false)
    private UUID reviewedUserId; 

    @Column(nullable = false)
    private Integer rating;

    @Column(length = 1000)
    private String comment;

    @Column(nullable = false)
    private ZonedDateTime createdAt;

    @PrePersist
    public void onCreate() {
        if (createdAt == null) {
            createdAt = ZonedDateTime.now();
        }
    }
    
    public Review() {
    
    }


    public UUID getReviewId() {
        return reviewId;
    }

    public void setReviewId(UUID reviewId) {
        this.reviewId = reviewId;
    }

    public UUID getJobId() {
        return jobId;
    }

    public void setJobId(UUID jobID) {
        this.jobId = jobID;
    }

    public UUID getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(UUID reviewerId) {
        this.reviewerId = reviewerId;
    }

    public UUID getReviewedUserId() {
        return reviewedUserId;
    }

    public void setReviewedUserId(UUID reviewedUserId) {
        this.reviewedUserId = reviewedUserId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(ZonedDateTime createdAt) {
        this.createdAt = createdAt;
    }
}