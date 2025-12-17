package com.pranav_khode.user_management_service.email;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOtpEmail(String to, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("pranavkhode610@gmail.com"); 
        message.setTo(to);
        message.setSubject("SkillChain: Your Registration Verification Code");
        message.setText("Hello,\n\nYour verification code for SkillChain registration is: " + otp +
                        "\n\nThis code is valid for 5 minutes. If you did not request this, please ignore this email.\n\nBest regards,\nSkillChain Team");
        mailSender.send(message);
    }
}
