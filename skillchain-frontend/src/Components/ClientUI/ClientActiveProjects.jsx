"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../security/AuthContext"
import {
  inProgressAndCompletedJobRetrievalForClient,
  updateJobStatus,
  uploadFilesForJob,
  uploadFilesForMilestone,
} from "../Api/JobApiService"
import FileUpload from "../FileUpload"

// --- Helper Components (Styling Refresh) ---

function StatusBadge({ status }) {
  const statusMap = {
    IN_PROGRESS: { text: "IN PROGRESS", variant: "primary" },
    MILESTONE_DELIVERED: { text: "DELIVERED", variant: "warning" }, // New status for freelancer submission
    COMPLETED_WAITING_VERIFICATION: { text: "PENDING VERIFICATION", variant: "info" },
    COMPLETED_VERIFIED: { text: "COMPLETED & VERIFIED", variant: "success" },
    PAUSED: { text: "PAUSED", variant: "secondary" },
    // Use IN_PROGRESS as default if not found
  }
  const config = statusMap[status] || statusMap.IN_PROGRESS 

  return <span className={`badge text-bg-${config.variant} fw-semibold`}>{config.text}</span>
}

function Currency({ amount, currency }) {
  const a = Number.isFinite(Number(amount)) ? Number(amount) : 0
  const c = currency || "USD" // Default currency
  return (
    <span className="fw-bold text-success">
      {c} {a.toFixed(2)}
    </span>
  )
}

function FilesList({ files }) {
  if (!files || files.length === 0) return <div className="text-muted small">No files uploaded yet</div>
  return (
    <ul className="list-unstyled small mb-1 p-2 border rounded bg-white">
      {(files || []).map((f, i) => (
        <li key={f.id || i} className="d-flex justify-content-between align-items-center border-bottom py-1">
          <a href={f.url || '#'} target="_blank" rel="noopener noreferrer" className="text-truncate text-decoration-none text-dark" style={{ maxWidth: 200 }}>
            <i className="bi bi-file-earmark me-1 text-primary"></i> {f.fileName || f.name || `File-${i + 1}`}
          </a>
          <span className="badge text-bg-light fw-normal">
            {f.userType === "CLIENT" ? "Client" : "Freelancer"}
          </span>
        </li>
      ))}
    </ul>
  )
}

function ProjectHeader({ project, onBack }) {
  return (
    <div className="card-header bg-dark text-white d-flex align-items-center justify-content-between">
      <h5 className="mb-0">
        <i className="bi bi-kanban me-2"></i> {project.title}
      </h5>
      <button className="btn btn-outline-light btn-sm" onClick={onBack}>
        <i className="bi bi-arrow-left me-1"></i> Back to List
      </button>
    </div>
  )
}

// --- Main Component Logic ---

