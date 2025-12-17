"use client"

import { useState } from "react"
import { useAuth } from "../security/AuthContext"
import { useNavigate } from "react-router-dom"

const Login = ({ onRegister, onOTPVerification, onForgotPassword }) => {
  const [userType, setUserType] = useState("freelancer")
  const [formData, setFormData] = useState({
    email: "pranavedu16@gmail.com",
    password: "dummydummy",
    role:"freelancer"
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const authContext = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const success = await authContext.login(formData);
      if (success) {
        console.log("Login successful");

        if(userType === "freelancer"){
          navigate("/freelancer-dashboard")
        }else{
          navigate("/client-dashboard");
        }
      } else {
        setErrors("Invalid email, password, or role");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrors("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`)
    // Implement social login logic
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-primary mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your SkillChain account</p>
                </div>

                {/* User Type Selection */}
                <div className="mb-4">
                  <div className="btn-group w-100" role="group">
                    <input
                      type="radio"
                      className="btn-check"
                      name="userType"
                      id="freelancer-login"
                      checked={userType === "freelancer"}
                      onChange={() => {
                        setUserType("freelancer")
                        setFormData((prev) => ({
                          ...prev,
                          role: "freelancer",
                        }))
                      }}
                    />
                    <label className="btn btn-outline-primary" htmlFor="freelancer-login">
                      <i className="bi bi-person-workspace me-2"></i>
                      Freelancer
                    </label>

                    <input
                      type="radio"
                      className="btn-check"
                      name="userType"
                      id="client-login"
                      checked={userType === "client"}
                      onChange={() => {
                        setUserType("client")
                        setFormData((prev) => ({
                          ...prev,
                          role: "client",
                        }))
                      }}
                    />
                    <label className="btn btn-outline-primary" htmlFor="client-login">
                      <i className="bi bi-building me-2"></i>
                      Client
                    </label>
                  </div>
                </div>

                {errors.general && (
                  <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? "is-invalid" : ""}`}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  {/* <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">
                        Remember me
                      </label>
                    </div>
                    <button type="button" className="btn btn-link p-0 text-primary" onClick={onForgotPassword}>
                      Forgot Password?
                    </button>
                  </div> */}

                  <button type="submit" className="btn btn-primary w-100 py-2 mb-3" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Signing In...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </form>

                {/* Social Login */}
                {/* <div className="text-center mb-3">
                  <div className="position-relative">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted">
                      Or continue with
                    </span>
                  </div>
                </div> */}

                {/* <div className="row g-2 mb-4">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => handleSocialLogin("google")}
                    >
                      <i className="bi bi-google me-2"></i>
                      Google
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-100"
                      onClick={() => handleSocialLogin("linkedin")}
                    >
                      <i className="bi bi-linkedin me-2"></i>
                      LinkedIn
                    </button>
                  </div>
                </div> */}

                {/* <div className="text-center">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <button type="button" className="btn btn-link p-0 text-primary" onClick={onRegister}>
                      Sign Up
                    </button>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
