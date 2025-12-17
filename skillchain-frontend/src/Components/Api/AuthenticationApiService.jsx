import { apiClient } from "./ApiClient";

export const executeRegistrationService = (registrationRequestBody) => 
    apiClient.post("/users/auth/register", registrationRequestBody)

export const executeOtpVerificationService = (otpVerificationRequestBody) =>
    apiClient.post("/users/auth/verify-otp", otpVerificationRequestBody)

export const executeLoginService = (loginRequestBody) =>
    apiClient.post("/users/auth/login", loginRequestBody)



export const executeFreelancerRegistrationService = (registrationRequestBody) => 
    apiClient.post("/users/freelancer/register", registrationRequestBody)

export const executeClientRegistrationService3 = (registrationRequestBody) => 
    apiClient.post("/users/client/register", registrationRequestBody)