export default function ClientActiveProjects() {
  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const authContext = useAuth()

  // --- Utility Calculations ---
  const totalPaid = (p) => (p.milestones || []).reduce((sum, m) => sum + (m.paid ? Number(m.amount || 0) : 0), 0)
  const totalMilestonesAmount = (p) => (p.milestones || []).reduce((sum, m) => sum + Number(m.amount || 0), 0)
  const remainder = (p) => Math.max(0, Number(p.budgetAmount || 0) - totalMilestonesAmount(p))
  const isAllMilestonesVerifiedAndPaid = (p) => (p.milestones || []).every((m) => m.status === "COMPLETED_VERIFIED" && m.paid)

  // --- Data Fetching ---
  useEffect(() => {
    if (!authContext?.userID) return;
    
    async function inProgressAndCompletedProjectsFetching() {
      setLoading(true);
      try {
        // API Call: Fetch active and completed jobs for this client
        const response = await inProgressAndCompletedJobRetrievalForClient(authContext.userID)

        if (response.status === 200) {
          console.log("inProgress job is fetched successfully!")
          setProjects(response.data)
        } else {
          console.log("Status is not 200. But there is no exception from api")
        }
      } catch (error) {
        console.log("Exception from api service!")
      } finally {
          setLoading(false);
      }
    }
    inProgressAndCompletedProjectsFetching()
  }, [authContext.userID])

  const selectProject = (p) => setSelected(p)
  const goBack = () => setSelected(null)

  // --- API Handlers (Simplified for UI Update) ---

  const updateProjectState = (jobId, updateFn) => {
    setProjects(prev => {
        const updatedProjects = prev.map(proj => 
            proj.jobId === jobId ? updateFn(proj) : proj
        );
        // Update selected view if it's the one that changed
        if (selected && selected.jobId === jobId) {
            setSelected(updateFn(selected));
        }
        return updatedProjects;
    });
  };

  const setProjectStatus = async (p, status) => {
    // Optimistic UI Update
    const originalStatus = p.status;
    updateProjectState(p.jobId, proj => ({ ...proj, status }));

    // API Call: Update project status
    try {
        const response = await updateJobStatus(p.jobId, status); //
        if (response.status === 200) {
            console.log(`Project status updated to ${status} successfully!`);
        } else {
            console.error("API failed to update status, reverting UI.");
            updateProjectState(p.jobId, proj => ({ ...proj, status: originalStatus }));
        }
    } catch (error) {
        console.error("Exception during status update, reverting UI:", error);
        updateProjectState(p.jobId, proj => ({ ...proj, status: originalStatus }));
    }
  };

  const handleUpdateMilestoneStatus = async (jobId, milestoneId, status) => {
    // Optimistic UI Update
    updateProjectState(jobId, proj => ({
        ...proj,
        milestones: proj.milestones.map(ms => ms.id === milestoneId ? { ...ms, status } : ms)
    }));
    
    // API Call Placeholder: Update milestone status
    // NOTE: This requires a dedicated API, e.g., PUT /api/jobs/{jobId}/milestones/{milestoneId}/status
    // try { await updateMilestoneStatusApi(jobId, milestoneId, status); } catch (e) { console.error("Milestone status update failed"); }
  }

  const payMilestone = async (p, m) => {
    if (m.status !== "COMPLETED_VERIFIED" || m.paid) return

    // API Call Placeholder: Payment API (simulating success)
    console.log(`Simulating payment for Milestone ${m.title}`);

    // Update state after simulated payment success
    updateProjectState(p.jobId, proj => ({
        ...proj,
        milestones: proj.milestones.map(ms => ms.id === m.id ? { ...ms, paid: true } : ms)
    }));
  }

  const payRemainder = async (p) => {
    if (!isAllMilestonesVerifiedAndPaid(p) || remainder(p) <= 0) return

    // API Call Placeholder: Final Payment API (simulating success)
    console.log(`Simulating final payment for Project ${p.title}`);
    
    // Update state after simulated payment success
    setProjectStatus(p, "COMPLETED_VERIFIED");
  }

  // --- File Upload Handlers (Integration with FileUpload.jsx) ---
  
  const handleUploadProjectFiles = async (formData, uploadType) => {
    try {
      // API Call: Upload files for the job
      const response = await uploadFilesForJob(formData); //
      const jobId = formData.get("entityId");

      if (response.status === 200) {
        console.log("Project files upload successful:", response.data);

        // Update state with new files returned by API
        updateProjectState(jobId, proj => ({
            ...proj,
            files: [...(proj.files || []), ...response.data],
        }));

        return response.data;
      }
      throw new Error("Upload failed on server.");
    } catch (error) {
      console.error("Error uploading files:", error);
      throw new Error("File upload failed. Please try again.");
    }
  }

  const handleUploadMilestoneFiles = async (formData, uploadType) => {
    try {
      // API Call: Upload files for the milestone
      const response = await uploadFilesForMilestone(formData); //
      const milestoneId = formData.get("entityId");
      const jobId = projects.find(p => p.milestones?.some(m => m.id === milestoneId))?.jobId; // Find parent job ID

      if (response.status === 200 && jobId) {
        console.log("Milestone files upload successful:", response.data);

        // Update state with new files returned by API
        updateProjectState(jobId, proj => ({
            ...proj,
            milestones: (proj.milestones || []).map(ms =>
                ms.id === milestoneId ? { ...ms, files: [...(ms.files || []), ...response.data] } : ms
            ),
        }));

        return response.data;
      }
      throw new Error("Upload failed on server.");
    } catch (error) {
      console.error("Error uploading milestone files:", error);
      throw new Error("Milestone file upload failed. Please try again.");
    }
  }


  // --- Sub-View Renderers ---

  const ProjectList = () => (
    <div className="row g-3">
        {loading ? (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3 text-muted">Loading active projects...</p>
            </div>
        ) : (
            (projects || []).length === 0 ? (
                <div className="alert alert-info border-0 shadow-sm text-center">
                    <i className="bi bi-info-circle display-4"></i>
                    <h5 className="mt-3">No Active Projects</h5>
                    <p>When you hire a freelancer, the project will appear here for management.</p>
                </div>
            ) : (
                (projects || []).map((p) => (
                    <div key={p.jobId} className="col-12 col-md-6">
                        <div className="card h-100 shadow-sm border-start border-4 border-primary">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h5 className="card-title mb-1 fw-bold text-dark">{p.title}</h5>
                                        <p className="text-muted small mb-2 text-truncate" style={{ maxWidth: 300 }}>{p.description}</p>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <StatusBadge status={p.status || "IN_PROGRESS"} />
                                            <span className="small">
                                                Budget: <Currency amount={p.budgetAmount} currency={p.budgetCurrency} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-2 shadow-sm" onClick={() => selectProject(p)}>
                                    <i className="bi bi-eye me-1"></i> View Details
                                </button>
                            </div>
                            <div className="card-footer bg-light small text-muted">
                                Assigned Freelancer: **{p.freelancerName || p.assignedFreelancerId || "N/A"}**
                            </div>
                        </div>
                    </div>
                ))
            )
        )}
    </div>
  )

  const ProjectDetails = ({ p }) => {
    const isReadyForFinalPayment = isAllMilestonesVerifiedAndPaid(p) && remainder(p) > 0;
    
    return (
        <div className="card shadow-lg border-0">
            <ProjectHeader project={p} onBack={goBack} />

            <div className="card-body">
                <div className="row g-4">
                    <div className="col-12 col-lg-8 border-end">
                        {/* Milestone List */}
                        <h4 className="mb-3 text-primary"><i className="bi bi-flag-fill me-2"></i> Project Milestones</h4>
                        <div className="accordion" id={`milestoneAccordion-${p.jobId}`}>
                            {(p.milestones || []).map((m, index) => {
                                const isMilestoneCompleted = m.status === "MILESTONE_DELIVERED" || m.status === "COMPLETED_WAITING_VERIFICATION";
                                const canVerify = m.status === "COMPLETED_WAITING_VERIFICATION";
                                const canPay = m.status === "COMPLETED_VERIFIED" && !m.paid;
                                return (
                                    <div key={m.id} className="accordion-item shadow-sm mb-3">
                                        <h2 className="accordion-header" id={`heading${m.id}`}>
                                            <button 
                                                className={`accordion-button ${index > 0 ? 'collapsed' : ''}`} 
                                                type="button" 
                                                data-bs-toggle="collapse" 
                                                data-bs-target={`#collapse${m.id}`} 
                                                aria-expanded={index === 0} 
                                                aria-controls={`collapse${m.id}`}
                                            >
                                                <span className="fw-bold me-3">#{m.orderIndex || index + 1}</span>
                                                <span className="flex-grow-1">{m.title}</span>
                                                <div className="d-flex gap-2 align-items-center">
                                                    <StatusBadge status={m.status} />
                                                    {m.paid && <span className="badge text-bg-success"><i className="bi bi-wallet2 me-1"></i> PAID</span>}
                                                    {!m.paid && <span className="text-success ms-3"><Currency amount={m.amount} currency={m.currency || p.budgetCurrency} /></span>}
                                                </div>
                                            </button>
                                        </h2>
                                        <div id={`collapse${m.id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${m.id}`} data-bs-parent={`#milestoneAccordion-${p.jobId}`}>
                                            <div className="accordion-body bg-light-subtle">
                                                <p className="small text-muted mb-3">{m.description}</p>
                                                
                                                <div className="row">
                                                    {/* Verification & Action Column */}
                                                    <div className="col-md-6 border-end">
                                                        <h6 className="small text-dark fw-bold mb-2">Freelancer Deliverables ({m.files?.filter(f => f.userType !== 'CLIENT').length || 0})</h6>
                                                        <FilesList files={m.files?.filter(f => f.userType === 'FREELANCER')} />
                                                        
                                                        <div className="mt-3 d-grid gap-2">
                                                            {canVerify && (
                                                                <button 
                                                                    className="btn btn-warning" 
                                                                    onClick={() => handleUpdateMilestoneStatus(p.jobId, m.id, "COMPLETED_VERIFIED")}
                                                                >
                                                                    <i className="bi bi-check-circle me-1"></i> Verify & Approve
                                                                </button>
                                                            )}
                                                            {canPay && (
                                                                <button
                                                                    className="btn btn-success"
                                                                    onClick={() => payMilestone(p, m)}
                                                                >
                                                                    <i className="bi bi-wallet2 me-1"></i> Pay Milestone
                                                                </button>
                                                            )}
                                                            {m.status === "COMPLETED_VERIFIED" && !m.paid && (
                                                                 <div className="alert alert-warning py-2 small fw-bold mb-0">Payment Due</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Client Upload Column */}
                                                    <div className="col-md-6">
                                                        <h6 className="small text-dark fw-bold mb-2">Client Uploads</h6>
                                                        <FilesList files={m.files?.filter(f => f.userType === 'CLIENT')} />
                                                        <div className="mt-3">
                                                            <FileUpload
                                                                onUpload={handleUploadMilestoneFiles}
                                                                uploadType="milestone"
                                                                entityId={m.id}
                                                                userType="CLIENT"
                                                                maxFiles={5}
                                                                maxFileSize={5 * 1024 * 1024} // 5MB 
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

                    {/* Right Column: Summary and Final Actions */}
                    <div className="col-12 col-lg-4">
                        {/* Payment Summary */}
                        <div className="card mb-3 shadow-sm border-0 sticky-top" style={{ top: '15px' }}>
                            <div className="card-header bg-primary text-white">
                                <strong><i className="bi bi-cash-stack me-1"></i> Payment Summary</strong>
                            </div>
                            <div className="card-body">
                                <SummaryRow title="Total Budget" amount={p.budgetAmount} currency={p.budgetCurrency} className="fw-bold" />
                                <SummaryRow title="Milestones Sum" amount={totalMilestonesAmount(p)} currency={p.budgetCurrency} />
                                <SummaryRow title="Paid to Date" amount={totalPaid(p)} currency={p.budgetCurrency} color="text-success" />
                                <hr />
                                <SummaryRow title="Remainder Due" amount={remainder(p)} currency={p.budgetCurrency} color="text-danger fw-bolder fs-5" />
                                
                                <div className="d-grid mt-3 pt-3 border-top">
                                    <button
                                        className="btn btn-success btn-lg"
                                        disabled={!isReadyForFinalPayment}
                                        onClick={() => payRemainder(p)}
                                    >
                                        <i className="bi bi-award me-1"></i>
                                        Pay Final Remainder & Close
                                    </button>
                                    {!isReadyForFinalPayment && (
                                        <div className="alert alert-info py-2 small mt-2 mb-0">
                                            Verify and pay all milestones first to enable final payment.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Project Files */}
                        <div className="card mb-3 shadow-sm border-0">
                            <div className="card-header bg-light">
                                <strong><i className="bi bi-folder-fill me-1"></i> Project Files</strong>
                            </div>
                            <div className="card-body">
                                <FilesList files={p.files || []} />
                                <div className="mt-3">
                                    <FileUpload
                                        onUpload={handleUploadProjectFiles}
                                        uploadType="job"
                                        entityId={p.jobId}
                                        userType="CLIENT"
                                        maxFiles={10}
                                        maxFileSize={10 * 1024 * 1024} 
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

  return (
    <div className="container-fluid p-0">
        <h3 className="mb-4 text-dark"><i className="bi bi-kanban me-2 text-success"></i> Active Projects ({projects.length})</h3>
        {!selected ? <ProjectList /> : <ProjectDetails p={selected} />}
    </div>
  )
}

// Helper component for Payment Summary Row
const SummaryRow = ({ title, amount, currency, color = 'text-dark', className = '' }) => (
    <div className="d-flex justify-content-between align-items-center mb-1">
        <span className="small text-muted">{title}</span>
        <span className={`${color} ${className}`}>
            {currency || 'USD'} {Number(amount).toFixed(2)}
        </span>
    </div>
);