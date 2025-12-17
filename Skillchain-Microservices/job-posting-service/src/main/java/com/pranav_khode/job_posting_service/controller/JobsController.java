package com.pranav_khode.job_posting_service.controller;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pranav_khode.job_posting_service.DAOService.JobService;
import com.pranav_khode.job_posting_service.DAOService.MilestoneService;
import com.pranav_khode.job_posting_service.DTO.request.CustomArgumentsJobFilterRequest;
import com.pranav_khode.job_posting_service.DTO.request.JobPostRequestDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobStatusUpdateDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobUpdateRequestDTO;
import com.pranav_khode.job_posting_service.DTO.request.MilestonePaymentDto;
import com.pranav_khode.job_posting_service.DTO.response.ClientNameAndJobTitle;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseDTO;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseForClient;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseForFreelancer;
import com.pranav_khode.job_posting_service.DTO.response.ListActiveJobForClientResponse;
import com.pranav_khode.job_posting_service.database.Jobs;
import com.pranav_khode.job_posting_service.database.Milestone;
import com.pranav_khode.job_posting_service.records.JobTitleAndMilestoneTitle;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/jobs")
public class JobsController {

    private final JobService service;
//    private final JobFileService jobFileService;
    private final MilestoneService milestoneService;
    
    private Logger logger = LoggerFactory.getLogger(getClass());

    public JobsController(JobService service,  MilestoneService milestoneService) {
        this.service = service;
//        this.jobFileService = jobFileService;
        this.milestoneService = milestoneService;
    }

    //Posts a job for client
    @PostMapping("/{clientId}")
    public ResponseEntity<JobResponseDTO> postJob(@Valid @RequestBody JobPostRequestDTO requestBody,
    				@PathVariable String clientId) {    	
        return service.saveJob(requestBody, clientId);
    }
    
    //Fetches all job of client.    
    @GetMapping("/{clientId}")
    public ResponseEntity<?> retreiveJobsForClient(@PathVariable String clientId) {
        Collection<JobResponseForClient> jobs =  service.retreiveJobsForClient(UUID.fromString(clientId));
        return ResponseEntity.ok().body(jobs);
    }
    
    //Fetches all 'IN_PROGRESS' jobs for client.
    @GetMapping("/status/IN_PROGRESS-and-COMPLETED/client/{clientId}")
    public ResponseEntity<Collection<ListActiveJobForClientResponse>> getActiveJobsForClient(@PathVariable String clientId) {
    	List<ListActiveJobForClientResponse> response = service.retreiveActiveJobsForClient(clientId);
    	return ResponseEntity.ok().body(response);
    }

    //Fetches all jobs for admin.
    @GetMapping
    public ResponseEntity<List<Jobs>> getAllJobs() {
        return service.getAllJobsFromDatabase();
    }
    
    //Assign free-lancer to job
    @PutMapping("/{jobId}/assign-freelancer/{freelancerId}")
    public boolean assignFreelancerToJob(@PathVariable("jobId") UUID jobId, @PathVariable("freelancerId") UUID freelancerId) {
    	return service.assignFreelancerToJob(jobId, freelancerId);
    }
    
    //Fetches 10 jobs for free-lancer when page loads
    @GetMapping("/initial-retrival")
    public ResponseEntity<Collection<JobResponseForFreelancer>> retreiveJobsForFreelancer() {
    	Collection<JobResponseForFreelancer> jobs = service.retreiveJobsForFreelancer();
    	return ResponseEntity.ok().body(jobs);
    }
    
    //Fetches job for free-lanccer using jobId
    @GetMapping("/{jobId}/freelancer")
    public ResponseEntity<JobResponseForFreelancer> fetchJobForFreelancer(@PathVariable String jobId) {
    	try {
    		JobResponseForFreelancer response = service.RetreiveJobForFreelancerUsingJobId(jobId);
        	return ResponseEntity.ok().body(response);
    	}catch(RuntimeException e) {
    		logger.warn(e.toString());
    		return ResponseEntity.notFound().build();
    	}
    }
    
