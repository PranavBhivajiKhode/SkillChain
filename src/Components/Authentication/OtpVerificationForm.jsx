import { useState } from "react"
import { useAuth } from "../security/AuthContext"
import { executeOtpVerificationService } from "../Api/AuthenticationApiService"
import { useNavigate } from "react-router-dom"

function OtpVerificationForm() {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const nevigate = useNavigate(); 
  const authContext = useAuth();
  const {email, role} = authContext;

  const handleOtpChange = (e) => {
    setOtp(e.target.value)
    setError("")
    setSuccess("")
  }

  async function handleVerify(){
    if (!otp) {
      setError("Please enter the OTP.")
      return
    }

    setIsVerifying(true)

    try {
      const otpVerificationRequestBody = {
        email:email, 
        role:role, 
        otp:otp
      };

      const response = await executeOtpVerificationService(otpVerificationRequestBody);

      if (response.status === 200) {
        setSuccess("OTP verified successfully!");
        nevigate("/login");
      } else {
        setError(response.data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.")
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-3">Email Verification</h4>
        <p className="text-muted text-center mb-4">
          Please enter the OTP sent to <strong>{email}</strong>
        </p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="mb-3">
          <label className="form-label">OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={handleVerify}
          disabled={isVerifying}
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  )
}

export default OtpVerificationForm
