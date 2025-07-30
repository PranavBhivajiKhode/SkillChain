import { BrowserRouter, Routes, Route } from "react-router-dom"
import RegistrationForm from "./Authentication/RegistrationForm"
import OtpVerificationForm from "./Authentication/OtpVerificationForm"
import LoginForm from "./Authentication/LoginForm"
import AuthProvider from "./security/AuthContext"
import FreelancerProfile from "./ProfileForm/FreelancerProfile/FreelancerProfile.jsx"
import ClientProfile from "./ProfileForm/ClientProfile/ClientProfile.jsx"

function SkillChain() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RegistrationForm />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/register" element={<RegistrationForm />}></Route>
            <Route path="/otp-verification" element={<OtpVerificationForm />}></Route>
            <Route path="/freelancer-profile" element={<FreelancerProfile />}></Route>
            <Route path="/client-profile" element={<ClientProfile />}/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default SkillChain
