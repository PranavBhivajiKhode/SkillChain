package com.pranav_khode.bidding_service.DTO.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public class JobBidResponseDto {

    private UUID id;
    private String jobId;
    private String freelancerId;

    private BigDecimal bidAmount;
    private String deliveryTime;
    private String coverLetter;
    private String status;
    private LocalDate submittedAt;

    private String freelancerName;
    private List<String> skills;
    private Double freelancerRating;
    private Integer freelancerCompletedJobs;
    
    public JobBidResponseDto() {}
    
	public JobBidResponseDto(UUID id, String jobId, String freelancerId, BigDecimal bidAmount, String deliveryTime,
			String coverLetter, String status, LocalDate submittedAt, String freelancerName, List<String> skills,
			Double freelancerRating, Integer freelancerCompletedJobs) {
		super();
		this.id = id;
		this.jobId = jobId;
		this.freelancerId = freelancerId;
		this.bidAmount = bidAmount;
		this.deliveryTime = deliveryTime;
		this.coverLetter = coverLetter;
		this.status = status;
		this.submittedAt = submittedAt;
		this.freelancerName = freelancerName;
		this.skills = skills;
		this.freelancerRating = freelancerRating;
		this.freelancerCompletedJobs = freelancerCompletedJobs;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getFreelancerId() {
		return freelancerId;
	}

	public void setFreelancerId(String freelancerId) {
		this.freelancerId = freelancerId;
	}

	public BigDecimal getBidAmount() {
		return bidAmount;
	}

	public void setBidAmount(BigDecimal bidAmount) {
		this.bidAmount = bidAmount;
	}

	public String getDeliveryTime() {
		return deliveryTime;
	}

	public void setDeliveryTime(String deliveryTime) {
		this.deliveryTime = deliveryTime;
	}

	public String getCoverLetter() {
		return coverLetter;
	}

	public void setCoverLetter(String coverLetter) {
		this.coverLetter = coverLetter;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDate getSubmittedAt() {
		return submittedAt;
	}

	public void setSubmittedAt(LocalDate submittedAt) {
		this.submittedAt = submittedAt;
	}

	public String getFreelancerName() {
		return freelancerName;
	}

	public void setFreelancerName(String freelancerName) {
		this.freelancerName = freelancerName;
	}

	public List<String> getSkills() {
		return skills;
	}

	public void setSkills(List<String> skills) {
		this.skills = skills;
	}

	public Double getFreelancerRating() {
		return freelancerRating;
	}

	public void setFreelancerRating(Double freelancerRating) {
		this.freelancerRating = freelancerRating;
	}

	public Integer getFreelancerCompletedJobs() {
		return freelancerCompletedJobs;
	}

	public void setFreelancerCompletedJobs(Integer freelancerCompletedJobs) {
		this.freelancerCompletedJobs = freelancerCompletedJobs;
	}
    
	
    
}

