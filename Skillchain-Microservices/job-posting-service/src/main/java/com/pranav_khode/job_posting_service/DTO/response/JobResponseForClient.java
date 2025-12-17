package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import com.pranav_khode.job_posting_service.enums.JobStatus;
import com.pranav_khode.job_posting_service.enums.JobType;

public class JobResponseForClient {

    private UUID jobId;
    private String title;
    private String description;
    private BigDecimal budgetAmount;
    private String budgetCurrency;
    private JobType jobType;
    private List<String> requiredSkills;
    private LocalDate deadlineDate;
    private JobStatus status;
    private UUID assignedFreelancerId;
    private int totalViews;
    private int totalProposals;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    private List<MilestoneResponseForJob> milestones;
    
	public JobResponseForClient() {
		super();
	}

	public void setJobId(UUID jobId) {
		this.jobId = jobId;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setBudgetAmount(BigDecimal budgetAmount) {
		this.budgetAmount = budgetAmount;
	}

	public void setBudgetCurrency(String budgetCurrency) {
		this.budgetCurrency = budgetCurrency;
	}

	public void setJobType(JobType jobType) {
		this.jobType = jobType;
	}

	public void setRequiredSkills(List<String> requiredSkills) {
		this.requiredSkills = requiredSkills;
	}

	public void setDeadlineDate(LocalDate deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	public void setStatus(JobStatus status) {
		this.status = status;
	}

	public void setAssignedFreelancerId(UUID assignedFreelancerId) {
		this.assignedFreelancerId = assignedFreelancerId;
	}

	public void setTotalViews(int totalViews) {
		this.totalViews = totalViews;
	}

	public void setTotalProposals(int totalProposals) {
		this.totalProposals = totalProposals;
	}

	public void setCreatedAt(ZonedDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public void setUpdatedAt(ZonedDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public void setMilestones(List<MilestoneResponseForJob> milestones) {
		this.milestones = milestones;
	}

	public UUID getJobId() {
		return jobId;
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public BigDecimal getBudgetAmount() {
		return budgetAmount;
	}

	public String getBudgetCurrency() {
		return budgetCurrency;
	}

	public JobType getJobType() {
		return jobType;
	}

	public List<String> getRequiredSkills() {
		return requiredSkills;
	}

	public LocalDate getDeadlineDate() {
		return deadlineDate;
	}

	public JobStatus getStatus() {
		return status;
	}

	public UUID getAssignedFreelancerId() {
		return assignedFreelancerId;
	}

	public int getTotalViews() {
		return totalViews;
	}

	public int getTotalProposals() {
		return totalProposals;
	}

	public ZonedDateTime getCreatedAt() {
		return createdAt;
	}

	public ZonedDateTime getUpdatedAt() {
		return updatedAt;
	}

	public List<MilestoneResponseForJob> getMilestones() {
		return milestones;
	}
	
	
}
