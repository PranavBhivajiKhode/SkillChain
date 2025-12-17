"use client"

import { useEffect, useState } from "react"
import AnalyticsDashboard from "./AnalyticsDashboard";
import JobListings from "./JobListings";
import JobPostingForm from "./JobPostingForm";
import ProposalsManagement from "./ProposalsManagement";
import ActiveProjects from "./ActiveProjects";
import MessagesCenter from "./MessagesCenter";
import ClientProfile from "./ClientProfile";
import { jobRetrivalApiService, updateJobStatus } from "../Api/JobApiService";
import { useAuth } from "../security/AuthContext";
import PaymentHistory from "./PaymentHistory";

export default function ClientDashboard() {

  const [activeTab, setActiveTab] = useState("analytics")
  const [jobs, setJobs] = useState([]);
  
  
  const authContext = useAuth();

  useEffect(() => {
    if (!authContext?.userID) return; // wait until userID is ready

    const fetchJobs = async () => {
      try {
        // API Call: Fetch all jobs posted by this client
        const response = await jobRetrivalApiService(authContext.userID);
        if (response.status === 200) {
          console.log("Fetch jobs for client successfully!");
          setJobs(response.data);
          
        } else {
          console.log("Response is not 200");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchJobs();
  }, []);



  const handleJobSubmit = (jobData) => {
    // This is for local state management after API submission (assuming successful 201 response)
    const newJob = {
      ...jobData,
      jobId: Date.now().toString(), // Use jobId (lowercase) for consistency
      status: "OPEN", // Use OPEN instead of ACTIVE for newly posted job
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt:new Date().toISOString().split("T")[0],
      totalViews: 0,
      totalProposals: 0,
    }
    setJobs([newJob, ...jobs])
    setActiveTab("listings")
  }

  const onUpdateProjectStatus = (jobId, status) =>{
    // This function assumes the API call (e.g., updateJobStatus) was successful
    setJobs((prev) => prev.map((proj) => (proj.jobId === jobId ? { ...proj, status } : proj)))
  }

  return (
    <div className="min-vh-100 bg-light-subtle">
      {/* Navigation Header - Enhanced Theme (Consistent with Freelancer UI) */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bolder text-info" href="#">
            <i className="bi bi-link-45deg me-2 fs-4"></i> SkillChain
          </a>
          <div className="d-flex align-items-center">
            {/* Notifications Icon */}
            <div className="position-relative me-3">
              <i className="bi bi-bell-fill text-white fs-5 cursor-pointer" title="Notifications"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light">3</span>
            </div>
            {/* User Info */}
            <div className="d-flex align-items-center">
                <div className="rounded-circle bg-light me-2" style={{ width: '30px', height: '30px' }}>
                    <i className="bi bi-person-fill text-dark p-1 fs-5"></i>
                </div>
                <span className="navbar-text text-white small">Welcome, **John Doe (Client)**</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar - Use a card for better structure */}
          <div className="col-md-2">
            <div className="card shadow-sm border-0 sticky-top" style={{ top: '15px' }}>
                <div className="list-group list-group-flush">
                {[
                    { key: "analytics", label: "Analytics", icon: "bi-graph-up", badge: null, color: "text-info" },
                    { key: "listings", label: "My Jobs", icon: "bi-briefcase", badge: null, color: "text-primary" },
                    { key: "post", label: "Post Job", icon: "bi-plus-circle", badge: null, color: "text-success" },
                    { key: "proposals", label: "Proposals", icon: "bi-file-text", badge: { text: 5, color: "warning" }, color: "text-warning" },
                    { key: "projects", label: "Active Projects", icon: "bi-kanban", badge: null, color: "text-success" },
                    // { key: "messages", label: "Messages", icon: "bi-chat-dots", badge: { text: 2, color: "danger" }, color: "text-danger" },
                    { key: "payments", label: "Payments", icon: "bi-credit-card", badge: null, color: "text-secondary" },
                    { key: "profile", label: "Profile", icon: "bi-person", badge: null, color: "text-secondary" }
                ].map((item) => (
                    <button
                        key={item.key}
                        className={`list-group-item list-group-item-action py-3 ${activeTab === item.key ? "active bg-dark text-white" : ""}`}
                        onClick={() => setActiveTab(item.key)}
                    >
                        <i className={`bi ${item.icon} me-2 ${activeTab === item.key ? "text-white" : item.color}`}></i>
                        {item.label}
                        {item.badge && (
                            <span className={`badge bg-${item.badge.color} rounded-pill ms-2`}>
                                {item.badge.text}
                            </span>
                        )}
                    </button>
                ))}
                </div>
            </div>
          </div>

          <div className="col-md-10">
            {activeTab === "analytics" && <AnalyticsDashboard jobs={jobs} />}
            {activeTab === "listings" && <JobListings jobs={jobs} setJobs={setJobs} />}
            {activeTab === "post" && <JobPostingForm onSubmit={handleJobSubmit} />}
            {activeTab === "proposals" && <ProposalsManagement jobs={jobs} />}
            {activeTab === "projects" && <ActiveProjects onUpdateProjectStatus={onUpdateProjectStatus}/>}
            {/* {activeTab === "messages" && <MessagesCenter />} */}
            {activeTab === "payments" && <PaymentHistory />}
            {activeTab === "profile" && <ClientProfile />}
          </div>
        </div>
      </div>
    </div>
  )
}