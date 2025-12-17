package com.pranav_khode.user_management_service.DTO.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class OtpResendRequset {
	
	@NotBlank(message = "Email cannot be empty")
	@Email(message = "Invalid email format")
	private String email;
	
	@NotBlank(message = "role cannot be empty")
	private String role;

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
	
	
}
