package com.pranav_khode.bidding_service.DTO.request;

import java.math.BigDecimal;

import org.hibernate.validator.constraints.Range;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;


public class BidRequestDTO {

    @NotBlank
    private String jobId; 

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal proposedAmount;

    @NotBlank
    @Size(max = 10)
    private String proposedCurrency;

    @Range(min = 1)
    private Integer proposedTimelineDays;

    @NotBlank
    private String proposalText;
    
    
    public BidRequestDTO() {
    	
    }
    

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public BigDecimal getProposedAmount() {
		return proposedAmount;
	}

	public void setProposedAmount(BigDecimal proposedAmount) {
		this.proposedAmount = proposedAmount;
	}

	public String getProposedCurrency() {
		return proposedCurrency;
	}

	public void setProposedCurrency(String proposedCurrency) {
		this.proposedCurrency = proposedCurrency;
	}

	public Integer getProposedTimelineDays() {
		return proposedTimelineDays;
	}

	public void setProposedTimelineDays(Integer proposedTimelineDays) {
		this.proposedTimelineDays = proposedTimelineDays;
	}

	public String getProposalText() {
		return proposalText;
	}

	public void setProposalText(String proposalText) {
		this.proposalText = proposalText;
	}
    
    
	
}
