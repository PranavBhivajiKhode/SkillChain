package com.pranav_khode.bidding_service.database;


import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.pranav_khode.bidding_service.enums.BidStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "bids")
public class Bid {

    @Id
    @GeneratedValue
    private UUID bidId;

    @Column(nullable = false)
    private UUID jobId; 

    @Column(nullable = false)
    private UUID freelancerId; 

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal proposedAmount;

    @Column(nullable = false, length = 10)
    private String proposedCurrency;

    @Column(nullable = false)
    private Integer proposedTimelineDays;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String proposalText;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 50)
    private BidStatus status;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
        if (this.status == null) {
            this.status = BidStatus.PENDING;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }

	public Bid() {
	}

	public UUID getBidId() {
		return bidId;
	}

	public void setBidId(UUID bidId) {
		this.bidId = bidId;
	}

	public UUID getJobId() {
		return jobId;
	}

	public void setJobId(UUID jobId) {
		this.jobId = jobId;
	}

	public UUID getFreelancerId() {
		return freelancerId;
	}

	public void setFreelancerId(UUID freelancerId) {
		this.freelancerId = freelancerId;
	}

	public BigDecimal getProposedAmount() {
		return proposedAmount;
	}

	public void setProposedAmount(BigDecimal proposedAmount) {
		this.proposedAmount = proposedAmount;
	}

	public String getProposedCurrency() {
		return proposedCurrency;
	}

	public void setProposedCurrency(String proposedCurrency) {
		this.proposedCurrency = proposedCurrency;
	}

	public Integer getProposedTimelineDays() {
		return proposedTimelineDays;
	}

	public void setProposedTimelineDays(Integer proposedTimelineDays) {
		this.proposedTimelineDays = proposedTimelineDays;
	}

	public String getProposalText() {
		return proposalText;
	}

	public void setProposalText(String proposalText) {
		this.proposalText = proposalText;
	}

	public BidStatus getStatus() {
		return status;
	}

	public void setStatus(BidStatus status) {
		this.status = status;
	}

	public ZonedDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(ZonedDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public ZonedDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(ZonedDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
    
    
    
}
