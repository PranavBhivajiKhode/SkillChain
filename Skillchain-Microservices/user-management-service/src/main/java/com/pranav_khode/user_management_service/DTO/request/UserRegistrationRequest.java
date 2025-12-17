package com.pranav_khode.user_management_service.DTO.request;


import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class UserRegistrationRequest {

	    // Common fields
	    @NotBlank
	    @Size(max = 50)
	    private String username;

	    @NotBlank
	    @Email
	    @Size(max = 255)
	    private String email;

	    @NotBlank
	    @Size(min = 8, max = 255)
	    private String password;

	    @NotBlank
	    @Size(min = 8, max = 255)
	    private String confirmPassword;

	    @NotBlank
	    private String role; // e.g., "FREELANCER" or "CLIENT"

	    @NotBlank
	    @Size(max = 50)
	    private String firstName;

	    @NotBlank
	    @Size(max = 50)
	    private String lastName;

	    @Pattern(regexp = "^[0-9]{10,15}$", message = "Phone number must be between 10–15 digits")
	    private String phone;

	    // Freelancer-specific fields
	    private List<@NotBlank String> skills; // each skill should be non-blank

	    private String experience; // e.g., "5 years", "Intermediate"

	    private String hourlyRate;

	    // Client-specific fields
	    private String companyName;

	    private String companySize;

	    private String industry;

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getConfirmPassword() {
			return confirmPassword;
		}

		public void setConfirmPassword(String confirmPassword) {
			this.confirmPassword = confirmPassword;
		}

		public String getRole() {
			return role;
		}

		public void setRole(String role) {
			this.role = role;
		}

		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getPhone() {
			return phone;
		}

		public void setPhone(String phone) {
			this.phone = phone;
		}

		public List<String> getSkills() {
			return skills;
		}

		public void setSkills(List<String> skills) {
			this.skills = skills;
		}

		public String getExperience() {
			return experience;
		}

		public void setExperience(String experience) {
			this.experience = experience;
		}

		public String getHourlyRate() {
			return hourlyRate;
		}

		public void setHourlyRate(String hourlyRate) {
			this.hourlyRate = hourlyRate;
		}

		public String getCompanyName() {
			return companyName;
		}

		public void setCompanyName(String companyName) {
			this.companyName = companyName;
		}

		public String getCompanySize() {
			return companySize;
		}

		public void setCompanySize(String companySize) {
			this.companySize = companySize;
		}

		public String getIndustry() {
			return industry;
		}

		public void setIndustry(String industry) {
			this.industry = industry;
		}
}

