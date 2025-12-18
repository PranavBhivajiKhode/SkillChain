"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../security/AuthContext"
import { inProgressJobRetrievalForFreelancer } from "../Api/JobApiService"
import FreelancerProjectDetails from "./FreelancerProjectDetails"

function StatusBadge({ status }) {
  const statusMap = {
    NOT_STARTED: { text: "NOT STARTED", variant: "secondary" },
    IN_PROGRESS: { text: "IN PROGRESS", variant: "primary" },
    MILESTONE_DELIVERED: { text: "DELIVERED", variant: "info" },
    COMPLETED_WAITING_VERIFICATION: { text: "PENDING VERIFICATION", variant: "warning" },
    COMPLETED_VERIFIED: { text: "COMPLETED & PAID", variant: "success" },
  }
  const config = statusMap[status] || { text: status, variant: "primary" }
  return <span className={`badge text-bg-${config.variant} fw-semibold`}>{config.text}</span>
}

export default function FreelancerActiveProjects() {
  const [projects, setProjects] = useState([])
  const [selectedJobId, setSelectedJobId] = useState(null)
  const [loading, setLoading] = useState(true)
  const authContext = useAuth()

  useEffect(() => {
    if (!authContext?.userID) return
    async function retrieveAllActivejobs() {
      setLoading(true)
      try {
        const response = await inProgressJobRetrievalForFreelancer(authContext.userID)
        if (response.status === 200) setProjects(response.data)
      } catch (error) {
        console.error("Fetch Error:", error)
      } finally {
        setLoading(false)
      }
    }
    retrieveAllActivejobs()
  }, [authContext.userID])

  if (selectedJobId) {
    return <FreelancerProjectDetails jobId={selectedJobId} onBack={() => setSelectedJobId(null)} />
  }

  return (
    <div className="container-fluid p-0">
      <div className="d-flex align-items-center justify-content-between mb-4">
          <h3 className="fw-bold text-dark mb-0">
            <i className="bi bi-kanban me-2 text-primary"></i> 
            Active Workspaces ({projects.length})
          </h3>
      </div>

      <div className="row g-4">
        {loading ? (
          <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
        ) : projects.length === 0 ? (
          <div className="col-12"><div className="alert alert-info text-center border-0 shadow-sm py-5">No projects assigned yet.</div></div>
        ) : (
          projects.map((p) => (
            <div key={p.jobId} className="col-12 col-md-6">
              <div className="card h-100 shadow-sm border-0 border-start border-4 border-primary transition-all">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold text-dark mb-0">{p.title}</h5>
                    <span className="fw-bold text-success">{p.currency || "USD"} {p.budget || p.budgetAmount}</span>
                  </div>
                  <p className="text-muted small text-truncate-2 mb-3">{p.description}</p>
                  <div className="d-flex align-items-center justify-content-between">
                    <StatusBadge status={p.status} />
                    <button className="btn btn-primary btn-sm px-4 rounded-pill shadow-sm" onClick={() => setSelectedJobId(p.jobId)}>
                      Manage Workspace <i className="bi bi-chevron-right ms-1"></i>
                    </button>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0 small text-muted d-flex justify-content-between">
                  <span><i className="bi bi-person me-1"></i> {p.clientName || "Client"}</span>
                  <span><i className="bi bi-calendar-event me-1"></i> {new Date(p.deadlineDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}