    //Fetches all 'IN_PROGRESS' jobs for freelancer.
    @GetMapping("/status/IN_PROGRESS/freelancer/{freelancerId}")
    public ResponseEntity<Collection<ListActiveJobForClientResponse>> getActiveJobsForFreelancer(@PathVariable String freelancerId) {
    	Collection<ListActiveJobForClientResponse> response = service.retreiveActiveJobsForFreelancer(freelancerId);
    	return ResponseEntity.ok().body(response);
    }
    
    
    //Upload the files for job. 
//    @PostMapping("/files/upload")
//    public ResponseEntity<List<JobFile>> uploadFilesForJob(@RequestParam String jobId, @RequestParam String userType,
//    		@RequestParam MultipartFile[] files) {
//    	List<JobFile> uploadedFiles  = jobFileService.saveFiles(UUID.fromString(jobId), userType, files);
//    	return ResponseEntity.ok(uploadedFiles);
//    }
    
    //Upload the files for milestone
    @PostMapping("/milestone/files/upload")
    public void uploadFilesforMilestone(@RequestParam String milestoneId, @RequestParam String userType, @RequestParam MultipartFile[] files) {
    	
    }
    
    //Update milestone status
    @PutMapping("/milestone/update-status")
    public  ResponseEntity<?> updateMilestoneStatus(@RequestParam String jobId, @RequestParam  String milestoneId, String updatedStatus) {
    	try {
    		Milestone milestone =  milestoneService.updateMilestoneStatus(jobId, milestoneId, updatedStatus);
    		return ResponseEntity.status(HttpStatus.OK).body(milestone);
    	}catch(Exception exception) {
    		logger.warn(exception.toString());
    		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception);
    	}
    }
    
    //Update Job status
    @PutMapping("/update-status")
    public ResponseEntity<?> updateJobStatus(@RequestParam String jobId, @RequestParam String updatedStatus) {
    	try {
    		Jobs job = service.updateJobStatus(jobId, updatedStatus);
    		return ResponseEntity.status(HttpStatus.OK).body(job);
    	}catch (EntityNotFoundException e) {
    	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    	} catch (IllegalArgumentException e) {
    	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    	} catch (Exception e) {
    	    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error");
    	}
    }
    
    //Fetch job title and milestone title using jobId and milestoneId for payment service
    @GetMapping("/job-title/milestone-title")
	public  JobTitleAndMilestoneTitle retrieveJobTitleAndMilestoneTitle(@RequestParam UUID jobId, 
			 @RequestParam UUID milestoneId) {
    	try {
			return service.retrieveJobTitleAndMilestoneTitle(jobId, milestoneId);
		} catch (Exception e) {
			throw new EntityNotFoundException();
		}
    }
    
  //Fetch job title using jobId for payment service
    @GetMapping("/job-title")
	public  String retrieveJobTitle(@RequestParam UUID jobId) {
    	try {
			return service.retrieveJobTitle(jobId);
		} catch (Exception e) {
			throw new EntityNotFoundException();
		}
    }
    
    @PutMapping("/milestone/payment")
    public void manageMilestonePayment(@RequestBody MilestonePaymentDto dto) {
    	milestoneService.managePayment(dto);
    }
    

    @PutMapping("/{jobId}/update-status/closed")
    public ResponseEntity<?> closeJob(@PathVariable String jobId) {
    	boolean success = service.updateJobStatusToClosed(jobId);
    	if(success) {
    		return ResponseEntity.ok().build();
    	}else {
    		return ResponseEntity.notFound().build();
    	}
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResponseDTO> updateJob(@PathVariable UUID id,
            				@Valid @RequestBody JobUpdateRequestDTO requestBody) {
        return service.updateJobIntoDatabase(id, requestBody);
    }

    
    @PutMapping("/{id}/update-status")
    public ResponseEntity<Jobs> updateJobStatus(@PathVariable UUID id, 
    						@Validated @RequestBody JobStatusUpdateDTO requestBody) {
        return service.updateJobStatusFromDatabase(requestBody, id);
    }
    

    @PostMapping("/custom-filter")
    public ResponseEntity<List<Jobs>> retreiveJobsUsingCustomFilter(@Valid @RequestBody CustomArgumentsJobFilterRequest filter) {
        return ResponseEntity.ok(service.filterJobs(filter));
    }
    
    
    
    @PostMapping("/fetch/title-and-clientname")
    public HashMap<UUID, ClientNameAndJobTitle> retrieveNameAndJobTitle(@RequestBody List<UUID> jobIds) {
    	return service.findClientNameAndJobTitle(jobIds);
    }
}





