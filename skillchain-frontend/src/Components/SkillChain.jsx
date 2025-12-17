import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "./Authentication/RegistrationForm";
import OtpVerificationForm from "./Authentication/OtpVerificationForm";
import LoginForm from "./Authentication/LoginForm";
import AuthProvider from "./security/AuthContext";
import ClientDashboard from "./ClientUI/ClientDashboard";
import FreelancerDashboard from "./FreelancerUI/FreelancerDashboard";
import Registration from "./Authentication/Registration";
import Login from "./Authentication/Login";

function SkillChain() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/login2" element={<Login />}></Route>
            <Route path="/register" element={<RegistrationForm />}></Route>
            <Route path="/register2" element={<Registration />}></Route>
            <Route path="/otp-verification" element={<OtpVerificationForm />}></Route>
            <Route path="/client-dashboard" element={<ClientDashboard />}></Route>
            <Route path="/freelancer-dashboard" element={<FreelancerDashboard />}></Route>


            {/* <Route path="/freelancer-profile" element={<FreelancerProfile />}></Route> */}
            {/* <Route path="/client-profile" element={<ClientProfile />}/> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default SkillChain;
