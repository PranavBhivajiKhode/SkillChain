package com.pranav_khode.payment_service.database;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.pranav_khode.payment_service.enums.PaymentStatus;
import com.pranav_khode.payment_service.enums.TransactionFor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity(name = "transactions")
public class Transaction {
	
	@Id
	@GeneratedValue
	private UUID transactionId;
	
	@Column(nullable = false)
	private UUID clientId;
	
	@Column(nullable = true)
	private UUID freelancerId;
	
	@Column(nullable = false)
	private UUID jobId;
	
	@Column(nullable = false)
	private String projectTitle;
	
	@Column(nullable = false)
	private String freelancerName;
	
	@Column(nullable = false)
	private BigDecimal amount;
	
	@Column(nullable = false)
	private String currency;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TransactionFor  type;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private PaymentStatus status;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private LocalDateTime time;

	public Transaction() {
		super();
	}

	public UUID getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(UUID transactionId) {
		this.transactionId = transactionId;
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

	public String getProjectTitle() {
		return projectTitle;
	}

	public void setProjectTitle(String projectTitle) {
		this.projectTitle = projectTitle;
	}

	public String getFreelancerName() {
		return freelancerName;
	}

	public void setFreelancerName(String freelancerName) {
		this.freelancerName = freelancerName;
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

	public TransactionFor getType() {
		return type;
	}

	public void setType(TransactionFor type) {
		this.type = type;
	}

	public PaymentStatus getStatus() {
		return status;
	}

	public void setStatus(PaymentStatus status) {
		this.status = status;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getTime() {
		return time;
	}

	public void setTime(LocalDateTime time) {
		this.time = time;
	}

	public UUID getJobId() {
		return jobId;
	}

	public void setJobId(UUID jobId) {
		this.jobId = jobId;
	}
	
	
	
}
