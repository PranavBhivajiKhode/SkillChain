package com.pranav_khode.task_management_service.database;

import java.math.BigDecimal;
import java.util.UUID;

import com.pranav_khode.task_management_service.enums.Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID milestoneId;

    @Column(nullable = false)
    private UUID jobId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal budgetAmount;

    @Column(nullable = false, length = 10)
    private String budgetCurrency;

    @Enumerated(EnumType.STRING)
    private Status status;

    private String deadlineDate;

    private Integer orderIndex;

    // 🔹 Private constructor (only Builder can create instances)
    private Milestone(Builder builder) {
        this.milestoneId = builder.milestoneId;
        this.jobId = builder.jobId;
        this.title = builder.title;
        this.description = builder.description;
        this.budgetAmount = builder.budgetAmount;
        this.budgetCurrency = builder.budgetCurrency;
        this.status = builder.status;
        this.deadlineDate = builder.deadlineDate;
        this.orderIndex = builder.orderIndex;
    }

    // ✅ Static nested Builder class
    public static class Builder {
        private UUID milestoneId;
        private UUID jobId;
        private String title;
        private String description;
        private BigDecimal budgetAmount;
        private String budgetCurrency;
        private Status status;
        private String deadlineDate;
        private Integer orderIndex;

        public Builder milestoneId(UUID milestoneId) {
            this.milestoneId = milestoneId;
            return this;
        }

        public Builder jobId(UUID jobId) {
            this.jobId = jobId;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder budgetAmount(BigDecimal budgetAmount) {
            this.budgetAmount = budgetAmount;
            return this;
        }

        public Builder budgetCurrency(String budgetCurrency) {
            this.budgetCurrency = budgetCurrency;
            return this;
        }

        public Builder status(Status status) {
            this.status = status;
            return this;
        }

        public Builder deadlineDate(String deadlineDate) {
            this.deadlineDate = deadlineDate;
            return this;
        }

        public Builder orderIndex(Integer orderIndex) {
            this.orderIndex = orderIndex;
            return this;
        }

        public Milestone build() {
            return new Milestone(this);
        }
    }

    // ✅ Static method for easy builder usage
    public static Builder builder() {
        return new Builder();
    }

    // Getters (optional setters if you still want mutability)
    public UUID getMilestoneId() { return milestoneId; }
    public UUID getJobId() { return jobId; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public BigDecimal getBudgetAmount() { return budgetAmount; }
    public String getBudgetCurrency() { return budgetCurrency; }
    public Status getStatus() { return status; }
    public String getDeadlineDate() { return deadlineDate; }
    public Integer getOrderIndex() { return orderIndex; }
}
