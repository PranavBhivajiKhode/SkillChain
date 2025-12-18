"use client"

import { useEffect, useState } from "react"
import {
  getJobDetailsById,
  updateJobStatus,
  uploadFilesForJob,
  uploadFilesForMilestone,
} from "../Api/JobApiService"
import FileUpload from "../FileUpload"

// --- Helper Components (Standardized Color Grading) ---

/**
 * Standardized Status Badge using the Blue-to-Success palette.
 */
function StatusBadge({ status }) {
  const statusMap = {
    IN_PROGRESS: { text: "IN PROGRESS", variant: "primary" },
    MILESTONE_DELIVERED: { text: "DELIVERED", variant: "warning" },
    COMPLETED_WAITING_VERIFICATION: { text: "PENDING VERIFICATION", variant: "info" },
    COMPLETED_VERIFIED: { text: "COMPLETED & VERIFIED", variant: "success" },
    PAUSED: { text: "PAUSED", variant: "secondary" },
  }
  const config = statusMap[status] || { text: status, variant: "dark" }
  return <span className={`badge text-bg-${config.variant} fw-semibold`}>{config.text}</span>
}

/**
 * Formats currency consistently across the dashboard.
 */
function Currency({ amount, currency }) {
  const a = Number.isFinite(Number(amount)) ? Number(amount) : 0
  const c = currency || "USD"
  return <span className="fw-bold text-success">{c} {a.toFixed(2)}</span>
}

/**
 * Displays files with separate lists for Client and Freelancer.
 * Links to the backend GET endpoint: /jobs/files/get/{fileId}
 */
