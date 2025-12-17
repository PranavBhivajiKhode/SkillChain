"use client"

import { useEffect, useState } from "react"
import ProposalDetailsView from "./ProposalDetailsView"
import ProposalSubmissionForm from "./ProposalSubmissionForm"
import { fetchAllProposalsForFreelancer } from "../Api/ProposalApiService"
import { useAuth } from "../security/AuthContext"

export default function MyProposals() {
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [filterStatus, setFilterStatus] = useState("ALL")
  const [currentView, setCurrentView] = useState("list") // list, details, edit
  const [editingProposal, setEditingProposal] = useState(null)
  const [proposals, setProposals] = useState([])
  const [loading, setLoading] = useState(true)

  const authContext = useAuth()

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true)
        // NOTE: In a real app, authContext.userID needs to be correctly populated.
        const response = await fetchAllProposalsForFreelancer(authContext.userID || "mock-user-id") 
        if (response.status === 200) {
          console.log("Fetched proposals for freelancer successfully!")
          // Assuming response.data is an array of proposal objects.
          // Applying mock data temporarily if API returns empty for testing visibility:
          const fetchedProposals = response.data.length > 0 ? response.data : [
                { bidId: "p-1", jobId: "job-1", jobTitle: "E-commerce Dev", clientName: "TechCorp Inc.", proposedAmount: 4500, proposedCurrency: "USD", proposedTimelineDays: 30, status: "PENDING", createdAt: "2024-01-21T10:00:00Z", updatedAt: "2024-01-21T10:00:00Z", proposalText: "My proposal text for p-1" },
                { bidId: "p-2", jobId: "job-2", jobTitle: "Mobile App UI/UX", clientName: "FitLife Solutions", proposedAmount: 2800, proposedCurrency: "USD", proposedTimelineDays: 20, status: "ACCEPTED", createdAt: "2024-01-15T10:00:00Z", updatedAt: "2024-01-16T10:00:00Z", proposalText: "My proposal text for p-2" },
                { bidId: "p-3", jobId: "job-1", jobTitle: "E-commerce Dev", clientName: "TechCorp Inc.", proposedAmount: 5500, proposedCurrency: "USD", proposedTimelineDays: 45, status: "REJECTED", createdAt: "2024-01-10T10:00:00Z", updatedAt: "2024-01-10T10:00:00Z", proposalText: "My proposal text for p-3" },
          ]
          setProposals(fetchedProposals)
        } else {
          console.log("Response is not 200")
        }
      } catch (error) {
        console.log("Exception in API service:", error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProposals()
  }, [authContext.userID])

  const mockJobs = {
    "job-1": {
      jobId: "job-1",
      title: "E-commerce Website Development",
      description: "Build a modern e-commerce platform with React and Node.js",
      budgetAmount: 5000,
      budgetCurrency: "USD",
      deadlineDate: "2024-03-15T00:00:00Z",
      jobType: "FIXED",
      requiredSkills: ["React", "Node.js", "MongoDB", "Payment Integration"],
      status: "OPEN",
      totalProposals: 12,
      totalViews: 45,
      createdAt: "2024-01-10T00:00:00Z",
      milestones: [],
    },
    "job-2": {
      jobId: "job-2",
      title: "Mobile App UI/UX Design",
      description: "Design intuitive UI/UX for fitness mobile application",
      budgetAmount: 3000,
      budgetCurrency: "USD",
      deadlineDate: "2024-02-28T00:00:00Z",
      jobType: "FIXED",
      requiredSkills: ["UI/UX", "Figma", "Mobile Design", "Prototyping"],
      status: "IN_PROGRESS",
      totalProposals: 8,
      totalViews: 32,
      createdAt: "2024-01-05T00:00:00Z",
      milestones: [],
    },
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

  const filteredProposals = filterStatus === "ALL" ? proposals : proposals.filter((p) => p.status === filterStatus)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getProposalStats = () => {
    const total = proposals.length
    const pending = proposals.filter((p) => p.status === "PENDING").length
    const accepted = proposals.filter((p) => p.status === "ACCEPTED").length
    const rejected = proposals.filter((p) => p.status === "REJECTED").length
    const successRate = total > 0 ? ((accepted / total) * 100).toFixed(1) : 0

    return { total, pending, accepted, rejected, successRate }
  }

  const stats = getProposalStats()

  const handleViewDetails = (proposal) => {
    setSelectedProposal(proposal)
    setCurrentView("details")
  }

  const handleEditProposal = (proposal) => {
    setEditingProposal(proposal)
    setCurrentView("edit")
  }

  const handleBackToList = () => {
    setCurrentView("list")
    setSelectedProposal(null)
    setEditingProposal(null)
  }

  const handleConfirmEdit = (updatedProposal) => {
    console.log("Proposal updated:", updatedProposal)
    // In a real app, update the proposals state array here
    alert("Proposal updated successfully!")
    setCurrentView("list")
    setEditingProposal(null)
  }

  if (currentView === "details" && selectedProposal) {
    return (
      <ProposalDetailsView
        selectedProposal={selectedProposal}
        onBack={handleBackToList}
        onEditProposal={handleEditProposal}
      />
    )
  }

  if (currentView === "edit" && editingProposal) {
    // This part has a dependency on mockJobs, which is fine for UI demo
    const job = mockJobs[editingProposal.jobId] || { title: "Job Details Unavailable", requiredSkills: [] }
    return (
      <ProposalSubmissionForm
        job={job}
        proposal={editingProposal}
        isEditing={true}
        onBack={handleBackToList}
        onSubmit={handleConfirmEdit}
      />
    )
  }

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading your proposals...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <h3 className="mb-4 text-dark"><i className="bi bi-file-text me-2 text-warning"></i> My Proposals</h3>

      {/* Stats Cards - Enhanced Styling */}
      <div className="row mb-4">
        <div className="col-md-3">
          <StatCard title="Total Proposals" value={stats.total} icon="bi-file-earmark-text" color="dark" />
        </div>
        <div className="col-md-3">
          <StatCard title="Pending" value={stats.pending} icon="bi-clock" color="warning" />
        </div>
        <div className="col-md-3">
          <StatCard title="Accepted" value={stats.accepted} icon="bi-check-circle" color="success" />
        </div>
        <div className="col-md-3">
          <StatCard title="Success Rate" value={`${stats.successRate}%`} icon="bi-graph-up" color="primary" />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="bi bi-list-check me-2"></i>
                Proposal List
              </h5>
              <div className="d-flex gap-2">
                <select
                  className="form-select form-select-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ width: "auto" }}
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>
            <div className="card-body p-0">
              {filteredProposals.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-file-earmark-x fs-1 text-muted"></i>
                  <h5 className="text-muted mt-3">No proposals found</h5>
                  <p className="text-muted">
                    {filterStatus === "ALL"
                      ? "You haven't submitted any proposals yet."
                      : `No proposals with status: ${filterStatus}`}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Job Title & ID</th>
                        <th>Client</th>
                        <th>Amount</th>
                        <th>Timeline</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProposals.map((proposal) => (
                        <tr key={proposal.bidId}>
                          <td>
                            <div>
                              <strong className="text-primary">{proposal.jobTitle}</strong>
                              <br />
                              <small className="text-muted font-monospace">#{proposal.jobId}</small>
                            </div>
                          </td>
                          <td className="fw-semibold">{proposal.clientName}</td>
                          <td className="text-success fw-bold">
                            {proposal.proposedCurrency} {proposal.proposedAmount.toLocaleString()}
                          </td>
                          <td>{proposal.proposedTimelineDays} days</td>
                          <td>{getStatusBadge(proposal.status)}</td>
                          <td>
                            <small className="text-muted">{formatDate(proposal.createdAt)}</small>
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-dark me-1"
                              onClick={() => handleViewDetails(proposal)}
                              title="View Details"
                            >
                              <i className="bi bi-eye"></i>
                            </button>
                            {proposal.status === "PENDING" && (
                              <button
                                className="btn btn-sm btn-outline-warning text-dark"
                                onClick={() => handleEditProposal(proposal)}
                                title="Edit Proposal"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for Stat Cards
const StatCard = ({ title, value, icon, color }) => (
    <div className={`card text-white bg-${color} shadow-sm border-0 h-100`}>
        <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h4 className="mb-0 fw-bold">{value}</h4>
                    <p className="mb-0 small">{title}</p>
                </div>
                <i className={`bi ${icon} fs-1 opacity-50`}></i>
            </div>
        </div>
    </div>
);