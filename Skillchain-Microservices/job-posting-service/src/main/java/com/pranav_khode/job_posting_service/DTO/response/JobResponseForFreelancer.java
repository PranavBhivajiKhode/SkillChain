package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import com.pranav_khode.job_posting_service.enums.JobStatus;
import com.pranav_khode.job_posting_service.enums.JobType;

public class JobResponseForFreelancer {
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
    
	public JobResponseForFreelancer() {
		super();
	}

	public JobResponseForFreelancer(UUID jobId, String title, String description, BigDecimal budgetAmount,
			String budgetCurrency, JobType jobType, List<String> requiredSkills, LocalDate deadlineDate,
			JobStatus status, UUID assignedFreelancerId, int totalViews, int totalProposals, ZonedDateTime createdAt,
			ZonedDateTime updatedAt, List<MilestoneResponseForJob> milestones) {
		super();
		this.jobId = jobId;
		this.title = title;
		this.description = description;
		this.budgetAmount = budgetAmount;
		this.budgetCurrency = budgetCurrency;
		this.jobType = jobType;
		this.requiredSkills = requiredSkills;
		this.deadlineDate = deadlineDate;
		this.status = status;
		this.assignedFreelancerId = assignedFreelancerId;
		this.totalViews = totalViews;
		this.totalProposals = totalProposals;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.milestones = milestones;
	}

	public UUID getJobId() {
		return jobId;
	}

	public void setJobId(UUID jobId) {
		this.jobId = jobId;
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

	public LocalDate getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(LocalDate deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	public JobStatus getStatus() {
		return status;
	}

	public void setStatus(JobStatus status) {
		this.status = status;
	}

	public UUID getAssignedFreelancerId() {
		return assignedFreelancerId;
	}

	public void setAssignedFreelancerId(UUID assignedFreelancerId) {
		this.assignedFreelancerId = assignedFreelancerId;
	}

	public int getTotalViews() {
		return totalViews;
	}

	public void setTotalViews(int totalViews) {
		this.totalViews = totalViews;
	}

	public int getTotalProposals() {
		return totalProposals;
	}

	public void setTotalProposals(int totalProposals) {
		this.totalProposals = totalProposals;
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

	public List<MilestoneResponseForJob> getMilestones() {
		return milestones;
	}

	public void setMilestones(List<MilestoneResponseForJob> milestones) {
		this.milestones = milestones;
	}
}
