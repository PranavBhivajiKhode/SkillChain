package com.pranav_khode.job_posting_service.DTO.request;

import java.util.List;

public class CustomArgumentsJobFilterRequest {
    private String keyword;
    private String status;
    private String budgetRange;
    private List<String> skillSet;

    public CustomArgumentsJobFilterRequest(String keyword, String status, String budgetRange, List<String> skillSet) {
        this.keyword = keyword;
        this.status = status;
        this.budgetRange = budgetRange;
        this.skillSet = skillSet;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getBudgetRange() {
        return budgetRange;
    }

    public void setBudgetRange(String budgetRange) {
        this.budgetRange = budgetRange;
    }

    public double getMinBudget() {
        return parseBudgetRange()[0];
    }

    public double getMaxBudget() {
        return parseBudgetRange()[1];
    }
    
    public List<String> getSkillSet() {
		return skillSet;
	}

	public void setSkillSet(List<String> skillSet) {
		this.skillSet = skillSet;
	}

	public double[] parseBudgetRange() {
        if (budgetRange == null || budgetRange.isEmpty()) {
            return new double[]{0, 0};
        }

        String range = budgetRange.toLowerCase().trim();

        // Handle "Above $5000"
        if (range.startsWith("above")) {
            String number = range.replaceAll("[^0-9]", "");
            double min = number.isEmpty() ? 0 : Double.parseDouble(number);
            return new double[]{min, Double.MAX_VALUE}; // treat as "no upper limit"
        }

        // Handle "$3000-$5000"
        if (range.contains("-")) {
            String cleaned = range.replaceAll("[^0-9\\-]", "");
            String[] parts = cleaned.split("-");
            double min = parts.length > 0 && !parts[0].isEmpty() ? Double.parseDouble(parts[0]) : 0;
            double max = parts.length > 1 && !parts[1].isEmpty() ? Double.parseDouble(parts[1]) : 0;
            return new double[]{min, max};
        }

        // Default case
        return new double[]{0, 0};
    }

    @Override
    public String toString() {
        return "JobContext{" +
                "keyword='" + keyword + '\'' +
                ", status='" + status + '\'' +
                ", budgetRange='" + budgetRange + '\'' +
                ", minBudget=" + getMinBudget() +
                ", maxBudget=" + getMaxBudget() +
                '}';
    }
}