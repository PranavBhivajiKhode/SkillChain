"use client"

import { useEffect, useState } from "react"
import { 
  getJobDetailsById, 
  uploadFilesForJob, 
  uploadFilesForMilestone 
} from "../Api/JobApiService"
import FileUpload from "../FileUpload"

// --- Helper Components (Standardized Styling) ---

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

function Currency({ amount, currency }) {
  const a = Number.isFinite(Number(amount)) ? Number(amount) : 0
  const c = currency || "USD"
  return <span className="fw-bold text-success">{c} {a.toFixed(2)}</span>
}

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

// --- Main Component ---

export default function FreelancerProjectDetails({ jobId, onBack }) {
  const [p, setP] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjectDetails() {
      setLoading(true)
      try {
        const response = await getJobDetailsById(jobId)
        if (response.status === 200) setP(response.data)
      } catch (error) {
        console.error("Error fetching job details:", error)
      } finally {
        setLoading(false)
      }
    }
    if (jobId) fetchProjectDetails()
  }, [jobId])

  // --- Handlers ---

  const handleMilestoneUploadSuccess = (newFiles, milestoneId) => {
    setP(prev => ({
      ...prev,
      milestones: prev.milestones.map(ms => 
        ms.milestoneId === milestoneId 
          ? { ...ms, files: [...(ms.files || []), ...newFiles] } 
          : ms
      )
    }))
  }

  const handleUpdateMilestoneStatus = async (milestoneId, status) => {
    setP(prev => ({
        ...prev,
        milestones: prev.milestones.map(ms => ms.milestoneId === milestoneId ? { ...ms, status } : ms)
    }))
  }

  const areAllMilestonesDelivered = (project) => 
    (project.milestones || []).length > 0 && 
    (project.milestones || []).every(m => ["MILESTONE_DELIVERED", "COMPLETED_WAITING_VERIFICATION", "COMPLETED_VERIFIED"].includes(m.status))

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
  if (!p) return <div className="alert alert-danger mx-3 mt-3">Project not found.</div>

  return (
    <div className="card shadow-lg border-0">
      <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between py-3">
        <h5 className="mb-0 fw-bold"><i className="bi bi-kanban me-2 text-primary"></i> {p.title}</h5>
        <button className="btn btn-outline-light btn-sm rounded-pill px-3" onClick={onBack}>
          <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
        </button>
      </div>

      <div className="card-body bg-light-subtle">
        <div className="row g-4">
          <div className="col-12 col-lg-8 border-end">
            <h4 className="mb-4 text-primary fw-bold"><i className="bi bi-flag-fill me-2"></i> Deliverables Roadmap</h4>
            
            <div className="accordion shadow-sm" id="milestoneAccordion">
                {(p.milestones || []).map((m, index) => {
                    const isCompleted = ["COMPLETED_WAITING_VERIFICATION", "COMPLETED_VERIFIED"].includes(m.status);
                    const freelancerFiles = (m.files || []).filter(f => f.ownerType === 'FREELANCER')
                    const clientFiles = (m.files || []).filter(f => f.ownerType === 'CLIENT')

                    return (
                        <div key={m.milestoneId} className="accordion-item border-0 mb-3 overflow-hidden rounded shadow-sm">
                            <h2 className="accordion-header">
                                <button className={`accordion-button ${index > 0 ? 'collapsed' : ''} bg-white fw-bold`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${m.milestoneId}`}>
                                    <span className="badge bg-primary rounded-pill me-3">{index + 1}</span>
                                    <span className="flex-grow-1 text-dark">{m.title}</span>
                                    <div className="d-flex gap-2 align-items-center me-3">
                                        <StatusBadge status={m.status} />
                                        <Currency amount={m.budgetAmount} currency={m.budgetCurrency || p.currency} />
                                    </div>
                                </button>
                            </h2>
                            <div id={`collapse${m.milestoneId}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} data-bs-parent="#milestoneAccordion">
                                <div className="accordion-body bg-white border-top p-4">
                                    <p className="text-muted small mb-4">{m.description}</p>
                                    <div className="row g-4">
                                        {/* Left Column: Progress & Client Assets */}
                                        <div className="col-md-6 border-end">
                                            <label className="form-label small fw-bold text-uppercase text-muted">Update Status</label>
                                            <select className="form-select form-select-sm mb-3 border-primary" value={m.status} onChange={(e) => handleUpdateMilestoneStatus(m.milestoneId, e.target.value)}>
                                                <option value="NOT_STARTED">Not Started</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="MILESTONE_DELIVERED">Ready for Review (Deliver)</option>
                                                <option value="COMPLETED_VERIFIED" disabled>Completed & Paid (Client Only)</option>
                                            </select>
                                            
                                            <FilesList title="Client Requirements" files={clientFiles} emptyMessage="No files from client." />
                                        </div>

                                        {/* Right Column: Freelancer Uploads */}
                                        <div className="col-md-6">
                                            <FilesList title="Your Deliverables" files={freelancerFiles} emptyMessage="Upload your work here." />
                                            
                                            <div className="mt-3 p-3 bg-light rounded border border-dashed text-center">
                                                <p className="small text-muted mb-2 fw-bold">Submit files for review</p>
                                                <FileUpload 
                                                  onUploadSuccess={(files) => handleMilestoneUploadSuccess(files, m.milestoneId)} 
                                                  uploadType="MILESTONE" 
                                                  entityId={m.milestoneId} 
                                                  userType="FREELANCER" 
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

          {/* Right Column: Project Sidebar */}
          <div className="col-12 col-lg-4">
            <div className="card border-0 shadow-sm sticky-top" style={{ top: '15px' }}>
                <div className="card-header bg-primary text-white py-3 text-center">
                    <h6 className="mb-0 fw-bold"><i className="bi bi-cloud-arrow-up me-2"></i> Project Submission</h6>
                </div>
                <div className="card-body p-4">
                    <div className="mb-4 text-center">
                        <label className="small text-muted d-block text-uppercase fw-bold">Earnings Potential</label>
                        <span className="h3 fw-bold text-success">{p.currency} {p.budget}</span>
                    </div>

                    <button 
                        className="btn btn-primary btn-lg fw-bold w-100 mb-3 shadow" 
                        onClick={() => {}} 
                        disabled={!areAllMilestonesDelivered(p) || p.status === "COMPLETED_WAITING_VERIFICATION"}
                    >
                        Mark Project as Complete
                    </button>
                    
                    {!areAllMilestonesDelivered(p) && (
                      <div className="alert alert-info py-2 small mb-4 border-0 shadow-sm">
                        <i className="bi bi-info-circle me-1"></i> Deliver all milestones to finalize project.
                      </div>
                    )}
                    
                    <hr className="my-4 opacity-25" />
                    
                    <FilesList title="General Assets" files={(p.files || []).filter(f => f.associationType === 'JOB')} />
                    
                    <div className="mt-3">
                        <FileUpload 
                          onUploadSuccess={(files) => setP(prev => ({...prev, files: [...(prev.files || []), ...files]}))}
                          uploadType="JOB" 
                          entityId={p.jobId} 
                          userType="FREELANCER" 
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