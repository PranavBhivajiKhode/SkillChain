package com.pranav_khode.user_management_service.response;

public class LoginResponse {
	
	private boolean success;
	private String  token;
	private String username;
	private String userID;
	
	public LoginResponse(boolean success, String token, String username, String userID) {
		super();
		this.success = success;
		this.token = token;
		this.username = username;
		this.userID = userID;
	}

	public boolean isSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
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

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}
	
}
