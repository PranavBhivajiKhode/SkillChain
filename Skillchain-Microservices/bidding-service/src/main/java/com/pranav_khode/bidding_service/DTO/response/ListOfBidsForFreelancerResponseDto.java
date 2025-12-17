package com.pranav_khode.bidding_service.DTO.response;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

public class ListOfBidsForFreelancerResponseDto {

    private UUID bidId;

    private UUID jobId; 
    
    private UUID freelancerId; 

    private BigDecimal proposedAmount;

    private String proposedCurrency;

    private Integer proposedTimelineDays;

    private String proposalText;

    private String status;

    private ZonedDateTime createdAt;

    private ZonedDateTime updatedAt;
    
    private String jobTitle;
    
    private String clientName;

	public ListOfBidsForFreelancerResponseDto(UUID bidId, UUID jobId,UUID freelancerId, BigDecimal proposedAmount, String proposedCurrency,
			Integer proposedTimelineDays, String proposalText, String status, ZonedDateTime createdAt,ZonedDateTime updatedAt, 
			String jobTitle, String clientName) {
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
		this.jobTitle = jobTitle;
		this.clientName = clientName;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
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

	public String getJobTitle() {
		return jobTitle;
	}

	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}

	public String getClientName() {
		return clientName;
	}

	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
    
	
    
}
