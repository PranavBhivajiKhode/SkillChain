package com.pranav_khode.job_posting_service.DTO.response;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

//import com.pranav_khode.job_posting_service.file_management.JobFile;

public class ListActiveJobForClientResponse {
    private String jobId;
    private String title;
    private String description;
    private BigDecimal budgetAmount;
    private String budgetCurrency;
    private String status;
    private String assignedFreelancerId;
//    private List<JobFile> files = new ArrayList<>();
    private List<ListMilestoneForActiveJob> milestones = new ArrayList<>();
	
	public ListActiveJobForClientResponse() {}
	
	
	public String getJobId() {
		return jobId;
	}
	public void setJobId(String jobId) {
		this.jobId = jobId;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getAssignedFreelancerId() {
		return assignedFreelancerId;
	}
	public void setAssignedFreelancerId(String assignedFreelancerId) {
		this.assignedFreelancerId = assignedFreelancerId;
	}
//	public List<JobFile> getFiles() {
//		return files;
//	}
//	public void setFiles(List<JobFile> files) {
//		this.files = files;
//	}
	public List<ListMilestoneForActiveJob> getMilestones() {
		return milestones;
	}
	public void setMilestones(List<ListMilestoneForActiveJob> milestones) {
		this.milestones = milestones;
	}
	
	
}


//{
//    jobId: "job-202",
//    title: "Mobile App MVP",
//    description: "Cross-platform MVP with auth, feed, and notifications.",
//    budgetAmount: 12000,
//    budgetCurrency: "USD",
//    status: "IN_PROGRESS",
//    assignedFreelancerId: "freelancer-12",
//    files: [],
//    milestones: [
//      {
//        id: "m1",
//        title: "Auth & Onboarding",
//        amount: 3000,
//        currency: "USD",
//        status: "COMPLETED_VERIFIED",
//        files: [],
//        paid: true,
//      },
//      {
//        id: "m2",
//        title: "Feed & Posting",
//        amount: 5000,
//        currency: "USD",
//        status: "COMPLETED_VERIFIED",
//        files: [],
//        paid: true,
//      },
//      {
//        id: "m3",
//        title: "Push & QA",
//        amount: 4000,
//        currency: "USD",
//        status: "COMPLETED_VERIFIED",
//        files: [],
//        paid: false,
//      },
//    ],
//  },