package com.pranav_khode.payment_service.dto.requets;

import java.util.UUID;

import com.pranav_khode.payment_service.enums.TransactionFor;

import jakarta.validation.constraints.NotNull;

public class JobPaymentDto {
	@NotNull
	private UUID clientId;
	
	@NotNull
	private UUID freelancerId;
	
	@NotNull
	private UUID jobId;
	
	@NotNull
	private Double amount;
	
	@NotNull
	private String currency;
	
	@NotNull
	private TransactionFor paymentType;

	public JobPaymentDto() {
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

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
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


//const remainderPaymentRequest = {
//	      clientId: authContext.userID,
//	      freelancerId: p.freelancerId,
//	      jobId: p.jobId,
//	      amount: remainder(p),
//	      currency: p.budgetCurrency,
//	      paymentMethod: "WALLET", 
//	      paymentType: "PROJECT",
//	      description: `Final payment for project: ${p.title}`,
//	      transactionMetadata: {
//	        projectTitle: p.title,
//	        totalBudget: p.budgetAmount,
//	        milestonesPaid: totalPaid(p),
//	        remainderAmount: remainder(p),
//	        paymentDate: new Date().toISOString(),
//	        clientEmail: authContext.email,
//	        completionDate: new Date().toISOString(),
//	      },
//	    }