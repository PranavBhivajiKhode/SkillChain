package com.pranav_khode.job_posting_service.DTO.request;


import com.pranav_khode.job_posting_service.DTO.enums.JobStatus;

import jakarta.validation.constraints.NotNull;

public class JobStatusUpdateDTO {
    @NotNull
    private JobStatus status; 
    
    public JobStatusUpdateDTO() {
    	
    }

	public JobStatus getStatus() {
		return status;
	}

	public void setStatus(JobStatus status) {
		this.status = status;
	}
    
    
}


