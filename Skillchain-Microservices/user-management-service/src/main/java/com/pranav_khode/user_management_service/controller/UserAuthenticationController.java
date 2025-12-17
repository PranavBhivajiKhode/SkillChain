package com.pranav_khode.user_management_service.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.user_management_service.DAOservice.UserAuthenticationService;
import com.pranav_khode.user_management_service.DTO.request.OtpResendRequset;
import com.pranav_khode.user_management_service.DTO.request.OtpVerificationRequest;
import com.pranav_khode.user_management_service.DTO.request.UserLoginRequest;
import com.pranav_khode.user_management_service.DTO.request.UserRegistrationRequest;
import com.pranav_khode.user_management_service.response.ApiResponse;
import com.pranav_khode.user_management_service.response.LoginResponse;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users/auth")
public class UserAuthenticationController {
	
	private UserAuthenticationService authService;
	private Logger logger = LoggerFactory.getLogger(getClass());
	
	public UserAuthenticationController(UserAuthenticationService authService) {
		this.authService = authService;
	}
	
	@PostMapping("/register")
    public ResponseEntity<ApiResponse> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
		logger.info("from the registration method!");
        try {
        	authService.registerUser(request);
        	logger.info("Registration success!");
            return ResponseEntity.ok().body(new ApiResponse(true, "Registration successful. OTP sent to email."));
        } catch (RuntimeException e) {
        	logger.info(e.toString());
        	return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }
	
	@PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody OtpVerificationRequest request) {
        try {
        	authService.verifyOtp(request);
            return ResponseEntity.ok().body(new ApiResponse(true, "Email verified successfully!"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }
	
	@PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@Valid @RequestBody OtpResendRequset request) { 
        try {
        	authService.resendOtp(request);
            return ResponseEntity.ok().body(new ApiResponse(true, "New OTP sent to your email."));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, e.getMessage()));
        }
    }
	
	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@Valid @RequestBody UserLoginRequest request) {
		System.out.println("From login method!");
		try {
			LoginResponse response = authService.login(request);
			return ResponseEntity.ok().body(response);
		}catch(RuntimeException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse(false, "Authentication failed! \n Please register first!"));
		}
	}

}

