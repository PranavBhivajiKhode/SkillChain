"use client"

import { useState } from "react"
import { useAuth } from "../security/AuthContext"
import { useNavigate } from "react-router-dom"

function RegistrationForm() {
  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  
  const authContext = useAuth()
  const navigate = useNavigate()

  function validateForm() {
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword || !selectedRole) {
      setError("Please fill in all fields")
      return false
    }
    if (username.length > 50) {
      setError("Username cannot be more than 50 characters")
      return false
    }
    if (firstName.length > 50 || lastName.length > 50) {
      setError("First name and Last name cannot exceed 50 characters")
      return false
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return false
    }
    if (password.length < 8 || password.length > 255) {
      setError("Password must be between 8 and 255 characters")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || email.length > 255) {
      setError("Please enter a valid email address (max 255 characters)")
      return false
    }
    return true
  }

  async function handleRegisteration() {
    if (!validateForm()) return

    setIsLoading(true)
    setError("")
    setSuccess("")

    const requestBody = {
      username,
      email,
      password,
      role: selectedRole,
      firstName: firstName,
      lastName: lastName
    }

    if (await authContext.registration(requestBody)) {
      navigate("/otp-verification")
    } else {
      setError("Failed Registration. Please check your credentials.")
    }

    setIsLoading(false)
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="text-center mb-4">
          <div
            className="bg-primary bg-opacity-25 rounded-circle d-flex justify-content-center align-items-center mx-auto mb-3"
            style={{ width: "60px", height: "60px" }}
          >
            <span style={{ fontSize: "24px" }}>👤</span>
          </div>
          <h3>Create Your Account</h3>
          <p className="text-muted">Join SkillChain and start your freelancing journey</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Role */}
        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select className="form-select" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="" disabled>Select a Role</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Client">Client</option>
          </select>
        </div>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>

        {/* First Name */}
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <div className="input-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          className="btn btn-primary w-100"
          onClick={handleRegisteration}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>

        <div className="text-center mt-3">
          <span className="text-muted">Already have an account? </span>
          <a href="/login">Sign in here</a>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm
