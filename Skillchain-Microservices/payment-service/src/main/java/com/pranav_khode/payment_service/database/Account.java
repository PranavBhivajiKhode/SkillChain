package com.pranav_khode.payment_service.database;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity(name = "Accounts")
public class Account {
	
	@Id
	@GeneratedValue
	private UUID accountId;
	
	@Column(nullable = false, unique = true)
	private UUID userId;
	
	@Column(nullable = false)
	private BigDecimal availableBalance = BigDecimal.ZERO;
	
	@Column(nullable = false)
	private BigDecimal totalEarned = BigDecimal.ZERO;
	
	@Column(nullable = false)
	private BigDecimal totalPaid = BigDecimal.ZERO;

	public Account() {
		super();
	}

	public UUID getAccountId() {
		return accountId;
	}

	public void setAccountId(UUID accountId) {
		this.accountId = accountId;
	}

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	public BigDecimal getAvailableBalance() {
		return availableBalance;
	}

	public void setAvailableBalance(BigDecimal availableBalance) {
		this.availableBalance = availableBalance;
	}

	public BigDecimal getTotalEarned() {
		return totalEarned;
	}

	public void setTotalEarned(BigDecimal totalEarned) {
		this.totalEarned = totalEarned;
	}

	public BigDecimal getTotalPaid() {
		return totalPaid;
	}

	public void setTotalPaid(BigDecimal totalPaid) {
		this.totalPaid = totalPaid;
	}
	
	
	
	
}
