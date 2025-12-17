"use client"

import { useState } from "react"

export default function JobDetailsViewFreelancer({ job, onViewProposals, onSubmitProposal, onBack }) {
  const [selectedJob, setSelectedJob] = useState(job)

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

  const getJobTypeBadge = (jobType) => {
    const typeClasses = {
      FIXED: "bg-success",
      HOURLY: "bg-warning text-dark",
      CONTRACT: "bg-primary",
    }
    const typeLabels = {
      FIXED: "Fixed Price",
      HOURLY: "Hourly",
      CONTRACT: "Contract",
    }
    return <span className={`badge ${typeClasses[jobType] || "bg-secondary"}`}>{typeLabels[jobType] || jobType}</span>
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      OPEN: "bg-success",
      IN_PROGRESS: "bg-warning text-dark",
      COMPLETED: "bg-primary",
      CANCELLED: "bg-danger",
      PAUSED: "bg-secondary",
    }
    return `badge ${statusClasses[status] || "bg-secondary"}`
  }

  return (
    <div className="card shadow-lg border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0"><i className="bi bi-file-text me-2"></i> Job Details</h4>
        <button className="btn btn-outline-light" onClick={onBack}>
          <i className="bi bi-arrow-left me-1"></i> Back to Jobs
        </button>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-8 border-end">
            <h2 className="mb-3 fw-bold text-dark">{selectedJob.title}</h2>
            <div className="d-flex gap-3 mb-4">
                {getJobTypeBadge(selectedJob.jobType)}
                <span className={getStatusBadge(selectedJob.status)}>{selectedJob.status.replace("_", " ")}</span>
                {selectedJob.status === "URGENT" && <span className="badge bg-danger"><i className="bi bi-exclamation-triangle me-1"></i> URGENT</span>}
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
                    <i className="bi bi-tag me-1"></i> {skill}
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
            <div className="card bg-light shadow-sm border-0">
              <div className="card-body">
                <h6 className="card-title text-primary fw-bold border-bottom pb-2 mb-3">Job Summary</h6>

                <InfoItem label="Total Budget" value={formatCurrency(selectedJob.budgetAmount, selectedJob.budgetCurrency)} icon="bi-currency-dollar" className="text-success fw-bolder fs-5" />
                <InfoItem label="Proposals Submitted" value={selectedJob.totalProposals} icon="bi-file-earmark-text" className="fw-semibold" />
                <InfoItem label="Total Views" value={selectedJob.totalViews} icon="bi-eye" className="fw-semibold" />
                <InfoItem label="Deadline" value={formatDate(selectedJob.deadlineDate)} icon="bi-calendar-x" className="fw-semibold" />
                <InfoItem label="Posted On" value={formatDate(selectedJob.createdAt)} icon="bi-clock" />
                <InfoItem label="Job ID" value={selectedJob.jobId} icon="bi-hash" className="small font-monospace" />
              </div>
            </div>

            <div className="mt-4 d-grid gap-2">
              <button className="btn btn-outline-info py-2" onClick={() => onViewProposals(job)}>
                <i className="bi bi-file-earmark-text me-2"></i>
                **View {selectedJob.totalProposals} Proposals**
              </button>
              <button className="btn btn-primary py-2 shadow-sm" onClick={() => onSubmitProposal(job)}>
                <i className="bi bi-send me-2"></i>
                **Submit Your Proposal**
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for cleaner info items
const InfoItem = ({ label, value, icon, className = '' }) => (
    <div className="mb-3 border-bottom pb-2">
        <small className="text-muted d-block mb-1">
            <i className={`bi ${icon} me-2`}></i> {label}
        </small>
        <div className={className}>{value}</div>
    </div>
);