package com.pranav_khode.job_posting_service.DTO.request;

import java.util.List;

public class InitialJobFilterRequest {
	private List<String> skillSet;
	
	public InitialJobFilterRequest() {
		
	}

	public List<String> getSkillSet() {
		return skillSet;
	}

	public void setSkillSet(List<String> skillSet) {
		this.skillSet = skillSet;
	}
	
}
