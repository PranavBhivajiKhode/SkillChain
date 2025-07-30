package com.pranav_khode.job_posting_service.DAOService;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.pranav_khode.job_posting_service.DTO.request.JobPostRequestDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobStatusUpdateDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobUpdateRequestDTO;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseDTO;
import com.pranav_khode.job_posting_service.database.Jobs;
import com.pranav_khode.job_posting_service.database.JobsRepository;

@Repository
public class JobDAOService {
	
	private JobsRepository repository;
	
	public JobDAOService(JobsRepository repository) {
		this.repository = repository;
	}
	
	public ResponseEntity<JobResponseDTO> saveJobIntoDatabase(JobPostRequestDTO requestBody) {
		
	    Jobs job = new Jobs();

	    job.setClientId(UUID.fromString(requestBody.getClientId()));
	    job.setTitle(requestBody.getTitle());
	    job.setDescription(requestBody.getDescription());
	    job.setBudgetAmount(requestBody.getBudgetAmount());
	    job.setBudgetCurrency(requestBody.getBudgetCurrency());
	    job.setJobType(requestBody.getJobType());
	    job.setRequiredSkills(requestBody.getRequiredSkills());
	    job.setDeadlineDate(
	        requestBody.getDeadlineDate() != null ? LocalDate.parse(requestBody.getDeadlineDate()) : null
	    );

	    Jobs saved = repository.save(job);

	    JobResponseDTO response = new JobResponseDTO();
	    response.setJobId(saved.getJobId().toString());
	    response.setClientId(saved.getClientId().toString());
	    response.setTitle(saved.getTitle());
	    response.setDescription(saved.getDescription());
	    response.setBudgetAmount(saved.getBudgetAmount());
	    response.setBudgetCurrency(saved.getBudgetCurrency());
	    response.setJobType(saved.getJobType());
	    response.setRequiredSkills(saved.getRequiredSkills());
	    response.setDeadlineDate(saved.getDeadlineDate() != null ? saved.getDeadlineDate().toString() : null);
	    response.setStatus(saved.getStatus());
	    response.setCreatedAt(saved.getCreatedAt().toString());
	    response.setUpdatedAt(saved.getUpdatedAt().toString());
	    response.setAssignedFreelancerId(
	        saved.getAssignedFreelancerId() != null ? saved.getAssignedFreelancerId().toString() : null
	    );

	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	public ResponseEntity<Jobs> getJobFromDatabase(UUID id) {
		Jobs job = repository.findById(id).orElse(null);
		if(job == null) {
			throw new RuntimeException(String.format("Invalid job ID. Unable to retrieve the job details for id -> %s", id));
		}
		return ResponseEntity.ok().body(job);
		
	}

	public ResponseEntity<JobResponseDTO> updateJobIntoDatabase(JobUpdateRequestDTO requestBody) {
		UUID jodId = UUID.fromString(requestBody.getJobId());
		boolean jobExists = repository.existsById(jodId);
		if(jobExists) {
			repository.deleteById(jodId);
		}
		Jobs job = new Jobs();

	    job.setClientId(UUID.fromString(requestBody.getClientId()));
	    job.setTitle(requestBody.getTitle());
	    job.setDescription(requestBody.getDescription());
	    job.setBudgetAmount(requestBody.getBudgetAmount());
	    job.setBudgetCurrency(requestBody.getBudgetCurrency());
	    job.setJobType(requestBody.getJobType());
	    job.setRequiredSkills(requestBody.getRequiredSkills());
	    job.setDeadlineDate(
	        requestBody.getDeadlineDate() != null ? LocalDate.parse(requestBody.getDeadlineDate()) : null
	    );

	    Jobs saved = repository.save(job);

	    JobResponseDTO response = new JobResponseDTO();
	    response.setJobId(saved.getJobId().toString());
	    response.setClientId(saved.getClientId().toString());
	    response.setTitle(saved.getTitle());
	    response.setDescription(saved.getDescription());
	    response.setBudgetAmount(saved.getBudgetAmount());
	    response.setBudgetCurrency(saved.getBudgetCurrency());
	    response.setJobType(saved.getJobType());
	    response.setRequiredSkills(saved.getRequiredSkills());
	    response.setDeadlineDate(saved.getDeadlineDate() != null ? saved.getDeadlineDate().toString() : null);
	    response.setStatus(saved.getStatus());
	    response.setCreatedAt(saved.getCreatedAt().toString());
	    response.setUpdatedAt(saved.getUpdatedAt().toString());
	    response.setAssignedFreelancerId(
	        saved.getAssignedFreelancerId() != null ? saved.getAssignedFreelancerId().toString() : null
	    );

	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	public ResponseEntity<Jobs> updateJobStatusFromDatabase(JobStatusUpdateDTO requestBody, String id) {
		Jobs job = repository.findById(UUID.fromString(id)).orElse(null);
		if(job == null) {
			throw new RuntimeException(String.format("Job not found for id -> %s ", id));
		}
		job.setStatus(requestBody.getStatus());
		repository.deleteById(UUID.fromString(id));
		repository.save(job);
		return ResponseEntity.ok().body(job);
	}

	public ResponseEntity<List<Jobs>> getAllJobsFromDatabase() {
		List<Jobs> jobs = repository.findAll();
		return ResponseEntity.ok().body(jobs);

	}
}


