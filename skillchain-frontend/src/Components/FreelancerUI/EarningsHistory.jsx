"use client"

import { useState } from "react"

const EarningsHistory = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [selectedEarning, setSelectedEarning] = useState(null)

  const mockEarnings = [
    {
      id: 1,
      projectTitle: "E-commerce Website Development",
      clientName: "TechCorp Inc.",
      amount: 1500,
      currency: "USD",
      type: "milestone",
      status: "received",
      date: "2024-01-20",
      transactionId: "ERN-2024-001",
      milestone: "Frontend Development",
      paymentMethod: "Bank Transfer",
      invoiceId: "INV-2024-001",
    },
    {
      id: 2,
      projectTitle: "Mobile App UI/UX Design",
      clientName: "StartupXYZ",
      amount: 800,
      currency: "USD",
      type: "milestone",
      status: "received",
      date: "2024-01-18",
      transactionId: "ERN-2024-002",
      milestone: "User Research & Wireframes",
      paymentMethod: "PayPal",
      invoiceId: "INV-2024-002",
    },
    {
      id: 3,
      projectTitle: "E-commerce Website Development",
      clientName: "TechCorp Inc.",
      amount: 1000,
      currency: "USD",
      type: "milestone",
      status: "pending",
      date: "2024-01-22",
      transactionId: "ERN-2024-003",
      milestone: "Backend API Development",
      paymentMethod: "Bank Transfer",
      invoiceId: "INV-2024-003",
    },
    {
      id: 4,
      projectTitle: "Data Analytics Dashboard",
      clientName: "Analytics Pro",
      amount: 2500,
      currency: "USD",
      type: "project",
      status: "received",
      date: "2024-01-15",
      transactionId: "ERN-2024-004",
      milestone: "Final Payment",
      paymentMethod: "Stripe",
      invoiceId: "INV-2024-004",
    },
    {
      id: 5,
      projectTitle: "Mobile App UI/UX Design",
      clientName: "StartupXYZ",
      amount: 1200,
      currency: "USD",
      type: "milestone",
      status: "processing",
      date: "2024-01-23",
      transactionId: "ERN-2024-005",
      milestone: "UI Design & Prototyping",
      paymentMethod: "PayPal",
      invoiceId: "INV-2024-005",
    },
    {
      id: 6,
      projectTitle: "WordPress Plugin Development",
      clientName: "WebSolutions LLC",
      amount: 900,
      currency: "USD",
      type: "milestone",
      status: "received",
      date: "2024-01-12",
      transactionId: "ERN-2024-006",
      milestone: "Plugin Core Features",
      paymentMethod: "Bank Transfer",
      invoiceId: "INV-2024-006",
    },
    {
      id: 7,
      projectTitle: "Landing Page Design",
      clientName: "Marketing Agency",
      amount: 600,
      currency: "USD",
      type: "project",
      status: "overdue",
      date: "2024-01-10",
      transactionId: "ERN-2024-007",
      milestone: "Complete Project",
      paymentMethod: "Bank Transfer",
      invoiceId: "INV-2024-007",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "received":
        return { class: "bg-success", text: "Received" }
      case "pending":
        return { class: "bg-warning", text: "Pending" }
      case "processing":
        return { class: "bg-info", text: "Processing" }
      case "overdue":
        return { class: "bg-danger", text: "Overdue" }
      default:
        return { class: "bg-secondary", text: "Unknown" }
    }
  }

  const getPaymentIcon = (method) => {
    switch (method) {
      case "Stripe":
        return "bi-credit-card"
      case "PayPal":
        return "bi-paypal"
      case "Bank Transfer":
        return "bi-bank"
      case "Wallet":
        return "bi-wallet2"
      default:
        return "bi-cash"
    }
  }

  const filteredEarnings = mockEarnings.filter((earning) => {
    if (filterStatus !== "all" && earning.status !== filterStatus) return false
    if (filterPeriod !== "all") {
      const earningDate = new Date(earning.date)
      const now = new Date()
      const diffTime = now - earningDate
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (filterPeriod === "7days" && diffDays > 7) return false
      if (filterPeriod === "30days" && diffDays > 30) return false
      if (filterPeriod === "90days" && diffDays > 90) return false
    }
    return true
  })

  const totalEarned = mockEarnings.filter((e) => e.status === "received").reduce((sum, e) => sum + e.amount, 0)

  const totalPending = mockEarnings
    .filter((e) => e.status === "pending" || e.status === "processing")
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0">Earnings History</h2>
        <div className="d-flex gap-2">
          <select
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="received">Received</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            className="form-select form-select-sm"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <button className="btn btn-outline-primary btn-sm">
            <i className="bi bi-download me-1"></i>Export
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-success mb-2">
                <i className="bi bi-currency-dollar"></i>
              </div>
              <h4 className="text-success">${totalEarned.toLocaleString()}</h4>
              <p className="text-muted mb-0">Total Earned</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-primary mb-2">
                <i className="bi bi-receipt"></i>
              </div>
              <h4 className="text-primary">{mockEarnings.length}</h4>
              <p className="text-muted mb-0">Total Transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-warning mb-2">
                <i className="bi bi-clock"></i>
              </div>
              <h4 className="text-warning">${totalPending.toLocaleString()}</h4>
              <p className="text-muted mb-0">Pending Earnings</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-info mb-2">
                <i className="bi bi-star"></i>
              </div>
              <h4 className="text-info">{mockEarnings.filter((e) => e.status === "received").length}</h4>
              <p className="text-muted mb-0">Completed Projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Recent Earnings</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Transaction</th>
                  <th>Project & Client</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEarnings.map((earning) => {
                  const statusInfo = getStatusBadge(earning.status)
                  return (
                    <tr key={earning.id}>
                      <td>
                        <div className="fw-semibold">{earning.transactionId}</div>
                        <small className="text-muted">{earning.milestone}</small>
                      </td>
                      <td>
                        <div className="fw-semibold">{earning.projectTitle}</div>
                        <small className="text-muted">by {earning.clientName}</small>
                      </td>
                      <td>
                        <span className="fw-semibold text-success">${earning.amount.toLocaleString()}</span>
                        <small className="text-muted d-block">{earning.currency}</small>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className={`bi ${getPaymentIcon(earning.paymentMethod)} me-2`}></i>
                          {earning.paymentMethod}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>
                      </td>
                      <td>{earning.date}</td>
                      <td>
                        <div className="btn-group">
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setSelectedEarning(earning)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-download"></i>
                          </button>
                          {earning.status === "overdue" && (
                            <button className="btn btn-outline-warning btn-sm">
                              <i className="bi bi-exclamation-triangle"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {filteredEarnings.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-currency-dollar display-1 text-muted"></i>
          <h4 className="mt-3">No earnings found</h4>
          <p className="text-muted">No earnings match your current filters.</p>
        </div>
      )}

      {selectedEarning && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-currency-dollar me-2"></i>Earning Details
                </h5>
                <button type="button" className="btn-close" onClick={() => setSelectedEarning(null)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-primary">{selectedEarning.projectTitle}</h6>
                    <p className="text-muted">
                      <i className="bi bi-building me-1"></i>
                      {selectedEarning.clientName}
                    </p>
                  </div>
                  <div className="col-md-6 text-end">
                    <h4 className="text-success">${selectedEarning.amount.toLocaleString()}</h4>
                    <span className={`badge ${getStatusBadge(selectedEarning.status).class}`}>
                      {getStatusBadge(selectedEarning.status).text}
                    </span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <strong>Transaction ID:</strong>
                    <p>{selectedEarning.transactionId}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Invoice ID:</strong>
                    <p>{selectedEarning.invoiceId}</p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <strong>Milestone:</strong>
                    <p>{selectedEarning.milestone}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Payment Method:</strong>
                    <p>
                      <i className={`bi ${getPaymentIcon(selectedEarning.paymentMethod)} me-2`}></i>
                      {selectedEarning.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <strong>Date:</strong>
                    <p>{selectedEarning.date}</p>
                  </div>
                  <div className="col-md-6">
                    <strong>Type:</strong>
                    <p className="text-capitalize">{selectedEarning.type}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedEarning(null)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  <i className="bi bi-download me-1"></i>
                  Download Invoice
                </button>
                {selectedEarning.status === "overdue" && (
                  <button type="button" className="btn btn-warning">
                    <i className="bi bi-exclamation-triangle me-1"></i>
                    Follow Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EarningsHistory
