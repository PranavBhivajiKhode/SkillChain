package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.util.List;

import com.pranav_khode.job_posting_service.DTO.enums.JobStatus;
import com.pranav_khode.job_posting_service.DTO.enums.JobType;

public class JobResponseDTO {
    private String jobId;
    private String clientId;
    private String title;
    private String description;
    private BigDecimal budgetAmount;
    private String budgetCurrency;
    private JobType jobType;
    private List<String> requiredSkills;
    private String deadlineDate;
    private JobStatus status;
    private String createdAt;
    private String updatedAt;
    private String assignedFreelancerId; 
    
    public JobResponseDTO() {
    	
    }

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getClientId() {
		return clientId;
	}

	public void setClientId(String clientId) {
		this.clientId = clientId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public BigDecimal getBudgetAmount() {
		return budgetAmount;
	}

	public void setBudgetAmount(BigDecimal budgetAmount) {
		this.budgetAmount = budgetAmount;
	}

	public String getBudgetCurrency() {
		return budgetCurrency;
	}

	public void setBudgetCurrency(String budgetCurrency) {
		this.budgetCurrency = budgetCurrency;
	}

	public JobType getJobType() {
		return jobType;
	}

	public void setJobType(JobType jobType) {
		this.jobType = jobType;
	}

	public List<String> getRequiredSkills() {
		return requiredSkills;
	}

	public void setRequiredSkills(List<String> requiredSkills) {
		this.requiredSkills = requiredSkills;
	}

	public String getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(String deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	public JobStatus getStatus() {
		return status;
	}

	public void setStatus(JobStatus status) {
		this.status = status;
	}

	public String getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}

	public String getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}

	public String getAssignedFreelancerId() {
		return assignedFreelancerId;
	}

	public void setAssignedFreelancerId(String assignedFreelancerId) {
		this.assignedFreelancerId = assignedFreelancerId;
	}
    
    
}

