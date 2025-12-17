"use client"

import { useState } from "react"
import { useAuth } from "../security/AuthContext"
import { useNavigate } from "react-router-dom"

const Registration = ({ onLogin, onOTPVerification }) => {

  const authContext = useAuth()
  const navigate = useNavigate()

  const [userType, setUserType] = useState("freelancer")
  const [formData, setFormData] = useState({
    role:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    username: "", // Added username field
    // Freelancer specific fields
    skills: [],
    experience: "",
    hourlyRate: "",
    // Client specific fields
    companyName: "",
    companySize: "",
    industry: "",
  })
  const [skillInput, setSkillInput] = useState("")
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }


  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    // Common validations
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.username.trim()) newErrors.username = "Username is required" // Added username validation
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"

    // Freelancer specific validations
    if (userType === "freelancer") {
      if (formData.skills.length === 0) newErrors.skills = "At least one skill is required"
      if (!formData.experience) newErrors.experience = "Experience level is required"
      if (!formData.hourlyRate) newErrors.hourlyRate = "Hourly rate is required"
    }

    // Client specific validations
    if (userType === "client") {
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required"
      if (!formData.companySize) newErrors.companySize = "Company size is required"
      if (!formData.industry) newErrors.industry = "Industry is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // if (await authContext.registration(requestBody)) {
  //   navigate("/otp-verification")
  // } else {
  //   setError("Failed Registration. Please check your credentials.")
  // }


  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    try {
        if(await authContext.registration(formData)){
          navigate("/otp-verification")
        }else{
          setErrors("Failed Registration. Please check your credentials.")
        }
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2">Join SkillChain</h2>
                  <p className="text-muted">Create your account and start your journey</p>
                </div>

                {/* User Type Selection */}
                <div className="mb-4">
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="userType"
                      id="freelancer"
                      checked={userType === "freelancer"}
                      onChange={() => {
                        setUserType("freelancer")
                        setFormData((prev) => ({
                          ...prev,
                          role: "freelancer",
                        }))
                      }}
                    />
                    <label className="btn btn-outline-primary" htmlFor="freelancer">
                      <i className="bi bi-person-workspace me-2"></i>
                      Freelancer
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="userType"
                      id="client"
                      checked={userType === "client"}
                      onChange={() => {
                        setUserType("client")
                        setFormData((prev) => ({
                          ...prev,
                          role: "client",
                        }))
                      } }
                    />
                    <label className="btn btn-outline-primary" htmlFor="client">
                      <i className="bi bi-building me-2"></i>
                      Client
                    </label>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">First Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Enter first name"
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Last Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Enter last name"
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Username *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.username ? "is-invalid" : ""}`}
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Choose a unique username"
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Password *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Confirm Password *</label>
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm password"
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>

                  {/* Freelancer Specific Fields */}
                  {userType === "freelancer" && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Skills *</label>
                        <div className="input-group mb-2">
                          <input
                            type="text"
                            className="form-control"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            placeholder="Add a skill"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                          />
                          <button type="button" className="btn btn-outline-primary" onClick={addSkill}>
                            Add
                          </button>
                        </div>
                        <div className="d-flex flex-wrap gap-2">
                          {formData.skills.map((skill, index) => (
                            <span key={index} className="badge bg-primary">
                              {skill}
                              <button
                                type="button"
                                className="btn-close btn-close-white ms-2"
                                onClick={() => removeSkill(skill)}
                                style={{ fontSize: "0.7em" }}
                              ></button>
                            </span>
                          ))}
                        </div>
                        {errors.skills && <div className="text-danger small mt-1">{errors.skills}</div>}
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Experience Level *</label>
                          <select
                            className={`form-select ${errors.experience ? "is-invalid" : ""}`}
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                          >
                            <option value="">Select experience</option>
                            <option value="entry">Entry Level (0-2 years)</option>
                            <option value="intermediate">Intermediate (2-5 years)</option>
                            <option value="expert">Expert (5+ years)</option>
                          </select>
                          {errors.experience && <div className="invalid-feedback">{errors.experience}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Hourly Rate (USD) *</label>
                          <input
                            type="number"
                            className={`form-control ${errors.hourlyRate ? "is-invalid" : ""}`}
                            name="hourlyRate"
                            value={formData.hourlyRate}
                            onChange={handleInputChange}
                            placeholder="Enter hourly rate"
                            min="1"
                          />
                          {errors.hourlyRate && <div className="invalid-feedback">{errors.hourlyRate}</div>}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Client Specific Fields */}
                  {userType === "client" && (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Company Name *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.companyName ? "is-invalid" : ""}`}
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Enter company name"
                        />
                        {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
                      </div>

                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label className="form-label">Company Size *</label>
                          {/* <select
                            className={`form-select ${errors.companySize ? "is-invalid" : ""}`}
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleInputChange}
                          >
                            <option value="">Select company size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-500">201-500 employees</option>
                            <option value="500+">500+ employees</option>
                          </select> */}
                          <input
                            type="text"
                            className={`form-control ${errors.companySize ? "is-invalid" : ""}`}
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleInputChange}
                            placeholder="Enter company size"
                          />
                          {errors.companySize && <div className="invalid-feedback">{errors.companySize}</div>}
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Industry *</label>
                          <select
                            className={`form-select ${errors.industry ? "is-invalid" : ""}`}
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                          >
                            <option value="">Select industry</option>
                            <option value="technology">Technology</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.industry && <div className="invalid-feedback">{errors.industry}</div>}
                        </div>
                      </div>
                    </>
                  )}

                  <div className="mb-4">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="terms" required />
                      <label className="form-check-label" htmlFor="terms">
                        I agree to the{" "}
                        <a href="#" className="text-primary">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-2" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>

                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <button type="button" className="btn btn-link p-0 text-primary" onClick={onLogin}>
                      Sign In
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
