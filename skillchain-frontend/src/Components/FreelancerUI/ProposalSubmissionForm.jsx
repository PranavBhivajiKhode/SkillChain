"use client"

import { useState, useEffect } from "react"
import { proposalPostingApiService } from "../Api/ProposalApiService"
import { useAuth } from "../security/AuthContext"

export default function ProposalSubmissionForm({ job, proposal, isEditing = false, onBack, onSubmit }) {
  const [formData, setFormData] = useState({
    jobId: "",
    proposedAmount: "",
    proposedCurrency: "USD",
    proposedTimelineDays: "",
    proposalText: "",
  })

  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (job) {
      setFormData((prev) => ({
        ...prev,
        jobId: job.jobId,
      }))
    }

    if (isEditing && proposal) {
      setFormData({
        jobId: proposal.jobId,
        // Ensure values are strings for form inputs
        proposedAmount: proposal.proposedAmount.toString(),
        proposedCurrency: proposal.proposedCurrency,
        proposedTimelineDays: proposal.proposedTimelineDays.toString(),
        proposalText: proposal.proposalText,
      })
    }
  }, [job, proposal, isEditing])

  const currencies = ["USD", "EUR", "GBP", "CAD", "AUD"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.proposedAmount || Number.parseFloat(formData.proposedAmount) <= 0) {
      newErrors.proposedAmount = "Proposed amount must be greater than 0."
    }
    if (!formData.proposedCurrency.trim()) newErrors.proposedCurrency = "Currency is required."
    if (!formData.proposedTimelineDays || Number.parseInt(formData.proposedTimelineDays) < 1) {
      newErrors.proposedTimelineDays = "Timeline must be at least 1 day."
    }
    if (!formData.proposalText.trim()) newErrors.proposalText = "Proposal text is required."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const authContext = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()

    if (validateForm()) {
      const requestBody = {
        jobId: formData.jobId,
        proposedAmount: parseFloat(formData.proposedAmount), // Convert to float for API
        proposedCurrency: formData.proposedCurrency,
        proposedTimelineDays: parseInt(formData.proposedTimelineDays), // Convert to int for API
        proposalText: formData.proposalText,
        // Assuming freelancerId is obtained from authContext
        freelancerId: authContext.userID || "mock-freelancer-id" 
      }

      try {
        console.log(`Submitting proposal for job: ${requestBody.jobId}`)
        
        // Simulating API call based on whether it's editing or submitting new
        if (isEditing) {
          console.log("Updating existing proposal:", proposal.bidId)
          // Placeholder for actual update API call
          // const response = await proposalUpdateApiService(proposal.bidId, requestBody)
        } else {
          const response = await proposalPostingApiService(authContext.userID || "mock-freelancer-id", requestBody)

          if (response.status === 201) {
            console.log("Proposal posted successfully!")
          } else {
            console.log("Bid posting done without exception. but response status is not 201")
          }
        }
      } catch (error) {
        console.log("Exception from API service!")
      }

      // Call parent onSubmit to update view/state
      onSubmit(requestBody)
    }
  }

  if (!job) {
    return (
      <div className="container-fluid">
        <div className="alert alert-warning border-0 shadow-sm">
          <i className="bi bi-exclamation-triangle me-2"></i>
          **No job selected.** Please go back and select a job first.
        </div>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-12">
          <button className="btn btn-outline-secondary" onClick={onBack}>
            <i className="bi bi-arrow-left me-2"></i>
            Back
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="bi bi-file-earmark-plus me-2"></i>
                {isEditing ? `Edit Proposal for: ${job.title}` : `Submit Proposal for: ${job.title}`}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Selected Job Summary */}
                <div className="mb-4 p-3 border rounded bg-light-subtle">
                  <h6 className="text-dark fw-bold mb-2">Job: {job.title}</h6>
                  <p className="text-muted small mb-2">{job.description}</p>
                  <div className="d-flex gap-3 small">
                    <span className="text-success fw-semibold"><i className="bi bi-currency-dollar me-1"></i> ${job.budgetAmount.toLocaleString()} {job.budgetCurrency}</span>
                    <span className="text-dark"><i className="bi bi-calendar me-1"></i> {new Date(job.deadlineDate).toLocaleDateString()}</span>
                  </div>
                  <div className="mt-2">
                    {job.requiredSkills.map((skill) => (
                      <span key={skill} className="badge bg-secondary-subtle text-dark me-1 small">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Proposed Amount and Currency */}
                <div className="row mb-3">
                  <div className="col-md-8">
                    <label htmlFor="proposedAmount" className="form-label fw-semibold">
                      <i className="bi bi-currency-dollar me-2 text-success"></i>
                      Proposed Amount <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className={`form-control ${errors.proposedAmount ? "is-invalid" : ""}`}
                      id="proposedAmount"
                      name="proposedAmount"
                      value={formData.proposedAmount}
                      onChange={handleInputChange}
                      placeholder="e.g. 5000.00"
                      disabled={isEditing && proposal.status !== "PENDING"}
                    />
                    {errors.proposedAmount && <div className="invalid-feedback">{errors.proposedAmount}</div>}
                  </div>
                  <div className="col-md-4">
                    <label htmlFor="proposedCurrency" className="form-label fw-semibold">
                      Currency <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.proposedCurrency ? "is-invalid" : ""}`}
                      id="proposedCurrency"
                      name="proposedCurrency"
                      value={formData.proposedCurrency}
                      onChange={handleInputChange}
                      disabled={isEditing && proposal.status !== "PENDING"}
                    >
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                    {errors.proposedCurrency && <div className="invalid-feedback">{errors.proposedCurrency}</div>}
                  </div>
                </div>

                {/* Timeline */}
                <div className="mb-3">
                  <label htmlFor="proposedTimelineDays" className="form-label fw-semibold">
                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                    Proposed Timeline (Days) <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className={`form-control ${errors.proposedTimelineDays ? "is-invalid" : ""}`}
                    id="proposedTimelineDays"
                    name="proposedTimelineDays"
                    value={formData.proposedTimelineDays}
                    onChange={handleInputChange}
                    placeholder="Number of days to complete"
                    disabled={isEditing && proposal.status !== "PENDING"}
                  />
                  {errors.proposedTimelineDays && <div className="invalid-feedback">{errors.proposedTimelineDays}</div>}
                </div>

                {/* Proposal Text */}
                <div className="mb-4">
                  <label htmlFor="proposalText" className="form-label fw-semibold">
                    <i className="bi bi-file-text me-2 text-info"></i>
                    Proposal Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className={`form-control ${errors.proposalText ? "is-invalid" : ""}`}
                    id="proposalText"
                    name="proposalText"
                    rows="6"
                    value={formData.proposalText}
                    onChange={handleInputChange}
                    placeholder="Describe your approach, experience, and why you're the best fit..."
                    disabled={isEditing && proposal.status !== "PENDING"}
                  ></textarea>
                  {errors.proposalText && <div className="invalid-feedback">{errors.proposalText}</div>}
                  <div className="form-text">
                    <i className="bi bi-info-circle me-1"></i>
                    Tip: A great proposal addresses the client's needs directly.
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-between pt-3 border-top">
                  <button type="button" className="btn btn-outline-secondary" onClick={onBack}>
                    <i className="bi bi-x-lg me-2"></i>
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary shadow-sm"
                    disabled={isEditing && proposal.status !== "PENDING"}
                  >
                    <i className="bi bi-send me-2"></i>
                    {isEditing ? "Confirm Edit" : "Submit Proposal"}
                  </button>
                </div>

                {isEditing && proposal.status !== "PENDING" && (
                    <div className="alert alert-info mt-3 small">
                        <i className="bi bi-info-circle me-2"></i>
                        This proposal cannot be edited because its status is **{proposal.status}**.
                    </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Right Sidebar for Tips */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-3">
            <div className="card-header bg-primary text-white">
              <h6 className="mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Proposal Tips
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <h6 className="text-dark border-bottom pb-1">
                  <i className="bi bi-check-circle me-2 text-success"></i>
                  Writing a Great Proposal
                </h6>
                <ul className="list-unstyled small">
                  <li className="mb-2"><i className="bi bi-arrow-right-short text-success"></i> Personalize for each job</li>
                  <li className="mb-2"><i className="bi bi-arrow-right-short text-success"></i> Highlight relevant experience</li>
                  <li className="mb-2"><i className="bi bi-arrow-right-short text-success"></i> Be specific about your approach</li>
                </ul>
              </div>

              <div className="alert alert-warning small border-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                **Remember:** You can only submit one proposal per job.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}