package com.pranav_khode.job_posting_service.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.job_posting_service.DAOService.JobDAOService;
import com.pranav_khode.job_posting_service.DTO.request.JobPostRequestDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobStatusUpdateDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobUpdateRequestDTO;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseDTO;
import com.pranav_khode.job_posting_service.database.Jobs;

@RestController
public class JobsController {
	
	private JobDAOService service;
	
	public JobsController(JobDAOService service) {
		this.service = service;
	}
	
	@PostMapping("/jobs")
	public ResponseEntity<JobResponseDTO> postJob(@Validated @RequestBody JobPostRequestDTO requestBody) {
		return service.saveJobIntoDatabase(requestBody);
	}
	
	@GetMapping("/jobs")
	public ResponseEntity<List<Jobs>> getAllJobs(){
		return service.getAllJobsFromDatabase();
	}
	
	@GetMapping("/jobs/{id}")
	public ResponseEntity<Jobs> getJob(@PathVariable UUID id){
		return service.getJobFromDatabase(id);
	}
	
	@PutMapping("/jobs/{id}")
	public ResponseEntity<JobResponseDTO> updateJob(@Validated @RequestBody JobUpdateRequestDTO requestBody){
		return service.updateJobIntoDatabase(requestBody);
	}
	
	@PatchMapping("/jobs/{id}/status")
	public  ResponseEntity<Jobs> updateJobStatus(@Validated @RequestBody JobStatusUpdateDTO requestBody, @PathVariable String id){
		return service.updateJobStatusFromDatabase(requestBody, id);
	}
}
