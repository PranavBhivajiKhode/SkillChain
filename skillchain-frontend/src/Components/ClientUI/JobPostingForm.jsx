"use client"

import { useState } from "react"
import MilestoneManager from "./MilestoneManager"
import { jobPostingApiService } from "../Api/JobApiService"
import { useAuth } from "../security/AuthContext"

const JobPostingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budgetAmount: "",
    budgetCurrency: "USD",
    jobType: "FIXED_PRICE",
    requiredSkills: [],
    deadlineDate: "",
    milestones: [],
  })

  const [skillInput, setSkillInput] = useState("")
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTypes = [
    { value: "FIXED_PRICE", label: "Fixed Price" },
    { value: "HOURLY", label: "Hourly Rate" },
    { value: "CONTRACT", label: "Contract" }, // Added contract for completeness
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

  const authContext = useAuth();

  async function handleSubmit (e)  {
    e.preventDefault()

    if (validateForm()) {
        setIsSubmitting(true);
      const submitData = {
        ...formData,
        budgetAmount: Number.parseFloat(formData.budgetAmount),
        milestones: formData.milestones.map((milestone) => ({
          ...milestone,
          budgetAmount: Number.parseFloat(milestone.budgetAmount),
        })),
        clientId: authContext.userID, // Ensure clientId is added to the submission data
      }
      
      try{
        // API Call: Post the new job
        const response = await jobPostingApiService(authContext.userID, submitData); //
        if(response.status === 201){
          console.log("Job successfully posted!");
          // Call parent handler to update job list in dashboard
          onSubmit(submitData); 
        }else{
          console.log("Response status is not 201!");
          alert("Job posting failed. Please try again.");
        }
      }catch(error){
        console.log("Error from api service!");
        alert("An error occurred. Check console for details.");
      } finally {
        setIsSubmitting(false);
      }
    }
  }

  return (
    <div className="card shadow-lg border-0">
      <div className="card-header bg-success text-white">
        <h4 className="card-title mb-0"><i className="bi bi-megaphone me-2"></i> Post a New Job</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Section: Job Details */}
          <div className="p-4 mb-4 border rounded bg-light">
            <h5 className="text-primary mb-3"><i className="bi bi-pencil-square me-2"></i> Job Description</h5>
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
                placeholder="Enter job title (e.g., 'Senior React Developer for E-commerce Platform')"
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
                            placeholder="Enter a skill (e.g., React)"
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

          {/* Milestone Manager */}
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

          {/* Submit Button */}
          <div className="d-grid">
            <button type="submit" className="btn btn-success btn-lg shadow-sm" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Posting Job...
                </>
              ) : (
                <>
                    <i className="bi bi-plus-circle me-2"></i>
                    Post Job Now ({formData.milestones.length} Milestones)
                </>
              )}
              
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobPostingForm