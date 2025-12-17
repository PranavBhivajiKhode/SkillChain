"use client"

import { useState } from "react"
import MilestoneManager from "./MilestoneManager"

const JobEditForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    jobId: job.jobId,
    title: job.title || "",
    description: job.description || "",
    budgetAmount: job.budgetAmount?.toString() || "",
    budgetCurrency: job.budgetCurrency || "USD",
    jobType: job.jobType || "FIXED_PRICE",
    requiredSkills: job.requiredSkills || [],
    deadlineDate: job.deadlineDate || "",
    milestones: job.milestones || [],
  })

  const [skillInput, setSkillInput] = useState("")
  const [errors, setErrors] = useState({})
  const [isUpdating, setIsUpdating] = useState(false);

  const jobTypes = [
    { value: "FIXED_PRICE", label: "Fixed Price" },
    { value: "HOURLY", label: "Hourly Rate" },
    { value: "CONTRACT", label: "Contract" },
  ]

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

  const handleMilestonesChange = (newMilestones) => {
    setFormData((prev) => ({
      ...prev,
      milestones: newMilestones,
    }))

    // Clear milestone-related errors
    const newErrors = { ...errors }
    Object.keys(newErrors).forEach((key) => {
      if (key.startsWith("milestone_")) {
        delete newErrors[key]
      }
    })
    setErrors(newErrors)
  }

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.requiredSkills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    } else if (formData.title.length > 255) {
      newErrors.title = "Title must be less than 255 characters"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.budgetAmount || Number.parseFloat(formData.budgetAmount) <= 0) {
      newErrors.budgetAmount = "Budget amount must be greater than 0"
    }

    if (!formData.deadlineDate) {
      newErrors.deadlineDate = "Deadline date is required"
    }

    if (formData.requiredSkills.length === 0) {
      newErrors.requiredSkills = "At least one skill is required"
    }

    // Milestone Validation (reusing existing logic)
    formData.milestones.forEach((milestone, index) => {
        if (!milestone.title.trim()) {
          newErrors[`milestone_${index}_title`] = "Milestone title is required"
        } 
        if (!milestone.description.trim()) {
          newErrors[`milestone_${index}_description`] = "Milestone description is required"
        }
        if (!milestone.budgetAmount || Number.parseFloat(milestone.budgetAmount) <= 0) {
          newErrors[`milestone_${index}_budgetAmount`] = "Budget must be greater than 0"
        }
        if (!milestone.deadlineDate) {
          newErrors[`milestone_${index}_deadlineDate`] = "Milestone deadline is required"
        }
      })


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit (e) {
    e.preventDefault()

    if (validateForm()) {
        setIsUpdating(true);
      const submitData = {
        ...formData,
        budgetAmount: Number.parseFloat(formData.budgetAmount),
        milestones: formData.milestones.map((milestone) => ({
          ...milestone,
          budgetAmount: Number.parseFloat(milestone.budgetAmount),
        })),
        updatedAt: new Date().toISOString().split("T")[0], // Update timestamp
      }
      
      try {
          // *** API Call Placeholder: Update existing job ***
          // NOTE: This API is currently not provided. You will need an API endpoint like: 
          // PUT /api/jobs/{jobId} 
          // const response = await jobUpdateApiService(submitData.jobId, submitData);
          // if (response.status === 200) { onSubmit(submitData); } else { alert("Update failed."); }
          
          console.log("Simulating Job Update success:", submitData);
          onSubmit(submitData);
          alert("Job Updated Successfully (Simulated)");
      } catch (error) {
          console.error("Update failed:", error);
          alert("An error occurred during update.");
      } finally {
        setIsUpdating(false);
      }
    }
  }

  return (
    <div className="card shadow-lg border-0">
      <div className="card-header bg-warning text-dark d-flex justify-content-between align-items-center">
        <h4 className="card-title mb-0"><i className="bi bi-pencil-square me-2"></i> Edit Job: **{job.title}**</h4>
        <button className="btn btn-outline-dark btn-sm" onClick={onCancel}>
          <i className="bi bi-arrow-left me-1"></i> Back to Job Details
        </button>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Section: Job Details */}
          <div className="p-4 mb-4 border rounded bg-light">
            <h5 className="text-primary mb-3"><i className="bi bi-file-earmark-text me-2"></i> Job Description</h5>
            {/* Job Title */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label fw-semibold">
                Job Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter job title"
                maxLength="255"
              />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            {/* Job Description */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label fw-semibold">
                Job Description <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.description ? "is-invalid" : ""}`}
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the job requirements, expectations, and deliverables"
              ></textarea>
              {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            </div>
          </div>


          {/* Section: Budget and Skills */}
          <div className="p-4 mb-4 border rounded bg-light">
            <h5 className="text-primary mb-3"><i className="bi bi-tag me-2"></i> Pricing & Requirements</h5>
            <div className="row">
                <div className="col-md-6">
                    {/* Budget and Currency */}
                    <div className="row mb-3">
                        <div className="col-md-8">
                        <label htmlFor="budgetAmount" className="form-label fw-semibold">
                            Total Budget Amount <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            className={`form-control ${errors.budgetAmount ? "is-invalid" : ""}`}
                            id="budgetAmount"
                            name="budgetAmount"
                            value={formData.budgetAmount}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                        />
                        {errors.budgetAmount && <div className="invalid-feedback">{errors.budgetAmount}</div>}
                        </div>
                        <div className="col-md-4">
                        <label htmlFor="budgetCurrency" className="form-label fw-semibold">
                            Currency
                        </label>
                        <select
                            className="form-select"
                            id="budgetCurrency"
                            name="budgetCurrency"
                            value={formData.budgetCurrency}
                            onChange={handleInputChange}
                        >
                            {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>
                    {/* Job Type */}
                    <div className="mb-3">
                        <label htmlFor="jobType" className="form-label fw-semibold">
                            Job Type <span className="text-danger">*</span>
                        </label>
                        <select
                            className="form-select"
                            id="jobType"
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleInputChange}
                        >
                            {jobTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Required Skills */}
                    <div className="mb-3">
                        <label className="form-label fw-semibold">
                            Required Skills <span className="text-danger">*</span>
                        </label>
                        <div className="input-group mb-2">
                        <input
                            type="text"
                            className="form-control"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder="Enter a skill (e.g., Figma)"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                        />
                        <button type="button" className="btn btn-primary" onClick={handleAddSkill}>
                            <i className="bi bi-plus me-1"></i> Add
                        </button>
                        </div>

                        {/* Skills Tags */}
                        <div className="d-flex flex-wrap gap-2 mb-2">
                        {formData.requiredSkills.map((skill, index) => (
                            <span key={index} className="badge bg-secondary d-flex align-items-center">
                            {skill}
                            <button
                                type="button"
                                className="btn-close btn-close-white ms-2"
                                style={{ fontSize: "0.7em" }}
                                onClick={() => handleRemoveSkill(skill)}
                            ></button>
                            </span>
                        ))}
                        </div>

                        {errors.requiredSkills && <div className="text-danger small">{errors.requiredSkills}</div>}
                    </div>
                </div>
            </div>
          </div>

          <MilestoneManager
            milestones={formData.milestones}
            onMilestonesChange={handleMilestonesChange}
            errors={errors}
          />

          {/* Deadline Date */}
          <div className="mb-4 p-4 border rounded bg-light">
            <h5 className="text-primary mb-3"><i className="bi bi-calendar-event me-2"></i> Timeline</h5>
            <label htmlFor="deadlineDate" className="form-label fw-semibold">
              Project Deadline Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className={`form-control ${errors.deadlineDate ? "is-invalid" : ""}`}
              id="deadlineDate"
              name="deadlineDate"
              value={formData.deadlineDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
            />
            {errors.deadlineDate && <div className="invalid-feedback">{errors.deadlineDate}</div>}
          </div>

          {/* Submit Buttons */}
          <div className="d-flex gap-2 justify-content-end pt-3 border-top">
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-warning text-dark fw-bold shadow-sm" disabled={isUpdating}>
              {isUpdating ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Updating Job...
                </>
              ) : (
                <>
                    <i className="bi bi-check-circle me-2"></i>
                    Update Job
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobEditForm