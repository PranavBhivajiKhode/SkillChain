"use client"

import { useEffect, useState } from "react"
import { initialJobRetrivalForFreelancer, jobRetrivalForFreelancerUsingCustomAttributes } from "../Api/JobApiService"
import JobDetailsViewFreelancer from "./JobDetailsViewFreelancer"
import JobProposalsView from "./JobProposalsView"
import ProposalSubmissionForm from "./ProposalSubmissionForm"

export default function JobBrowser() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [budgetRange, setBudgetRange] = useState("ALL")
  const [status, setStatus] = useState("All")
  const [skillSet, setSkillSet] = useState([])
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [currentView, setCurrentView] = useState("jobList") // jobList, jobDetails, proposals, proposalForm
  const [navigationHistory, setNavigationHistory] = useState([])

  // ... (useEffect for initialJobFetching, customJobFilter, mockProposals, categories, budgetRanges, statusList, formatDate, getClientName, getClientRating are UNCHANGED) ...
  
    useEffect(() => {
        const initialJobFetching = async () => {
        try {
            const response = await initialJobRetrivalForFreelancer()

            if (response.status === 200) {
            console.log("Initial retrieval of jobs for freelancer is successfull!")
            setJobs(response.data)
            } else {
            console.log("Initial job fetching method executed without exception but response status is not 200!")
            }
        } catch (error) {
            console.log("Exception in api service!")
        }
        }
        initialJobFetching()
    }, [])

    async function customJobFilter() {
        if (selectedCategory === "ALL") {
        setSkillSet([])
        } else if (selectedCategory === "Web Development") {
        setSkillSet(["React", "Node.js", "JavaScript", "PHP", "WordPress"])
        } else if (selectedCategory === "Design") {
        setSkillSet(["UI/UX", "Figma", "Logo Design", "Brand Identity", "Adobe Creative Suite"])
        } else if (selectedCategory === "Data Science") {
        setSkillSet(["Python", "Data Analysis", "Visualization"])
        }

        const requestBody = {
        keyword: searchTerm,
        status: status,
        budgetRange: budgetRange,
        skillSet: skillSet,
        }

        try {
        const response = await jobRetrivalForFreelancerUsingCustomAttributes(requestBody)

        if (response.status === 200) {
            console.log("custom job retreival successful!")
            setJobs(response.data)
        } else {
            console.log("Custom job filter is executed but status is not 200!")
        }
        } catch (error) {
        console.log("Exception from api")
        }
    }

    const categories = ["ALL", "Web Development", "Design", "Data Science", "Mobile Development", "Marketing"]
    const budgetRanges = [
        { label: "All Budgets", value: "ALL" },
        { label: "Under $1,000", value: "0-1000" },
        { label: "$1,000 - $3,000", value: "1000-3000" },
        { label: "$3,000 - $5,000", value: "3000-5000" },
        { label: "Above $5,000", value: "above 5000" },
    ]

    const statusList = [
        { label: "All Status", value: "All" },
        { label: "Open", value: "OPEN" },
        { label: "In progress", value: "IN_PROGRESS" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Closed", value: "CLOSED" },
        { label: "Canceled", value: "CANCELED" },
    ]

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) return "Today"
        if (diffDays === 2) return "Yesterday"
        if (diffDays <= 7) return `${diffDays - 1} days ago`
        return date.toLocaleDateString()
    }

    const getClientName = (clientId) => {
        const clientNames = {
        "550e8400-e29b-41d4-a716-446655440011": "TechCorp Inc.",
        "550e8400-e29b-41d4-a716-446655440012": "FitLife Solutions",
        "550e8400-e29b-41d4-a716-446655440013": "Analytics Pro",
        "550e8400-e29b-41d4-a716-446655440014": "WebSolutions LLC",
        "550e8400-e29b-41d4-a716-446655440015": "StartupXYZ",
        }
        return clientNames[clientId] || "Unknown Client"
    }

    const getClientRating = (clientId) => {
        const clientRatings = {
        "550e8400-e29b-41d4-a716-446655440011": 4.8,
        "550e8400-e29b-41d4-a716-446655440012": 4.6,
        "550e8400-e29b-41d4-a716-446655440013": 4.9,
        "550e8400-e29b-41d4-a716-446655440014": 4.7,
        "550e8400-e29b-41d4-a716-446655440015": 4.5,
        }
        return clientRatings[clientId] || 4.0
    }


  const handleViewDetails = (job) => {
    setSelectedJob(job)
    setNavigationHistory([...navigationHistory, currentView])
    setCurrentView("jobDetails")
  }

  const handleViewProposals = (job) => {
    setSelectedJob(job)
    setNavigationHistory([...navigationHistory, currentView])
    setCurrentView("proposals")
  }

  const handleSubmitProposal = (job) => {
    setSelectedJob(job)
    setNavigationHistory([...navigationHistory, currentView])
    setCurrentView("proposalForm")
  }

  const handleBackToJobs = () => {
    const previousView = navigationHistory.pop()
    setNavigationHistory([...navigationHistory])
    setCurrentView(previousView || "jobList")
    if (previousView === "jobList") {
      setSelectedJob(null)
    }
  }

  const handleBackToSelectedJob = () => {
    const previousView = navigationHistory.pop()
    setNavigationHistory([...navigationHistory])
    setCurrentView(previousView || "jobDetails")
  }

  const handleProposalSubmit = (proposalData) => {
    console.log("Proposal submitted:", proposalData)
    alert("Proposal submitted successfully!")
    setCurrentView("jobList")
  }

  if (currentView === "jobDetails") {
    return (
      <JobDetailsViewFreelancer
        job={selectedJob}
        onBack={handleBackToJobs}
        onViewProposals={handleViewProposals}
        onSubmitProposal={handleSubmitProposal}
      />
    )
  }

  if (currentView === "proposals") {
    return (
      <JobProposalsView job={selectedJob} onBack={handleBackToSelectedJob} onSubmitProposal={handleSubmitProposal} />
    )
  }

  if (currentView === "proposalForm") {
    return <ProposalSubmissionForm job={selectedJob} onBack={handleBackToSelectedJob} onSubmit={handleProposalSubmit} />
  }

  return (
    <div className="container-fluid">
      <h3 className="mb-4 text-dark"><i className="bi bi-search me-2 text-primary"></i> Browse Open Jobs</h3>
      
      {/* Search and Filters - Enhanced Look */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow border-0 bg-white p-3"> {/* Use p-3 for padding inside card */}
            <div className="card-body p-0">
              <div className="row g-3 align-items-end">
                <div className="col-md-3">
                    <label className="form-label small text-muted mb-1">Keywords</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                      <i className="bi bi-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search jobs, skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                    <label className="form-label small text-muted mb-1">Category</label>
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label small text-muted mb-1">Budget</label>
                  <select className="form-select" value={budgetRange} onChange={(e) => setBudgetRange(e.target.value)}>
                    {budgetRanges.map((range) => (
                      <option key={range.value} value={range.value}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                    <label className="form-label small text-muted mb-1">Status</label>
                  <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                    {statusList.map((list) => (
                      <option key={list.value} value={list.value}>
                        {list.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary w-100 shadow-sm" onClick={customJobFilter}>
                    <i className="bi bi-funnel me-2"></i>
                    Filter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Job Listings */}
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0 text-dark">
              <i className="bi bi-briefcase me-2 text-secondary"></i>
              Available Jobs (<span className="fw-bold text-primary">{jobs.length}</span>)
            </h5>
            <div className="dropdown">
              <button
                className="btn btn-outline-secondary dropdown-toggle btn-sm"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort by: **Newest**
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item" href="#">Newest First</a></li>
                <li><a className="dropdown-item" href="#">Highest Budget</a></li>
                <li><a className="dropdown-item" href="#">Lowest Competition</a></li>
                <li><a className="dropdown-item" href="#">Best Match</a></li>
              </ul>
            </div>
          </div>

          {jobs.length === 0 ? (
            <div className="card shadow-sm border-0">
              <div className="card-body text-center py-5">
                <i className="bi bi-search fs-1 text-muted"></i>
                <h5 className="text-muted mt-3">No jobs found</h5>
                <p className="text-muted">Try adjusting your search criteria or filters</p>
              </div>
            </div>
          ) : (
            <div className="d-grid gap-3">
              {jobs.map((job) => (
                <div key={job.jobId} className="card shadow-sm border-start border-4 border-primary"> {/* Highlight job card */}
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="flex-grow-1 me-3">
                        <div className="d-flex align-items-center mb-2">
                          <h5 className="mb-0 me-2 text-dark fw-bold">{job.title}</h5>
                          {job.status === "URGENT" && (
                            <span className="badge bg-danger me-2">
                              <i className="bi bi-exclamation-triangle me-1"></i>
                              Urgent
                            </span>
                          )}
                          <span className="badge bg-info text-dark">{job.jobType}</span>
                        </div>
                        <p className="text-muted mb-2 small text-truncate" style={{ maxWidth: '700px' }}>{job.description}</p>
                        <div className="d-flex flex-wrap gap-2">
                          {job.requiredSkills.map((skill) => (
                            <span key={skill} className="badge bg-secondary-subtle text-dark border border-secondary-subtle rounded-pill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bolder fs-5 text-success mb-1">
                          ${job.budgetAmount.toLocaleString()} {job.budgetCurrency}
                        </div>
                        <small className="text-muted">Deadline: **{new Date(job.deadlineDate).toLocaleDateString()}**</small>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <div className="d-flex align-items-center gap-3 small text-muted">
                        <span>
                          <i className="bi bi-building me-1"></i>
                          **{getClientName(job.clientId)}**
                        </span>
                        <span>
                          <i className="bi bi-star-fill text-warning me-1"></i>
                          **{getClientRating(job.clientId)}**
                        </span>
                        <span>
                          <i className="bi bi-file-earmark-text me-1"></i>
                          {job.totalProposals} proposals
                        </span>
                        <span>
                          <i className="bi bi-clock me-1"></i>
                          Posted **{formatDate(job.createdAt)}**
                        </span>
                      </div>
                      <div className="d-flex gap-2">
                        <button className="btn btn-outline-dark btn-sm" onClick={() => handleViewDetails(job)}>
                          <i className="bi bi-eye me-1"></i>
                          View Details
                        </button>
                        <button className="btn btn-primary btn-sm" onClick={() => handleSubmitProposal(job)}>
                          <i className="bi bi-send me-1"></i>
                          Submit Proposal
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}