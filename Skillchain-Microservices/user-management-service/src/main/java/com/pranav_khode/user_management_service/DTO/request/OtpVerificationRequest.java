package com.pranav_khode.user_management_service.DTO.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class OtpVerificationRequest {
	
	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Invalid email format")
	private String email;
	
	@NotBlank(message = "role cannot be empty")
	private String role;
	
	@NotBlank(message = "OTP cannot be empty")
    @Pattern(regexp = "^\\d{6}$", message = "OTP must be a 6-digit number")
    private String otp;

	public OtpVerificationRequest(
			@NotBlank(message = "Email cannot be empty") @Email(message = "Invalid email format") String email,
			@NotBlank(message = "role cannot be empty") String role,
			@NotBlank(message = "OTP cannot be empty") @Pattern(regexp = "^\\d{6}$", message = "OTP must be a 6-digit number") String otp) {
		super();
		this.email = email;
		this.role = role;
		this.otp = otp;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
	
}

