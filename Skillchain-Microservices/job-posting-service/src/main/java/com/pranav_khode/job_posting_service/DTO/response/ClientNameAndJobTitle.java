package com.pranav_khode.job_posting_service.DTO.response;

public class ClientNameAndJobTitle {
	private String clientName;
	private String title;
	
	public ClientNameAndJobTitle() {
		
	}
	
	public ClientNameAndJobTitle(String title, String userName) {
		this.clientName = userName;
		this.title = title;
	}

	public String getClientName() {
		return clientName;
	}
	
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
}
