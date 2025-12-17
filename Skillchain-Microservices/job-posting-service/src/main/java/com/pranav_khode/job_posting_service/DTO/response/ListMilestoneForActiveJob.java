package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;


public class ListMilestoneForActiveJob {
    private String id;
    private String title;
    private BigDecimal amount;
    private String currency;
    private String status;
//    private List<MilestoneFile> files = new ArrayList<>();
    private boolean paid;

	
	public ListMilestoneForActiveJob(String id, String title, BigDecimal amount, String currency, String status,
	 boolean paid) {
		super();
		this.id = id;
		this.title = title;
		this.amount = amount;
		this.currency = currency;
		this.status = status;
//		this.files = files;
		this.paid = paid;
	}

	public ListMilestoneForActiveJob() {}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

//	public List<MilestoneFile> getFiles() {
//		return files;
//	}
//
//	public void setFiles(List<MilestoneFile> files) {
//		this.files = files;
//	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	
	
}

//{
//  id: "m1",
//  title: "Auth & Onboarding",
//  amount: 3000,
//  currency: "USD",
//  status: "COMPLETED_VERIFIED",
//  files: [],
//  paid: true,
//}