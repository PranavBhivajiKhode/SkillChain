package com.pranav_khode.job_posting_service.database;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.pranav_khode.job_posting_service.enums.JobStatus;
import com.pranav_khode.job_posting_service.enums.JobType;
//import com.pranav_khode.job_posting_service.file_management.JobFile;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "jobs")
public class Jobs {

    @Id
    @GeneratedValue
    private UUID jobId;
    
    @Column(nullable = false)
    private UUID clientId;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private BigDecimal budgetAmount;

    @Column(nullable = false, length = 10)
    private String budgetCurrency;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobType jobType;

    @ElementCollection
    @CollectionTable(name = "job_required_skills", joinColumns = @JoinColumn(name = "job_id"))
    @Column(name = "skill")
    private List<String> requiredSkills;
    
    // ✅ Break recursion with @JsonManagedReference
//    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
//    @JsonManagedReference("job-files")
//    private List<JobFile> files;

    private LocalDate deadlineDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status;

    private UUID assignedFreelancerId;

    

    @OneToMany(mappedBy = "job", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("job-milestones")
    private List<Milestone> milestones;

    private int totalViews;
    
    private int totalProposals;
    
    @Column(nullable = false)
    private BigDecimal amountPaid;

    private ZonedDateTime completionDate;

    private boolean paid;


    @Column(nullable = false, updatable = false)
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
    
    
    public Jobs() {
    	
    }

    
    @PrePersist
    protected void onCreate() {
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
        this.totalViews = 0;
        this.totalProposals = 0;
        if (this.status == null) {
            this.status = JobStatus.OPEN;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }

	public UUID getJobId() {
		return jobId;
	}

	public void setJobId(UUID jobId) {
		this.jobId = jobId;
	}

	public UUID getClientId() {
		return clientId;
	}

	public void setClientId(UUID clientId) {
		this.clientId = clientId;
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

	public JobType getJobType() {
		return jobType;
	}

	public void setJobType(JobType jobType) {
		this.jobType = jobType;
	}

	public List<String> getRequiredSkills() {
		return requiredSkills;
	}

	public void setRequiredSkills(List<String> requiredSkills) {
		this.requiredSkills = requiredSkills;
	}

	public LocalDate getDeadlineDate() {
		return deadlineDate;
	}

	public void setDeadlineDate(LocalDate deadlineDate) {
		this.deadlineDate = deadlineDate;
	}

	public JobStatus getStatus() {
		return status;
	}

	public void setStatus(JobStatus status) {
		this.status = status;
	}

	public UUID getAssignedFreelancerId() {
		return assignedFreelancerId;
	}

	public void setAssignedFreelancerId(UUID assignedFreelancerId) {
		this.assignedFreelancerId = assignedFreelancerId;
	}
	
	public int getTotalViews() {
		return totalViews;
	}

	public void setTotalViews(int totalViews) {
		this.totalViews = totalViews;
	}

	public int getTotalProposals() {
		return totalProposals;
	}

	public void setTotalProposals(int totalProposals) {
		this.totalProposals = totalProposals;
	}


	public ZonedDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(ZonedDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public ZonedDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(ZonedDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}


//	public List<JobFile> getFiles() {
//		return files;
//	}
//
//
//	public void setFiles(List<JobFile> files) {
//		this.files = files;
//	}


	public List<Milestone> getMilestones() {
		return milestones;
	}


	public void setMilestones(List<Milestone> milestones) {
		this.milestones = milestones;
	}


	public BigDecimal getAmountPaid() {
		return amountPaid;
	}


	public void setAmountPaid(BigDecimal amountPaid) {
		this.amountPaid = amountPaid;
	}


	public ZonedDateTime getCompletionDate() {
		return completionDate;
	}


	public void setCompletionDate(ZonedDateTime completionDate) {
		this.completionDate = completionDate;
	}


	public boolean isPaid() {
		return paid;
	}


	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	
}

