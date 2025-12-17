package com.pranav_khode.bidding_service.DTO.response;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

import com.pranav_khode.bidding_service.enums.BidStatus;

public class BidResponseDTO {

    private UUID bidId;

    private UUID jobId; 
    
    private String freelancerName;

    private UUID freelancerId; 

    private BigDecimal proposedAmount;

    private String proposedCurrency;

    private Integer proposedTimelineDays;

    private String proposalText;

    private BidStatus status;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;

	public BidResponseDTO(UUID bidId, UUID jobId,UUID freelancerId, BigDecimal proposedAmount, String proposedCurrency,
			Integer proposedTimelineDays, String proposalText, BidStatus status, ZonedDateTime createdAt,
			ZonedDateTime updatedAt) {
		super();
		this.bidId = bidId;
		this.jobId = jobId;
		this.freelancerId = freelancerId;
		this.proposedAmount = proposedAmount;
		this.proposedCurrency = proposedCurrency;
		this.proposedTimelineDays = proposedTimelineDays;
		this.proposalText = proposalText;
		this.status = status;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
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

	public String getFreelancerName() {
		return freelancerName;
	}

	public void setFreelancerName(String freelancerName) {
		this.freelancerName = freelancerName;
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
