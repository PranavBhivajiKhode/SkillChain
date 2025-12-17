package com.pranav_khode.user_management_service.DTO.response;

import java.util.UUID;

public class UserProfileResponseDTO {

    private UUID userId;

    private String username;

    private String firstName;

    private String lastName;

    private Role role;

    private String bio;

    private String profilePictureUrl;

    public enum Role {
        FREELANCER,
        CLIENT
    }
    
    public UserProfileResponseDTO() {
    	
    }

	public UUID getUserId() {
		return userId;
	}

	public void setUserId(UUID userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public String getProfilePictureUrl() {
		return profilePictureUrl;
	}

	public void setProfilePictureUrl(String profilePictureUrl) {
		this.profilePictureUrl = profilePictureUrl;
	}
    
    
}

