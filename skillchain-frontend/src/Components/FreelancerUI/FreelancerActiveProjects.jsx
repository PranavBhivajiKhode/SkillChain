"use client"

import { useEffect, useState } from "react"
import { useAuth } from "../security/AuthContext"
import { inProgressJobRetrievalForFreelancer } from "../Api/JobApiService"
import FileUpload from "../FileUpload" 
// *** API Placeholder: Import API calls needed for Freelancer actions ***
// import { updateMilestoneStatus, updateJobStatus, uploadFilesForJob, uploadFilesForMilestone } from "../Api/JobApiService"


// --- Helper Components (Styling Refresh) ---

function StatusBadge({ status }) {
  const statusMap = {
    NOT_STARTED: { text: "NOT STARTED", variant: "secondary" },
    IN_PROGRESS: { text: "IN PROGRESS", variant: "primary" },
    MILESTONE_DELIVERED: { text: "DELIVERED", variant: "info" }, // New status for freelancer submission
    COMPLETED_WAITING_VERIFICATION: { text: "PENDING VERIFICATION", variant: "warning" },
    COMPLETED_VERIFIED: { text: "COMPLETED & PAID", variant: "success" },
    // Use IN_PROGRESS as default if not found
  }
  const config = statusMap[status] || statusMap.IN_PROGRESS 

  return <span className={`badge text-bg-${config.variant} fw-semibold`}>{config.text}</span>
}

