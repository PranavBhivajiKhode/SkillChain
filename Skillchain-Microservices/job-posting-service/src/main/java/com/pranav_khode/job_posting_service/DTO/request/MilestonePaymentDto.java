package com.pranav_khode.job_posting_service.DTO.request;

import java.math.BigDecimal;
import java.util.UUID;

public class MilestonePaymentDto {
	private UUID milestoneId;
	private UUID jobId;
	private BigDecimal amount;
	private String currency;
	
	public MilestonePaymentDto() {
		super();
	}

	public UUID getMilestoneId() {
		return milestoneId;
	}

	public void setMilestoneId(UUID milestoneId) {
		this.milestoneId = milestoneId;
	}

	public UUID getJobId() {
		return jobId;
	}

	public void setJobId(UUID jobId) {
		this.jobId = jobId;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}
	
	
}
