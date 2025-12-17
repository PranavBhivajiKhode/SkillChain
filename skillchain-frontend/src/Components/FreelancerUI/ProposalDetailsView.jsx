"use client"

import { useState, useEffect } from "react"
import JobDetailsViewFreelancer from "./JobDetailsViewFreelancer"
import { jobRetrivalForFreelancerUsingJobId } from "../Api/JobApiService"

export default function ProposalDetailsView({ selectedProposal, onBack, onEditProposal }) {
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJob = async () => {
      if (selectedProposal?.jobId) {
        try {
          setLoading(true)
          const response = await jobRetrivalForFreelancerUsingJobId(selectedProposal.jobId)

          if (response.status === 200) {
            console.log(`Job for proposal with id ${selectedProposal.bidId} is fetched successfully!`)
            setJob(response.data)
          } else {
            console.log("No Exception from server. But Response status is not 200")
          }
        } catch (error) {
          console.log("Exception from server!")
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchJob()
  }, [selectedProposal])

  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { class: "bg-warning text-dark", icon: "clock" },
      ACCEPTED: { class: "bg-success", icon: "check-circle" },
      REJECTED: { class: "bg-danger", icon: "x-circle" },
      WITHDRAWN: { class: "bg-secondary", icon: "arrow-left-circle" },
    }

    const config = statusConfig[status] || statusConfig.PENDING
    return (
      <span className={`badge ${config.class} fs-6 py-2 px-3 fw-bold`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row mb-3">
          <div className="col-12">
            <button className="btn btn-outline-primary" onClick={onBack}>
              <i className="bi bi-arrow-left me-2"></i>
              Back to Proposals
            </button>
          </div>
        </div>
        <div className="card shadow-sm border-0">
            <div className="card-body text-center py-5">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3 text-muted">Loading job details...</p>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12">
          <button className="btn btn-outline-secondary" onClick={onBack}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Proposals
          </button>
        </div>
      </div>

      <div className="row">
        {/* Left Side: Job Details */}
        <div className="col-lg-8">
          {job ? (
            // Reusing the styled JobDetailsViewFreelancer component
            <JobDetailsViewFreelancer
              job={job}
              onBack={() => {}}
              onViewProposals={() => {}}
              onSubmitProposal={() => {}}
            />
          ) : (
            <div className="card shadow-sm border-0">
              <div className="card-body text-center py-5">
                <i className="bi bi-exclamation-triangle fs-1 text-warning"></i>
                <h5 className="mt-3">Job details not available</h5>
                <p className="text-muted">Unable to load job information for this proposal.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Proposal Details */}
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 sticky-top" style={{ top: '15px' }}>
            <div className="card-header bg-dark text-white">
              <h6 className="mb-0">
                <i className="bi bi-file-text me-2"></i>
                Your Proposal Details
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-center align-items-center mb-4">
                {getStatusBadge(selectedProposal.status)}
              </div>

              <div className="row mb-4 g-2">
                <div className="col-6">
                  <div className="card border-success bg-success-subtle p-2 text-center">
                    <small className="text-muted d-block">Proposed Amount</small>
                    <div className="fw-bold fs-5 text-success">
                      {selectedProposal.proposedCurrency} {selectedProposal.proposedAmount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card border-primary bg-primary-subtle p-2 text-center">
                    <small className="text-muted d-block">Timeline</small>
                    <div className="fw-bold fs-5 text-primary">{selectedProposal.proposedTimelineDays} days</div>
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 border rounded">
                <h6 className="border-bottom pb-2 text-dark">Proposal Description</h6>
                <p className="small text-dark mb-0">{selectedProposal.proposalText}</p>
              </div>

              <div className="mb-4 small border-bottom pb-2">
                <div className="d-flex justify-content-between text-muted">
                  <span>Submitted:</span>
                  <span className="fw-semibold">{formatDate(selectedProposal.createdAt)}</span>
                </div>
                <div className="d-flex justify-content-between text-muted">
                  <span>Last Updated:</span>
                  <span className="fw-semibold">{formatDate(selectedProposal.updatedAt)}</span>
                </div>
              </div>

              {selectedProposal.status === "PENDING" && (
                <div className="d-grid gap-2">
                  <button className="btn btn-warning text-dark" onClick={() => onEditProposal(selectedProposal)}>
                    <i className="bi bi-pencil me-2"></i>
                    Edit Proposal
                  </button>
                  <button className="btn btn-outline-danger">
                    <i className="bi bi-trash me-2"></i>
                    Withdraw Proposal
                  </button>
                </div>
              )}

              {selectedProposal.status === "ACCEPTED" && (
                <div className="alert alert-success small text-center fw-bold">
                  <i className="bi bi-check-circle me-2"></i>
                  Proposal Accepted!
                </div>
              )}

              {selectedProposal.status === "REJECTED" && (
                <div className="alert alert-danger small text-center fw-bold">
                  <i className="bi bi-x-circle me-2"></i>
                  Proposal Rejected.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}