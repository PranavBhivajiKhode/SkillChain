"use client"

import { useState } from "react"
import JobEditForm from "./JobEditForm"
import ProposalsManagement from "./ProposalsManagement"
import { UpdateJobStatusToClose } from "../Api/JobApiService" //

const JobListings = ({ jobs, setJobs }) => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [showProposals, setShowProposals] = useState(false)
  const [statusFilter, setStatusFilter] = useState("ALL")

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      OPEN: "bg-success",
      ACTIVE: "bg-success",
      IN_PROGRESS: "bg-warning text-dark",
      COMPLETED: "bg-primary",
      CANCELLED: "bg-danger",
      CLOSED: "bg-dark",
      PAUSED: "bg-secondary",
    }
    return `badge fw-semibold ${statusClasses[status] || "bg-secondary"}`
  }

  const getJobTypeBadge = (jobType) => {
    const typeClasses = {
      FIXED: "bg-info text-dark",
      FIXED_PRICE: "bg-info text-dark", // Handle both conventions
      HOURLY: "bg-warning text-dark",
      CONTRACT: "bg-secondary",
    }
    const typeLabels = {
      FIXED: "Fixed Price",
      FIXED_PRICE: "Fixed Price",
      HOURLY: "Hourly",
      CONTRACT: "Contract",
    }
    return <span className={`badge ${typeClasses[jobType] || "bg-secondary"}`}>{typeLabels[jobType] || jobType}</span>
  }

  const getMilestoneStatusBadge = (status) => {
    const statusClasses = {
      NOT_STARTED: "bg-secondary",
      PENDING: "bg-warning",
      IN_PROGRESS: "bg-info",
      COMPLETED: "bg-success",
      CANCELLED: "bg-danger",
    }
    return `badge fw-semibold ${statusClasses[status] || "bg-secondary"}`
  }

  const handleEditJob = () => {
    setIsEditMode(true)
  }

  const handleViewProposals = () => {
    setShowProposals(true)
  }

  const handleJobUpdate = (updatedJobData) => {
    // Logic to update state after successful API call
    setJobs((prevJobs) => prevJobs.map((job) => (job.jobId === updatedJobData.jobId ? { ...job, ...updatedJobData } : job)))
    setIsEditMode(false)
    setSelectedJob(updatedJobData) // Update the selected job details
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
  }

  async function handleJobClose(jobId) {
    try {
      // API Call: Update job status to CLOSED
      const response = await UpdateJobStatusToClose(jobId) //
      if (response.status === 200) {
        console.log("Status updated to CLOSED successfully -> JobListings.jsx")
        setJobs((prevJobs) => prevJobs.map((job) => (job.jobId === jobId ? { ...job, status: "CLOSED" } : job)))
        if (selectedJob?.jobId === jobId) {
          setSelectedJob((prev) => ({ ...prev, status: "CLOSED" }))
        }
      } else {
        console.log("No exception from server. But status is not 200 -> JobListings.jsx")
      }
    } catch (error) {
      console.log("Exception from server -> JobListings.jsx")
    }
  }

  const handleBackFromProposals = () => {
    setShowProposals(false)
  }

  const getFilteredJobs = () => {
    if (statusFilter === "ALL") {
      return jobs
    }
    return jobs.filter((job) => job.status === statusFilter)
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
  }

  const getStatusCount = (status) => {
    if (status === "ALL") return jobs.length
    return jobs.filter((job) => job.status === status).length
  }

  if (showProposals && selectedJob) {
    return (
      <div className="p-0">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold">Proposals for: {selectedJob.title}</h4>
          <button className="btn btn-outline-secondary" onClick={handleBackFromProposals}>
            <i className="bi bi-arrow-left me-1"></i> Back to Job Details
          </button>
        </div>
        {/* Note: This passes only the selected job for a scoped view */}
        <ProposalsManagement jobs={[selectedJob]} /> 
      </div>
    )
  }

  if (isEditMode && selectedJob) {
    return <JobEditForm job={selectedJob} onSubmit={handleJobUpdate} onCancel={handleCancelEdit} />
  }

  if (selectedJob) {
    return (
      <div className="card shadow-lg border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="card-title mb-0"><i className="bi bi-file-text me-2"></i> Job Details</h4>
          <button className="btn btn-outline-light" onClick={() => setSelectedJob(null)}>
            <i className="bi bi-arrow-left me-1"></i> Back to Job Listings
          </button>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8 border-end">
              <h2 className="mb-3 fw-bold text-dark">{selectedJob.title}</h2>
              <div className="d-flex gap-3 mb-4">
                {getJobTypeBadge(selectedJob.jobType)}
                <span className={getStatusBadge(selectedJob.status)}>{selectedJob.status.replace("_", " ")}</span>
              </div>

              <div className="mb-4">
                <h5 className="border-bottom pb-2 text-primary">Description</h5>
                <p className="text-dark">{selectedJob.description}</p>
              </div>

              <div className="mb-4">
                <h5 className="border-bottom pb-2 text-primary">Required Skills</h5>
                <div className="d-flex flex-wrap gap-2">
                  {selectedJob.requiredSkills.map((skill, index) => (
                    <span key={index} className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill py-2 px-3 fw-normal">
                      <i className="bi bi-tag me-1"></i>{skill}
                    </span>
                  ))}
                </div>
              </div>

              {selectedJob.milestones && selectedJob.milestones.length > 0 && (
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 text-primary">Project Milestones</h5>
                  <div className="row">
                    {selectedJob.milestones
                      .sort((a, b) => a.orderIndex - b.orderIndex)
                      .map((milestone) => (
                        <div key={milestone.milestoneId} className="col-12 mb-3">
                          <div className="card border-start border-4 border-info bg-light-subtle">
                            <div className="card-body p-3">
                              <div className="d-flex justify-content-between align-items-start mb-1">
                                <h6 className="card-title mb-0 fw-bold">
                                  {milestone.orderIndex}. {milestone.title}
                                </h6>
                                <span className={getMilestoneStatusBadge(milestone.status)}>
                                  {milestone.status.replace("_", " ")}
                                </span>
                              </div>
                              <p className="card-text text-muted small mb-2">{milestone.description}</p>
                              <div className="d-flex gap-4 small">
                                <div>
                                    <small className="text-muted me-1">Budget:</small>
                                    <span className="fw-semibold text-success">
                                    {formatCurrency(milestone.budgetAmount, milestone.budgetCurrency)}
                                    </span>
                                </div>
                                <div>
                                    <small className="text-muted me-1">Deadline:</small>
                                    <span className="fw-semibold">{formatDate(milestone.deadlineDate)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-4">
              <div className="card bg-light shadow-sm border-0 mb-4">
                <div className="card-body">
                  <h6 className="card-title text-dark fw-bold border-bottom pb-2 mb-3">Job Summary</h6>

                  <InfoItem label="Total Budget" value={formatCurrency(selectedJob.budgetAmount, selectedJob.budgetCurrency)} icon="bi-currency-dollar" className="text-success fw-bolder fs-5" />
                  <InfoItem label="Proposals Received" value={selectedJob.totalProposals} icon="bi-file-earmark-text" className="fw-semibold" />
                  <InfoItem label="Total Views" value={selectedJob.totalViews} icon="bi-eye" className="fw-semibold" />
                  <InfoItem label="Deadline" value={formatDate(selectedJob.deadlineDate)} icon="bi-calendar-x" className="fw-semibold" />
                  <InfoItem label="Posted On" value={formatDate(selectedJob.createdAt)} icon="bi-clock" />
                  
                  {/* {selectedJob.assignedFreelancerId && (
                    <InfoItem label="Assigned Freelancer ID" value={selectedJob.assignedFreelancerId} icon="bi-person-badge" className="font-monospace small" />
                  )}
                  <InfoItem label="Job ID" value={selectedJob.jobId} icon="bi-hash" className="small font-monospace" /> */}
                </div>
              </div>

              <div className="d-grid gap-2">
                <button 
                  className="btn btn-primary py-2" 
                  onClick={handleViewProposals} 
                  disabled={selectedJob.totalProposals === 0}
                >
                  <i className="bi bi-file-earmark-text me-2"></i>
                  View Proposals ({selectedJob.totalProposals || 0})
                </button>

                {(selectedJob.status === "OPEN" || selectedJob.status === "ACTIVE") && (
                  <>
                    <button className="btn btn-warning py-2 text-dark fw-bold" onClick={handleEditJob}>
                      <i className="bi bi-pencil me-2"></i>
                      Edit Job Post
                    </button>
                    <button className="btn btn-outline-danger py-2" onClick={() => handleJobClose(selectedJob.jobId)}>
                      <i className="bi bi-x-circle me-2"></i>
                      Close Job
                    </button>
                  </>
                )}
                {selectedJob.status === "IN_PROGRESS" && (
                    <button className="btn btn-outline-dark py-2" disabled>
                        <i className="bi bi-kanban me-2"></i> Manage Project
                    </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const filteredJobs = getFilteredJobs()

  return (
    <div className="container-fluid p-0">
        <h3 className="mb-4 text-dark"><i className="bi bi-briefcase me-2 text-primary"></i> My Job Postings</h3>
      
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white rounded shadow-sm">
        <h5 className="mb-0 text-dark">
            <i className="bi bi-list-task me-2 text-secondary"></i>
            Current Jobs (<span className="fw-bold text-primary">{filteredJobs.length}</span>)
        </h5>
        <div className="btn-group" role="group">
          {["ALL", "OPEN", "IN_PROGRESS", "COMPLETED", "CLOSED"].map(status => (
            <button
              key={status}
              type="button"
              className={`btn btn-sm btn-outline-dark ${statusFilter === status ? "active bg-dark text-white" : ""}`}
              onClick={() => handleStatusFilter(status)}
            >
              {status.replace("_", " ")} ({getStatusCount(status)})
            </button>
          ))}
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-center py-5">
            <div className="mb-3">
              <i className="bi bi-briefcase display-4 text-muted"></i>
            </div>
            <h5 className="text-muted">
              {statusFilter === "ALL"
                ? "No jobs posted yet"
                : `No ${statusFilter.toLowerCase().replace("_", " ")} jobs found`}
            </h5>
            <p className="text-muted">
              {statusFilter === "ALL"
                ? "Start by posting your first job to find talented freelancers."
                : "Try selecting a different status filter to see more jobs."}
            </p>
          </div>
        </div>
      ) : (
        <div className="d-grid gap-3">
          {filteredJobs.map((job) => (
            <div key={job.jobId} 
                 className={`card h-100 shadow-sm border-start border-4 ${job.status === 'OPEN' ? 'border-success' : 'border-secondary'}`}
            >
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-1 fw-bold text-dark">{job.title}</h5>
                      <span className={getStatusBadge(job.status)}>{job.status.replace("_", " ")}</span>
                    </div>

                    <p className="card-text text-muted mb-3 small">
                      {job.description.length > 150 ? `${job.description.substring(0, 150)}...` : job.description}
                    </p>

                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {job.requiredSkills.slice(0, 4).map((skill, index) => (
                        <span key={index} className="badge bg-secondary-subtle text-dark border border-secondary-subtle rounded-pill">
                          {skill}
                        </span>
                      ))}
                      {job.requiredSkills.length > 4 && (
                        <span className="badge bg-secondary-subtle text-dark">+{job.requiredSkills.length - 4} more</span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-4 text-end border-start pt-3 pt-md-0">
                    <div className="mb-2">
                      <div className="fw-bolder fs-4 text-success">
                        {formatCurrency(job.budgetAmount, job.budgetCurrency)}
                      </div>
                      <small className="text-muted">{getJobTypeBadge(job.jobType)}</small>
                    </div>

                    <div className="mb-3 d-flex justify-content-end gap-4 small">
                        <small className="text-muted">
                            <i className="bi bi-eye me-1"></i>
                            {job.totalViews} views
                        </small>
                        <small className="text-muted fw-bold">
                            <i className="bi bi-chat-dots me-1"></i>
                            {job.totalProposals} proposals
                        </small>
                    </div>

                    <div className="d-flex flex-column gap-2 mt-3">
                        <button className="btn btn-primary btn-sm" onClick={() => setSelectedJob(job)}>
                          <i className="bi bi-eye me-1"></i> View Details
                        </button>
                        {(job.status === "OPEN" || job.status === "ACTIVE") && (
                            <button 
                                className="btn btn-outline-warning btn-sm text-dark" 
                                onClick={() => { setSelectedJob(job); handleViewProposals(); }}
                            >
                                <i className="bi bi-file-earmark-text me-1"></i> Review Proposals
                            </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-light border-0">
                 <small className="text-muted">Posted on **{formatDate(job.createdAt)}** | Deadline: **{formatDate(job.deadlineDate)}**</small>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default JobListings

// Helper component for cleaner info items (reused from Freelancer UI structure)
const InfoItem = ({ label, value, icon, className = '' }) => (
    <div className="mb-3 border-bottom pb-2">
        <small className="text-muted d-block mb-1">
            <i className={`bi ${icon} me-2`}></i> {label}
        </small>
        <div className={className}>{value}</div>
    </div>
);