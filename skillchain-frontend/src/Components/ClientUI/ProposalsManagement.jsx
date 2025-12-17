"use client"

import { useEffect, useState } from "react"
import { fetchingAllProposalsForJob, updateProposalStatusToAccepted, updateProposalStatusToRejected } from "../Api/ProposalApiService" //

const ProposalsManagement = ({ jobs }) => {
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [filterStatus, setFilterStatus] = useState("all")
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [processingProposals, setProcessingProposals] = useState(new Set())

  // Find the selected job object for title/details
  const selectedJob = jobs.find(job => job.jobId === selectedJobId);

  useEffect(() => {
    if (jobs && jobs.length > 0 && !selectedJobId) {
      const firstJobId = jobs[0].jobId
      setSelectedJobId(firstJobId)
      proposalsFetching(firstJobId)
    } else if (selectedJobId) {
      proposalsFetching(selectedJobId);
    }
  }, [jobs, selectedJobId]) // Re-fetch when job list or selectedJobId changes

  const selectedJobProposals = proposals.filter(
    (proposal) => filterStatus === "all" || proposal.status === filterStatus,
  )

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-warning text-dark"
      case "accepted":
        return "bg-success"
      case "rejected":
        return "bg-danger"
      default:
        return "bg-secondary"
    }
  }
  
  const getProposalIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bi-clock"
      case "accepted":
        return "bi-check-circle"
      case "rejected":
        return "bi-x-circle"
      default:
        return "bi-file-text"
    }
  }
  
  const handleAcceptProposal = async (proposalId) => {
    setProcessingProposals((prev) => new Set([...prev, proposalId]))

    try {
      // API Call: Update proposal status to accepted
      const response = await updateProposalStatusToAccepted(proposalId); //
      if(response.status === 200){
        console.log("Proposal accepted successfully");
        // Update proposal status locally
        setProposals((prev) =>
          prev.map((proposal) => (proposal.id === proposalId ? { ...proposal, status: "accepted" } : proposal)),
        )
      }else{
        console.log("No exception from server. But response is not 200!");
      }
    } catch (error) {
      console.error("Error accepting proposal:", error)
    } finally {
      setProcessingProposals((prev) => {
        const newSet = new Set(prev)
        newSet.delete(proposalId)
        return newSet
      })
    }
  }

  const handleRejectProposal = async (proposalId) => {
    setProcessingProposals((prev) => new Set([...prev, proposalId]))

    try {
      // API Call: Update proposal status to rejected
      const response = await updateProposalStatusToRejected(proposalId); //
      if(response.status === 200){
        console.log("Proposal rejected successfully");

        // Update proposal status locally
        setProposals((prev) =>
          prev.map((proposal) => (proposal.id === proposalId ? { ...proposal, status: "rejected" } : proposal)),
        )
      }else{
        console.log("No exception from server. But response is not 200!");
      }
    } catch (error) {
      console.error("Error rejecting proposal:", error)
    } finally {
      setProcessingProposals((prev) => {
        const newSet = new Set(prev)
        newSet.delete(proposalId)
        return newSet
      })
    }
  }

  async function proposalsFetching(jobId) {
    if (!jobId) return;

    setLoading(true)
    setError(null)
    setProposals([]); // Clear proposals from previous job

    try {
      // API Call: Fetch all proposals for the selected job
      const response = await fetchingAllProposalsForJob(jobId) //
      if (response.status === 200) {
        // NOTE: The backend may return snake_case (bid_amount) or camelCase (bidAmount). 
        // Assuming the current data uses camelCase where needed (bidAmount, freelancerName, etc.)
        setProposals(response.data)
        
      } else {
        console.error("Failed to fetch proposals. Status:", response.status)
        setError("Failed to fetch proposals.")
        setProposals([])
      }
    } catch (error) {
      console.error("Exception from API service:", error)
      setError("An error occurred while fetching proposals.")
      setProposals([])
    } finally {
      setLoading(false)
    }
  }
  
  const formatCurrency = (amount, currency = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return (
    <div className="container-fluid p-0">
      <h3 className="mb-4 text-dark"><i className="bi bi-file-text me-2 text-warning"></i> Proposals Management</h3>
      
      <div className="card shadow-sm border-0 mb-4">
          <div className="card-body d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                    Proposals for: 
                    <span className="fw-bold text-primary ms-2">{selectedJob?.title || "Select a Job"}</span>
                </h5>
                <div className="d-flex gap-3">
                    <select
                        className="form-select"
                        value={selectedJobId || ""}
                        onChange={(e) => {
                            const jobId = e.target.value
                            setSelectedJobId(jobId)
                            // proposalsFetching(jobId) // Already handled by useEffect
                        }}
                        disabled={loading || !jobs || jobs.length === 0}
                    >
                        {jobs && jobs.length > 0 ? (
                        jobs.map((job) => (
                            <option key={job.jobId} value={job.jobId}>
                            {job.title} ({job.status.replace('_', ' ')})
                            </option>
                        ))
                        ) : (
                        <option value="" disabled>
                            No jobs available
                        </option>
                        )}
                    </select>
                    <select
                        className="form-select"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
          </div>
      </div>

      {/* Proposals Summary */}
      <div className="row mb-4">
        <div className="col-md-3">
          <SummaryCard title="Total Proposals" value={proposals.length} icon="bi-list-check" color="primary" />
        </div>
        <div className="col-md-3">
          <SummaryCard title="Pending Review" value={proposals.filter((p) => p.status?.toLowerCase() === "pending").length} icon="bi-clock" color="warning" />
        </div>
        <div className="col-md-3">
          <SummaryCard title="Accepted" value={proposals.filter((p) => p.status?.toLowerCase() === "accepted").length} icon="bi-check-circle" color="success" />
        </div>
        <div className="col-md-3">
          <SummaryCard 
            title="Avg. Bid" 
            value={formatCurrency(
                proposals.length > 0
                  ? Math.round(
                      proposals.reduce((sum, p) => sum + (p.bidAmount || 0), 0) / proposals.length,
                    )
                  : 0
            )} 
            icon="bi-currency-dollar" 
            color="info" 
          />
        </div>
      </div>

      {/* Proposals List */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-2">Fetching proposals...</p>
        </div>
      )}

      {!loading && error && (
        <div className="text-center py-5 alert alert-danger border-0 shadow-sm">
          <i className="bi bi-exclamation-circle display-4"></i>
          <h4 className="mt-3">Error fetching proposals</h4>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && selectedJobProposals.length === 0 && (
        <div className="text-center py-5 alert alert-info border-0 shadow-sm">
          <i className="bi bi-file-text display-4 text-info"></i>
          <h4 className="mt-3">No proposals found</h4>
          <p className="text-muted">No proposals match your current filters for **{selectedJob?.title || 'this job'}**.</p>
        </div>
      )}

      {!loading && !error && selectedJobProposals.length > 0 && (
        <div className="d-grid gap-3">
          {selectedJobProposals.map((proposal) => (
            <div key={proposal.id} className={`card shadow-sm border-start border-4 ${proposal.status?.toLowerCase() === 'accepted' ? 'border-success' : proposal.status?.toLowerCase() === 'rejected' ? 'border-danger' : 'border-warning'}`}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-8 border-end">
                    <div className="d-flex align-items-start mb-3">
                      <div
                        className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                        style={{ width: "40px", height: "40px" }}
                      >
                        <span className="text-white fw-bold fs-6">
                          {proposal.freelancerName
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <h5 className="mb-1 fw-bold text-dark">{proposal.freelancerName}</h5>
                        <div className="d-flex align-items-center mb-2 small">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            <span className="text-muted fw-semibold">
                              {proposal.freelancerRating || "N/A"} ({proposal.freelancerCompletedJobs || 0} jobs completed)
                            </span>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {proposal.skills?.map((skill) => (
                            <span key={skill} className="badge bg-secondary-subtle text-dark mb-1">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="mb-3 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <p className="text-dark mb-0 small fst-italic">"{proposal.coverLetter || "No cover letter provided."}"</p>
                    </div>
                    <span className={`badge ${getStatusBadge(proposal.status)}`}>
                        <i className={`bi ${getProposalIcon(proposal.status)} me-1`}></i>
                        {proposal.status?.toUpperCase()}
                    </span>
                    <small className="text-muted ms-3">Submitted on **{proposal.submittedAt}**</small>
                  </div>

                  <div className="col-md-4 text-end d-flex flex-column justify-content-between">
                    <div>
                      <h4 className="text-success mb-1 fw-bolder">{formatCurrency(proposal.bidAmount, proposal.proposedCurrency)}</h4>
                      <small className="text-muted d-block mb-3">Delivery: **{proposal.deliveryTime}**</small>
                    </div>
                    
                    <div>
                        {proposal.status?.toLowerCase() === "pending" && (
                            <div className="d-grid gap-2 mb-2">
                                <button
                                className="btn btn-success"
                                onClick={() => handleAcceptProposal(proposal.id)}
                                disabled={processingProposals.has(proposal.id)}
                                >
                                {processingProposals.has(proposal.id) ? (
                                    <>
                                    <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                                    Accepting...
                                    </>
                                ) : (
                                    <>
                                    <i className="bi bi-check-circle me-1"></i>Accept Proposal
                                    </>
                                )}
                                </button>
                                <button
                                className="btn btn-outline-danger"
                                onClick={() => handleRejectProposal(proposal.id)}
                                disabled={processingProposals.has(proposal.id)}
                                >
                                {processingProposals.has(proposal.id) ? (
                                    <>
                                    <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                                    Rejecting...
                                    </>
                                ) : (
                                    <>
                                    <i className="bi bi-x-circle me-1"></i>Reject
                                    </>
                                )}
                                </button>
                            </div>
                        )}
                        {(proposal.status?.toLowerCase() === "accepted" || proposal.status?.toLowerCase() === "rejected") && (
                            <div className={`alert ${proposal.status?.toLowerCase() === 'accepted' ? 'alert-success' : 'alert-danger'} small fw-bold mt-2 py-2`}>
                                <i className="bi bi-info-circle me-1"></i> Status Finalized
                            </div>
                        )}
                        <button className="btn btn-outline-primary btn-sm mt-2 w-100">
                          <i className="bi bi-chat-dots me-1"></i>Message Freelancer
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProposalsManagement

// Helper component for Summary Cards
const SummaryCard = ({ title, value, icon, color }) => (
    <div className="card border-0 shadow-sm h-100">
        <div className="card-body text-center">
            <div className={`display-6 text-${color} mb-2`}>
                <i className={`bi ${icon}`}></i>
            </div>
            <h4 className="h4 mb-1 fw-bold text-dark">{value}</h4>
            <p className="text-muted small mb-0">{title}</p>
        </div>
    </div>
);