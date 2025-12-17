package com.pranav_khode.payment_service.dto.requets;

import java.util.UUID;

import com.pranav_khode.payment_service.enums.TransactionFor;

import jakarta.validation.constraints.NotNull;

public class MilestonePaymentDto {
	@NotNull
	private UUID clientId;
	
	@NotNull
	private UUID freelancerId;
	
	@NotNull
	private UUID jobId;
	
	@NotNull
	private UUID milestoneId;
	
	@NotNull
	private double amount;
	
	@NotNull
	private String currency;
	
	@NotNull
	private TransactionFor paymentType;

	public MilestonePaymentDto() {
		super();
	}

	public UUID getClientId() {
		return clientId;
	}

	public void setClientId(UUID clientId) {
		this.clientId = clientId;
	}

	public UUID getFreelancerId() {
		return freelancerId;
	}

	public void setFreelancerId(UUID freelancerId) {
		this.freelancerId = freelancerId;
	}

	public UUID getJobId() {
		return jobId;
	}

	public void setJobId(UUID jobId) {
		this.jobId = jobId;
	}

	public UUID getMilestoneId() {
		return milestoneId;
	}

	public void setMilestoneId(UUID milestoneId) {
		this.milestoneId = milestoneId;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public TransactionFor getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(TransactionFor paymentType) {
		this.paymentType = paymentType;
	}
	
}

//const milestonePaymentRequest = {
//	      clientId: authContext.userID,
//	      freelancerId: p.freelancerId,
//	      jobId: p.jobId,
//	      milestoneId: m.id,
//	      amount: m.amount,
//	      currency: m.currency || p.budgetCurrency,
//	      paymentMethod: "WALLET", 
//	      paymentType: "MILESTONE",
//	      description: `Payment for milestone: ${m.title}`,
//	      transactionMetadata: {
//	        projectTitle: p.title,
//	        milestoneTitle: m.title,
//	        paymentDate: new Date().toISOString(),
//	        clientEmail: authContext.email,
//	      },
//	    }