function FilesList({ files, title, emptyMessage = "No files uploaded yet" }) {
  // Base URL for the file download/view API
  const API_BASE_URL = "http://localhost:8100/jobs/files/get"; 

  return (
    <div className="mb-3">
      <h6 className="small text-muted fw-bold text-uppercase mb-2" style={{ letterSpacing: '0.5px' }}>
        {title}
      </h6>
      {(!files || files.length === 0) ? (
        <div className="text-muted small border rounded p-2 bg-white italic">
          {emptyMessage}
        </div>
      ) : (
        <ul className="list-group list-group-flush border rounded shadow-sm bg-white">
          {files.map((f) => (
            <li key={f.fileId} className="list-group-item d-flex justify-content-between align-items-center py-2">
              <div className="text-truncate" style={{ maxWidth: "80%" }}>
                <i className="bi bi-file-earmark-arrow-down text-primary me-2"></i>
                {/* Updated href to match: /jobs/files/get/{fileId}
                   This triggers the ResponseEntity<Resource> in your Controller
                */}
                <a 
                  href={`${API_BASE_URL}/${f.fileId}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-decoration-none text-dark small fw-medium hover-primary"
                >
                  {f.fileName}
                </a>
              </div>
              <span className="badge rounded-pill text-bg-light border text-muted" style={{ fontSize: '0.7rem' }}>
                {(f.fileSize / 1024).toFixed(1)} KB
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Renders a row in the Payment Summary card.
 */
const SummaryRow = ({ title, amount, currency, color = 'text-dark', className = '' }) => (
    <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="small text-muted">{title}</span>
        <span className={`${color} ${className}`}>
            {currency || 'USD'} {Number(amount).toFixed(2)}
        </span>
    </div>
)

// --- Main Component ---

export default function ProjectDetails({ jobId, onBack }) {
  const [p, setP] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch project details on component mount
  useEffect(() => {
    async function fetchProjectDetails() {
      setLoading(true)
      try {
        const response = await getJobDetailsById(jobId) // @GetMapping("/jobs/active-job/{jobId}/details")
        if (response.status === 200) {
          setP(response.data)
        }
      } catch (error) {
        console.error("Error fetching job details:", error)
      } finally {
        setLoading(false)
      }
    }
    if (jobId) fetchProjectDetails()
  }, [jobId])

  // --- Handlers ---

  /**
   * Appends the List<FileEntity> returned from the backend to the specific milestone.
   */
  const handleMilestoneUploadSuccess = (newFiles, milestoneId) => {
    setP(prev => ({
      ...prev,
      milestones: prev.milestones.map(ms => 
        ms.milestoneId === milestoneId 
          ? { ...ms, files: [...(ms.files || []), ...newFiles] } // Append the new list
          : ms
      )
    }))
  }

  /**
   * Appends the List<FileEntity> to the general project files.
   */
  const handleProjectUploadSuccess = (newFiles) => {
    setP(prev => ({
      ...prev,
      files: [...(prev.files || []), ...newFiles]
    }))
  }

  const handleUpdateMilestoneStatus = async (milestoneId, status) => {
    // Optimistic UI update for milestone status
    setP(prev => ({
        ...prev,
        milestones: prev.milestones.map(ms => ms.milestoneId === milestoneId ? { ...ms, status } : ms)
    }))
  }

  const payMilestone = async (m) => {
    if (m.status !== "COMPLETED_VERIFIED" || m.paid) return
    setP(prev => ({
        ...prev,
        milestones: prev.milestones.map(ms => ms.milestoneId === m.milestoneId ? { ...ms, paid: true } : ms)
    }))
  }

  if (loading) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-2 text-muted">Loading project data...</p>
    </div>
  )
  
  if (!p) return <div className="alert alert-danger mx-3">Project details could not be found.</div>

  // --- Financial Calculations ---
  const isAllMilestonesVerifiedAndPaid = (project) => 
    (project.milestones || []).every((m) => m.status === "COMPLETED_VERIFIED" && m.paid)
  
  const totalPaid = (project) => 
    (project.milestones || []).reduce((sum, m) => sum + (m.paid ? Number(m.budgetAmount || 0) : 0), 0)
  
  const totalMilestonesAmount = (project) => 
    (project.milestones || []).reduce((sum, m) => sum + Number(m.budgetAmount || 0), 0)
  
  const remainder = (project) => 
    Math.max(0, Number(project.budget || 0) - totalMilestonesAmount(project))
  
  const isReadyForFinalPayment = isAllMilestonesVerifiedAndPaid(p) && remainder(p) > 0

  return (
    <div className="card shadow-lg border-0 animate__animated animate__fadeIn">
      {/* Header synchronized with Freelancer view */}
      <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between py-3">
        <h5 className="mb-0 fw-bold">
          <i className="bi bi-kanban me-2 text-primary"></i> {p.title}
        </h5>
        <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={onBack}>
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </button>
      </div>

      <div className="card-body bg-light-subtle">
        <div className="row g-4">
          {/* Left Column: Milestones Roadmap */}
          <div className="col-12 col-lg-8 border-end">
            <h4 className="mb-4 text-primary fw-bold"><i className="bi bi-flag-fill me-2"></i> Project Roadmap</h4>
            
            <div className="accordion shadow-sm" id={`milestoneAccordion-${p.jobId}`}>
              {(p.milestones || []).map((m, index) => {
                const canVerify = m.status === "COMPLETED_WAITING_VERIFICATION"
                const canPay = m.status === "COMPLETED_VERIFIED" && !m.paid
                
                // Separate Files by ownerType
                const freelancerFiles = (m.files || []).filter(f => f.ownerType === 'FREELANCER')
                const clientFiles = (m.files || []).filter(f => f.ownerType === 'CLIENT')

                return (
                  <div key={m.milestoneId} className="accordion-item border-0 mb-3 overflow-hidden rounded shadow-sm">
                    <h2 className="accordion-header">
                      <button 
                        className={`accordion-button ${index > 0 ? 'collapsed' : ''} bg-white fw-bold`} 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target={`#collapse${m.milestoneId}`}
                      >
                        <span className="badge bg-primary rounded-pill me-3">{m.orderIndex || index + 1}</span>
                        <span className="flex-grow-1 text-dark">{m.title}</span>
                        <div className="d-flex gap-3 align-items-center me-3">
                          <StatusBadge status={m.status} />
                          {m.paid ? (
                            <span className="badge text-bg-success"><i className="bi bi-check2-circle me-1"></i> PAID</span>
                          ) : (
                            <Currency amount={m.budgetAmount} currency={m.budgetCurrency || p.currency} />
                          )}
                        </div>
                      </button>
                    </h2>
                    
                    <div 
                      id={`collapse${m.milestoneId}`} 
                      className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} 
                      data-bs-parent={`#milestoneAccordion-${p.jobId}`}
                    >
                      <div className="accordion-body bg-white border-top p-4">
                        <p className="text-muted small mb-4">{m.description}</p>
                        
                        <div className="row g-4">
                          {/* Freelancer Deliverables Section */}
                          <div className="col-md-6 border-end">
                            <FilesList 
                              title="Freelancer Deliverables" 
                              files={freelancerFiles} 
                              emptyMessage="Waiting for freelancer to upload deliverables."
                            />
                            
                            <div className="mt-4 d-grid gap-2">
                              {canVerify && (
                                <button className="btn btn-warning fw-bold shadow-sm" onClick={() => handleUpdateMilestoneStatus(m.milestoneId, "COMPLETED_VERIFIED")}>
                                  <i className="bi bi-patch-check me-2"></i>Verify & Approve
                                </button>
                              )}
                              {canPay && (
                                <button className="btn btn-success fw-bold shadow-sm" onClick={() => payMilestone(m)}>
                                  <i className="bi bi-wallet2 me-2"></i>Pay Milestone
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Client Upload Section */}
                          <div className="col-md-6">
                            <FilesList 
                              title="Your Milestone Uploads" 
                              files={clientFiles} 
                              emptyMessage="No files uploaded for this milestone."
                            />
                            
                            <div className="mt-3 p-3 bg-light rounded border border-dashed text-center">
                              <p className="small text-muted mb-2 fw-bold">Upload assets or documentation</p>
                              <FileUpload 
                                onUploadSuccess={(files) => handleMilestoneUploadSuccess(files, m.milestoneId)}
                                uploadType="MILESTONE"
                                entityId={m.milestoneId}
                                userType="CLIENT"
                                maxFiles={5} 
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Financial Summary */}
          <div className="col-12 col-lg-4">
            <div className="card mb-4 shadow-sm border-0 sticky-top" style={{ top: '15px' }}>
              <div className="card-header bg-primary text-white py-3 text-center">
                <h6 className="mb-0 fw-bold">PAYMENT SUMMARY</h6>
              </div>
              <div className="card-body p-4">
                <SummaryRow title="Total Project Budget" amount={p.budget} currency={p.currency} className="fw-bold" />
                <SummaryRow title="Milestones Combined" amount={totalMilestonesAmount(p)} currency={p.currency} />
                <SummaryRow title="Successfully Paid" amount={totalPaid(p)} currency={p.currency} color="text-success" />
                <hr className="my-3 opacity-25" />
                <SummaryRow title="Remaining Balance" amount={remainder(p)} currency={p.currency} color="text-danger fw-bolder fs-5" />
                
                <div className="d-grid mt-4">
                  <button className="btn btn-success btn-lg fw-bold shadow-sm" disabled={!isReadyForFinalPayment}>
                    <i className="bi bi-award me-2"></i>Pay Final Remainder
                  </button>
                  {!isReadyForFinalPayment && (
                    <div className="alert alert-info py-2 small mt-3 mb-0 text-center border-0 shadow-sm">
                      <i className="bi bi-info-circle me-2"></i> 
                      Verify and pay all milestones to unlock final payment.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* General Project Files */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-bottom py-3">
                <h6 className="mb-0 fw-bold text-dark"><i className="bi bi-folder2-open me-2 text-primary"></i> General Project Files</h6>
              </div>
              <div className="card-body">
                <FilesList 
                  title="Shared Assets" 
                  files={(p.files || []).filter(f => f.associationType === 'JOB')} 
                />
                <div className="mt-3">
                  <FileUpload 
                    onUploadSuccess={handleProjectUploadSuccess}
                    uploadType="JOB"
                    entityId={p.jobId}
                    userType="CLIENT"
                    maxFiles={10} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}