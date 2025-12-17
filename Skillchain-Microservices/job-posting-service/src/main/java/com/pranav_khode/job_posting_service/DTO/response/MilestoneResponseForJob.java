package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.util.UUID;

import com.pranav_khode.job_posting_service.enums.MileStoneStatus;

public class MilestoneResponseForJob {

    private UUID milestoneId;
    private String title;
    private String description;
    private BigDecimal budgetAmount;
    private String budgetCurrency;
    private MileStoneStatus status;
    private String deadlineDate;
    private Integer orderIndex;
    
	public MilestoneResponseForJob() {
		super();
	}

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

	public String getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(String deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	public Integer getOrderIndex() {
		return orderIndex;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}    
}
