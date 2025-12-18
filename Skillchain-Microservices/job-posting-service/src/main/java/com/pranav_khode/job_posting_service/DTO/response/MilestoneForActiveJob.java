package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import com.pranav_khode.job_posting_service.enums.MileStoneStatus;
import com.pranav_khode.job_posting_service.file_management.FileEntity;

public class MilestoneForActiveJob {
	private UUID milestoneId;
	private String title;
	private String description;
	private BigDecimal budgetAmount;
	private String budgetCurrency;
	private MileStoneStatus status;
	private List<FileEntity> files;
	private Integer orderIndex;
	private String deadlineDate;
	private boolean paid;
	
	public UUID getMilestoneId() {
		return milestoneId;
	}
	public void setMilestoneId(UUID milestoneId) {
		this.milestoneId = milestoneId;
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
	public MileStoneStatus getStatus() {
		return status;
	}
	public void setStatus(MileStoneStatus status) {
		this.status = status;
	}
	public List<FileEntity> getFiles() {
		return files;
	}
	public void setFiles(List<FileEntity> files) {
		this.files = files;
	}
	public Integer getOrderIndex() {
		return orderIndex;
	}
	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}
	public String getDeadlineDate() {
		return deadlineDate;
	}
	public void setDeadlineDate(String deadlineDate) {
		this.deadlineDate = deadlineDate;
	}
	public boolean isPaid() {
		return paid;
	}
	public void setPaid(boolean paid) {
		this.paid = paid;
	}
	
	
}
