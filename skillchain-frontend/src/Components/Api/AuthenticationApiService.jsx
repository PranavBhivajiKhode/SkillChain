import { apiClient } from "./ApiClient";

export const executeRegistrationService = (requestBody) => 
    apiClient.post("/api/auth/register", requestBody)

export const executeOtpVerificationService = (requestBody) =>
    apiClient.post("/api/auth/verify-otp", requestBody)