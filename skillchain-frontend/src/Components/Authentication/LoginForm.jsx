"use client";

import { useState } from "react";
import { useAuth } from "../security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const authContext = useAuth();
  const navigate = useNavigate();

  function validateForm() {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password || !selectedRole) {
      setError("Please fill in all fields");
      return false;
    }
    if (password.length < 8 || password.length > 255) {
      setError("Password must be between 8 and 255 characters");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 255) {
      setError("Please enter a valid email address (max 255 characters)");
      return false;
    }
    return true;
  }

  async function handleLogin() {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const loginRequestBody = {
        email: email.trim(),
        password: password,
        role: selectedRole.toUpperCase() // ensure consistent casing
      };

      const success = await authContext.login(loginRequestBody);

      if (success) {
        console.log("Login successful");

        if(selectedRole == "FREELANCER"){
          navigate("/freelancer-dashboard")
        }else{
          navigate("/client-dashboard");
        }
      } else {
        setError("Invalid email, password, or role");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <h3>Login</h3>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="mb-3 text-start">
            <label className="form-label">Select Role</label>
            <select
              className="form-select"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="" disabled>Select a role</option>
              <option value="FREELANCER">Freelancer</option>
              <option value="CLIENT">Client</option>
            </select>
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={255}
            />
          </div>

          <div className="mb-3 text-start">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={255}
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

          <div className="mb-3">
            <button
              className="btn btn-primary w-100"
              onClick={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
