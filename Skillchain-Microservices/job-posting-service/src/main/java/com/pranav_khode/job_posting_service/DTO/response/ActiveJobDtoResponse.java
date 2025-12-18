package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import com.pranav_khode.job_posting_service.enums.JobStatus;
import com.pranav_khode.job_posting_service.file_management.FileEntity;

public class ActiveJobDtoResponse {
	private UUID jobId;
	private String title;
	private String description;
	private BigDecimal budget;
	private String currency;
	private LocalDate deadlineData;
	private JobStatus status;
	private List<MilestoneForActiveJob> milestones;
	private List<FileEntity> files;
	private UUID assignedFreelancerId;
	private ZonedDateTime completionDate;
	private boolean paid;
	
	
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
	public BigDecimal getBudget() {
		return budget;
	}
	public void setBudget(BigDecimal budget) {
		this.budget = budget;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public LocalDate getDeadlineData() {
		return deadlineData;
	}
	public void setDeadlineData(LocalDate deadlineData) {
		this.deadlineData = deadlineData;
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
	public ZonedDateTime getCompletionDate() {
		return completionDate;
	}
	public void setCompletionDate(ZonedDateTime completionDate) {
		this.completionDate = completionDate;
	}
	public boolean isPaid() {
		return paid;
	}
	public void setPaid(boolean paid) {
		this.paid = paid;
	}
	public List<MilestoneForActiveJob> getMilestones() {
		return milestones;
	}
	public void setMilestones(List<MilestoneForActiveJob> milestones) {
		this.milestones = milestones;
	}
	public List<FileEntity> getFiles() {
		return files;
	}
	public void setFiles(List<FileEntity> files) {
		this.files = files;
	}
	
	
	
}
