package com.pranav_khode.task_management_service.DTO.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class MilestonePostRequest {

	@NotBlank
	@Size(max = 255)
    private String title;

	@NotBlank
    private String description;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal budgetAmount;
    
    @NotBlank
    @Size(max = 10)
    private String budgetCurrency;

    @Pattern(regexp = "\\d{4}-\\d{2}-\\d{2}")
    private String deadlineDate; // YYYY-MM-DD

    @NotNull
    private Integer order;

	public MilestonePostRequest() {
		super();
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

	public String getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(String deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}
    
    
}


