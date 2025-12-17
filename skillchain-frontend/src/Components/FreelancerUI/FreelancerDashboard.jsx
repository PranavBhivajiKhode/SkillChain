"use client"

import { useState } from "react"
// Imported components remain the same
import ProposalSubmissionForm from "./ProposalSubmissionForm"
import MyProposals from "./MyProposals"
import FreelancerAnalytics from "./FreelancerAnalytics"
import JobBrowser from "./JobBrowser"
import ActiveProjects from "./ActiveProjects"
import MessagesCenter from "./MessagesCenter"
import FreelancerProfile from "./FreelancerProfile"
import EarningsHistory from "./EarningsHistory"

export default function FreelancerDashboard() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <div className="min-vh-100 bg-light-subtle"> {/* Use a lighter background */}
      {/* Navigation Header - Enhanced Theme */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm"> {/* Darker, subtle shadow */}
        <div className="container-fluid px-4">
          <a className="navbar-brand fw-bolder text-warning" href="#"> {/* Highlight brand */}
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
                <span className="navbar-text text-white small">Welcome, **John Doe**</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar - Use a card for better structure */}
          <div className="col-md-2">
            <div className="card shadow-sm border-0 sticky-top" style={{ top: '15px' }}> {/* Sticky sidebar */}
                <div className="list-group list-group-flush"> {/* Use list-group-flush for cleaner lines */}
                {[
                    { key: "analytics", label: "Analytics", icon: "bi-graph-up", color: "text-info" },
                    { key: "browse", label: "Browse Jobs", icon: "bi-search", color: "text-primary" },
                    { key: "proposals", label: "My Proposals", icon: "bi-file-text", badge: { text: 3, color: "warning" }, color: "text-warning" },
                    { key: "projects", label: "Active Projects", icon: "bi-kanban", badge: { text: 2, color: "success" }, color: "text-success" },
                    // { key: "messages", label: "Messages", icon: "bi-chat-dots", badge: { text: 4, color: "danger" }, color: "text-danger" },
                    { key: "earnings", label: "Earnings", icon: "bi-currency-dollar", color: "text-success" },
                    { key: "profile", label: "Profile", icon: "bi-person", color: "text-secondary" }
                ].map((item) => (
                    <button
                    key={item.key}
                    className={`list-group-item list-group-item-action py-3 ${activeTab === item.key ? "active bg-primary text-white" : ""}`}
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

          {/* Content Area */}
          <div className="col-md-10">
            {/* Using conditional rendering instead of style={{ display: ... }} is often preferred in React */}
            {activeTab === "analytics" && <FreelancerAnalytics />}
            {activeTab === "browse" && <JobBrowser />}
            {activeTab === "proposals" && <MyProposals />}
            {activeTab === "projects" && <ActiveProjects />}
            {activeTab === "messages" && <MessagesCenter />}
            {activeTab === "earnings" && <EarningsHistory />}
            {activeTab === "profile" && <FreelancerProfile />}
          </div>
        </div>
      </div>
    </div>
  )
}