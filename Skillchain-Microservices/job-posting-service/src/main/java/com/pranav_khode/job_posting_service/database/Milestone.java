package com.pranav_khode.job_posting_service.database;

import java.math.BigDecimal;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.pranav_khode.job_posting_service.enums.MileStoneStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Milestone {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID milestoneId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id", nullable = false)
    @JsonBackReference("job-milestones") // ✅ prevents recursion
    private Jobs job;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal budgetAmount;

    @Column(nullable = false, length = 10)
    private String budgetCurrency;

    @Enumerated(EnumType.STRING)
    private MileStoneStatus status;

    private String deadlineDate;
    
    private Integer orderIndex;

//    @OneToMany(mappedBy = "milestone", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference("milestone-files")
//    private List<MilestoneFile> files;

    private boolean paid;


    public Milestone() {
		super();
	}

	// 🔹 Private constructor (only Builder can create instances)
    private Milestone(Builder builder) {
        this.milestoneId = builder.milestoneId;
        this.job = builder.job;
        this.title = builder.title;
        this.description = builder.description;
        this.budgetAmount = builder.budgetAmount;
        this.budgetCurrency = builder.budgetCurrency;
        this.status = builder.status;
        this.deadlineDate = builder.deadlineDate;
        this.orderIndex = builder.orderIndex;
        this.paid = builder.paid;
    }

    // ✅ Static nested Builder class
    public static class Builder {
        private UUID milestoneId;
        private Jobs job;
        private String title;
        private String description;
        private BigDecimal budgetAmount;
        private String budgetCurrency;
        private MileStoneStatus status;
        private String deadlineDate;
        private Integer orderIndex;
        private boolean paid;

        public Builder milestoneId(UUID milestoneId) {
            this.milestoneId = milestoneId;
            return this;
        }

        public Builder job(Jobs job) {
            this.job = job;
            return this;
        }
        
        public Builder paid(boolean paid) {
        	this.paid = paid;
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

        public Builder status(MileStoneStatus status) {
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
    public Jobs getJob() { return job; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public BigDecimal getBudgetAmount() { return budgetAmount; }
    public String getBudgetCurrency() { return budgetCurrency; }
    public MileStoneStatus getStatus() { return status; }
    public String getDeadlineDate() { return deadlineDate; }
    public Integer getOrderIndex() { return orderIndex; }
//	public List<MilestoneFile> getFiles() { return files; }
	public boolean isPaid() { return paid; }

	public void setMilestoneId(UUID milestoneId) {
		this.milestoneId = milestoneId;
	}

	public void setJob(Jobs job) {
		this.job = job;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setBudgetAmount(BigDecimal budgetAmount) {
		this.budgetAmount = budgetAmount;
	}

	public void setBudgetCurrency(String budgetCurrency) {
		this.budgetCurrency = budgetCurrency;
	}

	public void setStatus(MileStoneStatus status) {
		this.status = status;
	}

	public void setDeadlineDate(String deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	public void setOrderIndex(Integer orderIndex) {
		this.orderIndex = orderIndex;
	}

//	public void setFiles(List<MilestoneFile> files) {
//		this.files = files;
//	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}
	
    
    
}