function Currency({ amount, currency }) {
  const a = Number.isFinite(Number(amount)) ? Number(amount) : 0
  const c = currency || "USD"
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
            {f.userType === "CLIENT" ? "Client" : "You"}
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

export default function FreelancerActiveProjects() {

  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)

  const authContext = useAuth();

  const selectProject = (p) => setSelected(p)
  const goBack = () => setSelected(null)
  
  // --- Utility Check ---
  const areAllMilestonesDelivered = (p) => 
    (p.milestones || []).length > 0 && 
    (p.milestones || []).every(
      (m) => m.status === "MILESTONE_DELIVERED" || m.status === "COMPLETED_WAITING_VERIFICATION" || m.status === "COMPLETED_VERIFIED"
    );


  useEffect(() =>{
    if (!authContext?.userID) return;
    
    const retrieveAllActivejobs = async () =>{
      setLoading(true);
      try{
        // API Call: Fetch active jobs for this freelancer
        const response = await inProgressJobRetrievalForFreelancer(authContext.userID);
        if(response.status === 200){
          console.log(`Active projects for freelancer with id ${authContext.userID} is fetched succesfully!`);
          setProjects(response.data);
        }else{
          console.log("No exception from server while fetching active projects from freelancerActiveProjects.jsx");
        }
      }catch(error){
        console.log("Exception from server!");
        console.log("FreelancerActiveProjects.jsx");
      } finally {
        setLoading(false);
      }
    }
    retrieveAllActivejobs();
  },[authContext.userID]);

  // --- API Handlers (Integration with FileUpload.jsx) ---

  const updateProjectState = (jobId, updateFn) => {
    setProjects(prev => {
        const updatedProjects = prev.map(proj => 
            proj.jobId === jobId ? updateFn(proj) : proj
        );
        if (selected && selected.jobId === jobId) {
            setSelected(updateFn(selected));
        }
        return updatedProjects;
    });
  };

  const handleUpdateMilestoneStatus = async (jobId, milestoneId, status) => {
    // Optimistic UI Update
    updateProjectState(jobId, proj => ({
        ...proj,
        milestones: proj.milestones.map(ms => ms.id === milestoneId ? { ...ms, status } : ms)
    }));
    
    // API Call Placeholder: Update milestone status
    // NOTE: Requires PUT /api/projects/{jobId}/milestones/{milestoneId}/status
    // try { await updateMilestoneStatusApi(jobId, milestoneId, status); } catch (e) { console.error("Milestone status update failed"); }
  }

  const submitProjectForVerification = async (p) => {
    if (!areAllMilestonesDelivered(p)) return;
    
    const newStatus = "COMPLETED_WAITING_VERIFICATION";
    
    // Optimistic UI Update
    updateProjectState(p.jobId, proj => ({ ...proj, status: newStatus }));

    // API Call: Update project status
    // NOTE: Requires PUT /api/projects/{jobId}/status?status={newStatus}
    // try { await updateJobStatus(p.jobId, newStatus); } catch (e) { console.error("Project status update failed"); }
  }


  // --- File Upload Handlers (Integration with FileUpload.jsx) ---
  // NOTE: These match the signature required by FileUpload.jsx
  
  const handleUploadProjectFiles = async (formData, uploadType) => {
    try {
      // API Call: Upload files for the job
      // NOTE: Requires POST /api/projects/upload/job
      // const response = await uploadFilesForJob(formData);
      const response = { status: 200, data: [{ id: `f${Date.now()}`, fileName: "uploaded-file.zip", userType: "FREELANCER" }] }; // Mock response
      const jobId = formData.get("entityId");

      if (response.status === 200) {
        console.log("Project files upload successful (Freelancer):", response.data);

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
      // NOTE: Requires POST /api/projects/upload/milestone
      // const response = await uploadFilesForMilestone(formData);
      const response = { status: 200, data: [{ id: `m${Date.now()}`, fileName: "milestone-delivery.pdf", userType: "FREELANCER" }] }; // Mock response
      const milestoneId = formData.get("entityId");
      
      // Since we don't have the job list readily available, we update the state directly
      updateProjectState(selected.jobId, proj => ({
        ...proj,
        milestones: (proj.milestones || []).map(ms =>
            ms.id === milestoneId ? { ...ms, files: [...(ms.files || []), ...response.data] } : ms
        ),
      }));

      if (response.status === 200) {
        console.log("Milestone files upload successful (Freelancer):", response.data);
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
            <p className="mt-3 text-muted">Loading your active projects...</p>
        </div>
      ) : (projects || []).length === 0 ? (
        <div className="alert alert-info border-0 shadow-sm text-center">
            <i className="bi bi-info-circle display-4"></i>
            <h5 className="mt-3">No Active Projects Assigned</h5>
            <p>Once a client accepts your proposal, the project will appear here for management.</p>
        </div>
      ) : (
        (projects || []).map((p) => (
          <div key={p.jobId} className="col-12 col-md-6">
            <div className="card h-100 shadow-sm border-start border-4 border-warning">
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
                <button className="btn btn-warning text-dark mt-2 shadow-sm fw-bold" onClick={() => selectProject(p)}>
                  <i className="bi bi-eye me-1"></i> View & Manage
                </button>
              </div>
              <div className="card-footer bg-light small text-muted">
                Client: **{p.clientName || "N/A"}** | Deadline: **{new Date(p.deadlineDate).toLocaleDateString()}**
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )

  const ProjectDetails = ({ p }) => (
    <div className="card shadow-lg border-0">
      <ProjectHeader project={p} onBack={goBack} />

      <div className="card-body">
        <div className="row g-4">
          <div className="col-12 col-lg-8 border-end">
            
            {/* Milestone List */}
            <h4 className="mb-3 text-primary"><i className="bi bi-flag-fill me-2"></i> Project Milestones</h4>
            <div className="accordion" id={`milestoneAccordion-${p.jobId}`}>
                {(p.milestones || []).map((m, index) => {
                    const isCompleted = m.status === "COMPLETED_WAITING_VERIFICATION" || m.status === "COMPLETED_VERIFIED";
                    const canDeliver = m.status === "IN_PROGRESS" || m.status === "NOT_STARTED";
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
                                        <span className="text-success ms-3"><Currency amount={m.amount} currency={m.currency || p.budgetCurrency} /></span>
                                    </div>
                                </button>
                            </h2>
                            <div id={`collapse${m.id}`} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={`heading${m.id}`} data-bs-parent={`#milestoneAccordion-${p.jobId}`}>
                                <div className="accordion-body bg-light-subtle">
                                    <p className="small text-muted mb-3">{m.description}</p>
                                    
                                    <div className="row">
                                        {/* Status Update Column */}
                                        <div className="col-md-6 border-end">
                                            <h6 className="small text-dark fw-bold mb-2">Update Progress</h6>
                                            <div className="mb-3">
                                                <label className="form-label small text-muted">Current Status</label>
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={m.status}
                                                    onChange={(e) => handleUpdateMilestoneStatus(p.jobId, m.id, e.target.value)}
                                                >
                                                    <option value="NOT_STARTED">Not Started</option>
                                                    <option value="IN_PROGRESS">In Progress</option>
                                                    <option value="MILESTONE_DELIVERED">Ready for Review (Deliver)</option>
                                                    <option value="COMPLETED_VERIFIED" disabled>
                                                        Completed & Paid (Client Action)
                                                    </option>
                                                </select>
                                            </div>
                                            {canDeliver && (
                                                <div className="d-grid mt-3">
                                                    <button 
                                                        className="btn btn-sm btn-info text-dark"
                                                        onClick={() => handleUpdateMilestoneStatus(p.jobId, m.id, "MILESTONE_DELIVERED")}
                                                    >
                                                        <i className="bi bi-send me-1"></i> Submit for Client Review
                                                    </button>
                                                </div>
                                            )}
                                            {isCompleted && (
                                                <div className="alert alert-success py-2 small mt-2">
                                                    Delivered! Waiting for client verification/payment.
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* File Upload/Deliverables Column */}
                                        <div className="col-md-6">
                                            <h6 className="small text-dark fw-bold mb-2">Deliverables & Files ({m.files?.filter(f => f.userType === 'FREELANCER').length || 0})</h6>
                                            <FilesList files={m.files?.filter(f => f.userType === 'FREELANCER')} />
                                            <div className="mt-3">
                                                <FileUpload
                                                    onUpload={handleUploadMilestoneFiles}
                                                    uploadType="milestone"
                                                    entityId={m.id}
                                                    userType="FREELANCER"
                                                    maxFiles={5}
                                                    maxFileSize={5 * 1024 * 1024} 
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

          <div className="col-12 col-lg-4">
            {/* Final Submission Card */}
            <div className="card mb-3 shadow-sm border-0 sticky-top" style={{ top: '15px' }}>
                <div className="card-header bg-warning text-dark">
                    <strong><i className="bi bi-upload me-1"></i> Project Final Submission</strong>
                </div>
                <div className="card-body">
                    <p className="text-muted small">
                        Use this action after all milestones have been marked as **Delivered** or **Verified**.
                    </p>
                    
                    <div className="d-grid mt-2">
                        <button
                            className="btn btn-warning text-dark btn-lg fw-bold"
                            onClick={() => submitProjectForVerification(p)}
                            disabled={!areAllMilestonesDelivered(p) || p.status === "COMPLETED_WAITING_VERIFICATION"}
                        >
                            <i className="bi bi-check-circle me-1"></i>
                            Mark Project as Complete
                        </button>
                    </div>
                    {p.status === "COMPLETED_WAITING_VERIFICATION" && (
                         <div className="alert alert-info py-2 small mt-2 mb-0 fw-bold">
                            Sent to Client. Waiting for final verification.
                         </div>
                    )}
                    
                    <h6 className="mt-4 border-bottom pb-2 text-primary"><i className="bi bi-folder me-1"></i> Project Files</h6>
                    <FilesList files={p.files || []} />
                    <div className="mt-3">
                        <FileUpload
                            onUpload={handleUploadProjectFiles}
                            uploadType="job"
                            entityId={p.jobId}
                            userType="FREELANCER"
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

  return (
    <div className="container-fluid p-0">
      <h3 className="mb-4 text-dark"><i className="bi bi-kanban me-2 text-success"></i> Active Projects ({projects.length})</h3>
      {!selected ? <ProjectList /> : <ProjectDetails p={selected} />}
    </div>
  )
}