"use client"

import { useState } from "react"

const PaymentHistory = () => {
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPeriod, setFilterPeriod] = useState("all")
  const [showWalletForm, setShowWalletForm] = useState(false)
  const [walletBalance, setWalletBalance] = useState(2500.0) // Mock wallet balance
  const [addAmountForm, setAddAmountForm] = useState({
    amount: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })

  const mockPayments = [
    {
      id: 1,
      projectTitle: "E-commerce Website Development",
      freelancerName: "Sarah Johnson",
      amount: 1500,
      currency: "USD",
      type: "milestone",
      status: "completed",
      date: "2024-01-20",
      transactionId: "TXN-2024-001",
      milestone: "Frontend Development",
      paymentMethod: "Wallet",
    },
    {
      id: 2,
      projectTitle: "Mobile App UI/UX Design",
      freelancerName: "Emma Davis",
      amount: 800,
      currency: "USD",
      type: "milestone",
      status: "completed",
      date: "2024-01-18",
      transactionId: "TXN-2024-002",
      milestone: "User Research & Wireframes",
      paymentMethod: "PayPal",
    },
    {
      id: 3,
      projectTitle: "E-commerce Website Development",
      freelancerName: "Sarah Johnson",
      amount: 1000,
      currency: "USD",
      type: "milestone",
      status: "pending",
      date: "2024-01-22",
      transactionId: "TXN-2024-003",
      milestone: "Backend API Development",
      paymentMethod: "Wallet",
    },
    {
      id: 4,
      projectTitle: "Data Analytics Dashboard",
      freelancerName: "Mike Chen",
      amount: 1500,
      currency: "USD",
      type: "project",
      status: "completed",
      date: "2024-01-15",
      transactionId: "TXN-2024-004",
      milestone: "Final Payment",
      paymentMethod: "Bank Transfer",
    },
    {
      id: 5,
      projectTitle: "Mobile App UI/UX Design",
      freelancerName: "Emma Davis",
      amount: 1200,
      currency: "USD",
      type: "milestone",
      status: "processing",
      date: "2024-01-23",
      transactionId: "TXN-2024-005",
      milestone: "UI Design & Prototyping",
      paymentMethod: "Wallet",
    },
    {
      id: 6,
      projectTitle: "Wallet Top-up",
      freelancerName: null,
      amount: 2000,
      currency: "USD",
      type: "wallet_topup",
      status: "completed",
      date: "2024-01-10",
      transactionId: "TXN-2024-006",
      milestone: "Wallet Credit",
      paymentMethod: "Credit Card",
    },
  ]

  const handleAddAmountFormChange = (e) => {
    const { name, value } = e.target
    setAddAmountForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddAmountToWallet = async (e) => {
    e.preventDefault()
    try {
      // Mock API call - you'll replace this with actual API
      console.log("Adding amount to wallet:", addAmountForm)

      // Simulate successful wallet top-up
      const newAmount = Number.parseFloat(addAmountForm.amount)
      setWalletBalance((prev) => prev + newAmount)

      // Reset form and close modal
      setAddAmountForm({
        amount: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
      })
      setShowWalletForm(false)

      alert("Amount added to wallet successfully!")
    } catch (error) {
      console.error("Error adding amount to wallet:", error)
      alert("Failed to add amount to wallet. Please try again.")
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return { class: "bg-success", text: "Completed" }
      case "pending":
        return { class: "bg-warning", text: "Pending" }
      case "processing":
        return { class: "bg-info", text: "Processing" }
      case "failed":
        return { class: "bg-danger", text: "Failed" }
      default:
        return { class: "bg-secondary", text: "Unknown" }
    }
  }

  const getPaymentIcon = (method) => {
    switch (method) {
      case "Credit Card":
        return "bi-credit-card"
      case "PayPal":
        return "bi-paypal"
      case "Bank Transfer":
        return "bi-bank"
      case "Wallet":
        return "bi-wallet2"
      default:
        return "bi-wallet"
    }
  }

  const filteredPayments = mockPayments.filter((payment) => {
    if (filterStatus !== "all" && payment.status !== filterStatus) return false
    if (filterPeriod !== "all") {
      const paymentDate = new Date(payment.date)
      const now = new Date()
      const diffTime = now - paymentDate
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (filterPeriod === "7days" && diffDays > 7) return false
      if (filterPeriod === "30days" && diffDays > 30) return false
      if (filterPeriod === "90days" && diffDays > 90) return false
    }
    return true
  })

  const totalPaid = mockPayments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

  const totalPending = mockPayments
    .filter((p) => p.status === "pending" || p.status === "processing")
    .reduce((sum, p) => sum + p.amount, 0)

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0">Payment History</h2>
        <div className="d-flex gap-2">
          <select
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
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

      {/* Total Paid and Total Transactions */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-success mb-2">
                <i className="bi bi-check-circle"></i>
              </div>
              <h4 className="text-success">${totalPaid.toLocaleString()}</h4>
              <p className="text-muted mb-0">Total Paid</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center">
              <div className="display-6 text-primary mb-2">
                <i className="bi bi-receipt"></i>
              </div>
              <h4 className="text-primary">{mockPayments.length}</h4>
              <p className="text-muted mb-0">Total Transactions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">
                <i className="bi bi-wallet2 me-2"></i>Wallet
              </h5>
              <button className="btn btn-primary btn-sm" onClick={() => setShowWalletForm(true)}>
                <i className="bi bi-plus-circle me-1"></i>Add Amount
              </button>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="d-flex align-items-center">
                    <div className="display-6 text-success me-3">
                      <i className="bi bi-wallet2"></i>
                    </div>
                    <div>
                      <h3 className="text-success mb-0">${walletBalance.toLocaleString()}</h3>
                      <p className="text-muted mb-0">Available Balance</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="text-muted small">
                    <p className="mb-1">• Use wallet for instant payments</p>
                    <p className="mb-1">• Secure and encrypted transactions</p>
                    <p className="mb-0">• No additional processing fees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white">
          <h5 className="card-title mb-0">Recent Transactions</h5>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th>Transaction</th>
                  <th>Project & Freelancer</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => {
                  const statusInfo = getStatusBadge(payment.status)
                  return (
                    <tr key={payment.id}>
                      <td>
                        <div className="fw-semibold">{payment.transactionId}</div>
                        <small className="text-muted">{payment.milestone}</small>
                      </td>
                      <td>
                        <div className="fw-semibold">{payment.projectTitle}</div>
                        {payment.freelancerName && <small className="text-muted">by {payment.freelancerName}</small>}
                      </td>
                      <td>
                        <span className="fw-semibold">${payment.amount.toLocaleString()}</span>
                        <small className="text-muted d-block">{payment.currency}</small>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className={`bi ${getPaymentIcon(payment.paymentMethod)} me-2`}></i>
                          {payment.paymentMethod}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${statusInfo.class}`}>{statusInfo.text}</span>
                      </td>
                      <td>{payment.date}</td>
                      <td>
                        <div className="btn-group">
                          <button className="btn btn-outline-primary btn-sm">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-download"></i>
                          </button>
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

      {filteredPayments.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-credit-card display-1 text-muted"></i>
          <h4 className="mt-3">No payments found</h4>
          <p className="text-muted">No payments match your current filters.</p>
        </div>
      )}

      {showWalletForm && (
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-wallet2 me-2"></i>Add Amount to Wallet
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowWalletForm(false)}></button>
              </div>
              <form onSubmit={handleAddAmountToWallet}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Amount to Add *</label>
                        <div className="input-group">
                          <span className="input-group-text">$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="amount"
                            value={addAmountForm.amount}
                            onChange={handleAddAmountFormChange}
                            placeholder="0.00"
                            min="10"
                            max="10000"
                            step="0.01"
                            required
                          />
                        </div>
                        <small className="text-muted">Minimum: $10, Maximum: $10,000</small>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Cardholder Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cardholderName"
                          value={addAmountForm.cardholderName}
                          onChange={handleAddAmountFormChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Card Number *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cardNumber"
                      value={addAmountForm.cardNumber}
                      onChange={handleAddAmountFormChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Expiry Date *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="expiryDate"
                          value={addAmountForm.expiryDate}
                          onChange={handleAddAmountFormChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">CVV *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cvv"
                          value={addAmountForm.cvv}
                          onChange={handleAddAmountFormChange}
                          placeholder="123"
                          maxLength="4"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <i className="bi bi-shield-check me-2"></i>
                    Your payment information is encrypted and secure. We use industry-standard security measures to
                    protect your data.
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowWalletForm(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    <i className="bi bi-plus-circle me-1"></i>
                    Add ${addAmountForm.amount || "0.00"} to Wallet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PaymentHistory
