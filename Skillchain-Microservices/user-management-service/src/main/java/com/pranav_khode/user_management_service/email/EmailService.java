package com.pranav_khode.user_management_service.email;

public interface EmailService {
    void sendOtpEmail(String to, String otp);
}

