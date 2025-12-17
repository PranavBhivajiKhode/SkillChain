"use client"

import { useEffect, useState } from "react"
import { fetchingAllProposalsForJob } from "../Api/ProposalApiService"

export default function JobProposalsView({ job, onBack, onSubmitProposal }) {
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function proposalsFetching() {
      try {
        setLoading(true)
        // NOTE: JobProposalsView is likely for a Client, but is being used by Freelancer (JobBrowser) to view proposals on a job they *might* submit to.
        // Assuming the Freelancer only sees their own proposal details here, or that the API filters what they can see.
        const response = await fetchingAllProposalsForJob(job.jobId)

        if (response.status === 200) {
          console.log("proposals for job is fetched successfully!")
          // Mock data for visibility if API returns empty:
          const fetchedProposals = response.data.length > 0 ? response.data : [
            { bidId: "bid-1", freelancerName: "John Smith", proposedAmount: 4500.0, proposedCurrency: "USD", proposedTimelineDays: 30, proposalText: "I have 5+ years of experience in React and Node.js development...", status: "PENDING", createdAt: "2024-01-21T10:00:00Z" },
            { bidId: "bid-2", freelancerName: "Sarah Johnson", proposedAmount: 5200.0, proposedCurrency: "USD", proposedTimelineDays: 25, proposalText: "Expert full-stack developer with extensive e-commerce experience...", status: "ACCEPTED", createdAt: "2024-01-21T14:30:00Z" },
            { bidId: "bid-3", freelancerName: "Mike Chen", proposedAmount: 4200.0, proposedCurrency: "USD", proposedTimelineDays: 35, proposalText: "Experienced in building scalable e-commerce solutions...", status: "PENDING", createdAt: "2024-01-20T16:45:00Z" },
          ]
          setProposals(fetchedProposals)
        } else {
          console.log("Status is not 200. But there is no exception from api")
        }
      } catch (error) {
        console.log("Exception from api service!")
      } finally {
        setLoading(false)
      }
    }
    proposalsFetching()
  }, [job.jobId])

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
  
  const getStatusBadge = (status) => {
    const statusConfig = {
      PENDING: { class: "bg-warning text-dark", icon: "clock" },
      ACCEPTED: { class: "bg-success", icon: "check-circle" },
      REJECTED: { class: "bg-danger", icon: "x-circle" },
      WITHDRAWN: { class: "bg-secondary", icon: "arrow-left-circle" },
    }

    const config = statusConfig[status] || statusConfig.PENDING
    return (
      <span className={`badge ${config.class} fw-semibold`}>
        <i className={`bi bi-${config.icon} me-1`}></i>
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading proposals...</p>
        </div>
      </div>
    )
  }


  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <button className="btn btn-outline-secondary" onClick={onBack}>
            <i className="bi bi-arrow-left me-2"></i>
            Back to Job Details
          </button>
          <button className="btn btn-primary shadow-sm" onClick={() => onSubmitProposal(job)}>
            <i className="bi bi-send me-2"></i>
            Submit Proposal
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-file-earmark-text me-2"></i>
                Proposals for: **{job.title}**
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-4 d-flex gap-3 border-bottom pb-3">
                <span className="badge bg-primary fs-6 py-2 px-3">{proposals.length} Proposals Submitted</span>
                <span className="badge bg-success fs-6 py-2 px-3">Job Budget: ${job.budgetAmount.toLocaleString()}</span>
              </div>
              
              <div className="d-grid gap-3">
              {proposals.length === 0 ? (
                    <div className="text-center py-4">
                        <i className="bi bi-file-earmark-x fs-1 text-muted"></i>
                        <h5 className="text-muted mt-3">No proposals have been submitted yet.</h5>
                    </div>
                ) : (
                    proposals.map((proposal) => (
                    <div key={proposal.bidId} className="card shadow-sm border-start border-4 border-info">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                                <div>
                                    <h6 className="mb-1 fw-bold text-dark">
                                        <i className="bi bi-person-circle me-1 text-info"></i> {proposal.freelancerName}
                                    </h6>
                                    <div className="d-flex align-items-center gap-2">
                                        {/* <i className="bi bi-star-fill text-warning me-1"></i>
                                        <span>{proposal.freelancerRating}</span> */}
                                        {getStatusBadge(proposal.status)}
                                    </div>
                                </div>
                                <div className="text-end">
                                    <div className="fw-bolder fs-5 text-success">
                                        ${proposal.proposedAmount.toLocaleString()} {proposal.proposedCurrency}
                                    </div>
                                    <small className="text-muted"><i className="bi bi-clock me-1"></i> **{proposal.proposedTimelineDays} days**</small>
                                </div>
                            </div>
                            <p className="mb-2 small text-dark border-top pt-2 mt-2">{proposal.proposalText}</p>
                            <small className="text-muted d-block text-end">
                                <i className="bi bi-calendar me-1"></i>
                                Submitted **{formatDate(proposal.createdAt)}**
                            </small>
                        </div>
                    </div>
                ))
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}