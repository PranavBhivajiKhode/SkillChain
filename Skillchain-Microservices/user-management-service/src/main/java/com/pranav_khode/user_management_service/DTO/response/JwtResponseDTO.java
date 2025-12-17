package com.pranav_khode.user_management_service.DTO.response;

public class JwtResponseDTO {
	private String token;
	private String username;

	public JwtResponseDTO(String token, String username) {
		super();
		this.username = username;
		this.token = token;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}

