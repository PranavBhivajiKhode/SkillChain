package com.pranav_khode.job_posting_service.DAOService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pranav_khode.job_posting_service.DTO.request.CustomArgumentsJobFilterRequest;
import com.pranav_khode.job_posting_service.DTO.request.JobPostRequestDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobStatusUpdateDTO;
import com.pranav_khode.job_posting_service.DTO.request.JobUpdateRequestDTO;
import com.pranav_khode.job_posting_service.DTO.response.ClientNameAndJobTitle;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseDTO;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseForClient;
import com.pranav_khode.job_posting_service.DTO.response.JobResponseForFreelancer;
import com.pranav_khode.job_posting_service.DTO.response.ListActiveJobForClientResponse;
import com.pranav_khode.job_posting_service.DTO.response.ListMilestoneForActiveJob;
import com.pranav_khode.job_posting_service.DTO.response.MilestoneResponseForJob;
import com.pranav_khode.job_posting_service.database.JobSpecifications;
import com.pranav_khode.job_posting_service.database.Jobs;
import com.pranav_khode.job_posting_service.database.JobsRepository;
import com.pranav_khode.job_posting_service.database.Milestone;
import com.pranav_khode.job_posting_service.database.MilestoneRepository;
import com.pranav_khode.job_posting_service.enums.JobStatus;
import com.pranav_khode.job_posting_service.proxy.UserServiceProxy;
import com.pranav_khode.job_posting_service.records.JobTitleAndMilestoneTitle;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class JobService {

    private final JobsRepository jobRepository;
//    private final JobFileRepository jobFileRepository;
    private final MilestoneRepository milestoneRepository;
//    private final MilestoneFileRepository milestoneFileRepository;
    private final MilestoneService milestoneService;
    private final UserServiceProxy userServiceProxy;

    public JobService(JobsRepository jobRepository, MilestoneService milestoneService, 
    		UserServiceProxy userServiceProxy,
    		MilestoneRepository milestoneRepository
    		) {
        this.jobRepository = jobRepository;
        this.userServiceProxy = userServiceProxy;
//        this.jobFileRepository = jobFileRepository;
        this.milestoneRepository = milestoneRepository;
//        this.milestoneFileRepository = milestoneFileRepository;
        this.milestoneService = milestoneService;
    }
    
    //Save job to database
    @Transactional
    public ResponseEntity<JobResponseDTO> saveJob(JobPostRequestDTO request, String clientId) {
        Jobs job = mapToEntity(request, clientId);
        Jobs savedJob = jobRepository.save(job);
        
        milestoneService.saveMilestones(request.getMilestones(), savedJob);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(mapToResponseDTO(savedJob));
    }
    
    //Fetches all jobs posted by client
    public Collection<JobResponseForClient> retreiveJobsForClient(UUID id) {
    	
    	List<Jobs> jobs = jobRepository.findByClientId(id);
    	
    	List<UUID> jobIds = new ArrayList<UUID>();
    	for(Jobs job : jobs) {
    		jobIds.add(job.getJobId());
    	}
    	
    	Map<UUID, List<String>> skillsMap = jobRepository.findJobsSkills(jobIds)
                .stream()
                .collect(Collectors.groupingBy(
                    obj -> (UUID) obj[0],
                    Collectors.mapping(obj -> (String) obj[1], Collectors.toList())
                ));
    	
    	for (Jobs job : jobs) {
            job.setRequiredSkills(skillsMap.getOrDefault(job.getJobId(), new ArrayList<>()));
        }
    	
    	HashMap<UUID, JobResponseForClient> map = new HashMap<UUID, JobResponseForClient>();
    	
    	for(Jobs job : jobs) {
    		UUID jobId = job.getJobId();
    		JobResponseForClient data = new JobResponseForClient();
    	
    		data.setJobId(job.getJobId());
    		data.setTitle(job.getTitle());
    		data.setDescription(job.getDescription());
    		data.setBudgetAmount(job.getBudgetAmount());
    		data.setBudgetCurrency(job.getBudgetCurrency());
    		data.setJobType(job.getJobType());
    		data.setRequiredSkills(job.getRequiredSkills());
    		data.setDeadlineDate(job.getDeadlineDate());
    		data.setStatus(job.getStatus());
    		data.setAssignedFreelancerId(job.getAssignedFreelancerId());
    		data.setTotalViews(job.getTotalViews());
    		data.setTotalProposals(job.getTotalProposals());
    		data.setCreatedAt(job.getCreatedAt());
    		data.setUpdatedAt(job.getUpdatedAt());
    		data.setMilestones(new ArrayList<MilestoneResponseForJob>());
    		
    		map.put(jobId, data);
    	}
    	
    	List<Milestone> milestones = milestoneRepository.findByJobIn(jobs);
    	
    	for(Milestone milestone : milestones) {
    		UUID jobId = milestone.getJob().getJobId();
    		MilestoneResponseForJob data = new MilestoneResponseForJob();
    		
    		data.setMilestoneId(milestone.getMilestoneId());
    		data.setTitle(milestone.getTitle());
    		data.setDescription(milestone.getDescription());
    		data.setBudgetAmount(milestone.getBudgetAmount());
    		data.setBudgetCurrency(milestone.getBudgetCurrency());
    		data.setStatus(milestone.getStatus());
    		data.setDeadlineDate(milestone.getDeadlineDate());
    		data.setOrderIndex(milestone.getOrderIndex());

    		map.get(jobId).getMilestones().add(data);
    	}

    	return map.values();
    }

    //Fetches all Active jobs posted by client
    public List<ListActiveJobForClientResponse> retreiveActiveJobsForClient(String id) {
        UUID clientId = UUID.fromString(id);

        List<JobStatus> statuses = Arrays.asList(
        	    JobStatus.IN_PROGRESS,
        	    JobStatus.COMPLETED_VERIFIED,
        	    JobStatus.COMPLETED_WAITING_VERIFICATION
        	);

        List<Jobs> activeJobs = jobRepository.findByClientIdAndStatusIn(clientId, statuses);


//        List<JobFile> jobFiles = jobFileRepository.findByJobIn(activeJobs);

        List<Milestone> milestones = milestoneRepository.findByJobIn(activeJobs);

        // Step 4: Fetch related milestone files in one go
//        List<MilestoneFile> milestoneFiles = milestoneFileRepository.findByMilestoneIn(milestones);
        
//        Map<UUID, List<MilestoneFile>> milestoneFilesMap = new HashMap<>();
        
//        for (MilestoneFile mf : milestoneFiles) {
//            UUID milestoneId = mf.getMilestone().getMilestoneId();
//            milestoneFilesMap.computeIfAbsent(milestoneId, k -> new ArrayList<>());
//            milestoneFilesMap.get(milestoneId).add(mf);
//        }


        Map<UUID, ListActiveJobForClientResponse> map = new HashMap<>();

        for (Jobs job : activeJobs) {
            ListActiveJobForClientResponse data = new ListActiveJobForClientResponse();
            data.setJobId(job.getJobId().toString());
            data.setTitle(job.getTitle());
            data.setDescription(job.getDescription());
            data.setBudgetAmount(job.getBudgetAmount());
            data.setBudgetCurrency(job.getBudgetCurrency());
            data.setStatus(job.getStatus().toString());
            data.setAssignedFreelancerId(job.getAssignedFreelancerId() != null
                    ? job.getAssignedFreelancerId().toString()
                    : null);
//            data.setFiles(new ArrayList<>());
            data.setMilestones(new ArrayList<>());

            map.put(job.getJobId(), data);
        }

//        for (JobFile file : jobFiles) {
//            UUID jobId = file.getJob().getJobId();
//            map.get(jobId).getFiles().add(file);
//        }

        for (Milestone milestone : milestones) {
            ListMilestoneForActiveJob milestoneForActiveJob = new ListMilestoneForActiveJob();
            milestoneForActiveJob.setId(milestone.getMilestoneId().toString());
            milestoneForActiveJob.setTitle(milestone.getTitle());
            milestoneForActiveJob.setAmount(milestone.getBudgetAmount());
            milestoneForActiveJob.setCurrency(milestone.getBudgetCurrency());
            milestoneForActiveJob.setStatus(milestone.getStatus().toString());
            milestoneForActiveJob.setPaid(milestone.isPaid());

//            List<MilestoneFile> files = milestoneFilesMap.getOrDefault(milestone.getMilestoneId(), new ArrayList<>());
//            milestoneForActiveJob.setFiles(files);

            UUID jobId = milestone.getJob().getJobId();
            map.get(jobId).getMilestones().add(milestoneForActiveJob);
        }

        List<ListActiveJobForClientResponse> response =  new ArrayList<>(map.values());
        return response;
    }
    
  //Fetches all Active jobs for freelancer.
    public Collection<ListActiveJobForClientResponse> retreiveActiveJobsForFreelancer(String id) {
        UUID freelancerId = UUID.fromString(id);

        List<Jobs> activeJobs = jobRepository.findByAssignedFreelancerIdAndStatus(freelancerId, JobStatus.IN_PROGRESS);

//        List<JobFile> jobFiles = jobFileRepository.findByJobIn(activeJobs);

        List<Milestone> milestones = milestoneRepository.findByJobIn(activeJobs);

        // Step 4: Fetch related milestone files in one go
//        List<MilestoneFile> milestoneFiles = milestoneFileRepository.findByMilestoneIn(milestones);
        
//        Map<UUID, List<MilestoneFile>> milestoneFilesMap = new HashMap<>();
        
//        for (MilestoneFile mf : milestoneFiles) {
//            UUID milestoneId = mf.getMilestone().getMilestoneId();
//            milestoneFilesMap.computeIfAbsent(milestoneId, k -> new ArrayList<>());
//            milestoneFilesMap.get(milestoneId).add(mf);
//        }


        Map<UUID, ListActiveJobForClientResponse> map = new HashMap<>();

        for (Jobs job : activeJobs) {
            ListActiveJobForClientResponse data = new ListActiveJobForClientResponse();
            data.setJobId(job.getJobId().toString());
            data.setTitle(job.getTitle());
            data.setDescription(job.getDescription());
            data.setBudgetAmount(job.getBudgetAmount());
            data.setBudgetCurrency(job.getBudgetCurrency());
            data.setStatus(job.getStatus().toString());
            data.setAssignedFreelancerId(job.getAssignedFreelancerId() != null
                    ? job.getAssignedFreelancerId().toString()
                    : null);
//            data.setFiles(new ArrayList<>());
            data.setMilestones(new ArrayList<>());

            map.put(job.getJobId(), data);
        }
//
//        for (JobFile file : jobFiles) {
//            UUID jobId = file.getJob().getJobId();
//            map.get(jobId).getFiles().add(file);
//        }

        for (Milestone milestone : milestones) {
            ListMilestoneForActiveJob milestoneForActiveJob = new ListMilestoneForActiveJob();
            milestoneForActiveJob.setId(milestone.getMilestoneId().toString());
            milestoneForActiveJob.setTitle(milestone.getTitle());
            milestoneForActiveJob.setAmount(milestone.getBudgetAmount());
            milestoneForActiveJob.setCurrency(milestone.getBudgetCurrency());
            milestoneForActiveJob.setStatus(milestone.getStatus().toString());
            milestoneForActiveJob.setPaid(milestone.isPaid());

//            List<MilestoneFile> files = milestoneFilesMap.getOrDefault(milestone.getMilestoneId(), new ArrayList<>());
//            milestoneForActiveJob.setFiles(files);

            UUID jobId = milestone.getJob().getJobId();
            map.get(jobId).getMilestones().add(milestoneForActiveJob);
        }

        return map.values();
    }

    
    //Fetches 10 jobs for freelancer when page loads
    public Collection<JobResponseForFreelancer> retreiveJobsForFreelancer(){
    	
    	List<Jobs> jobs =  jobRepository.findRandomJobs();
    	
    	List<UUID> jobIds = new ArrayList<UUID>();
    	for(Jobs job : jobs) {
    		jobIds.add(job.getJobId());
    	}
    	
    	Map<UUID, List<String>> skillsMap = jobRepository.findJobsSkills(jobIds)
                .stream()
                .collect(Collectors.groupingBy(
                    obj -> (UUID) obj[0],
                    Collectors.mapping(obj -> (String) obj[1], Collectors.toList())
                ));
    	
    	for (Jobs job : jobs) {
            job.setRequiredSkills(skillsMap.getOrDefault(job.getJobId(), new ArrayList<>()));
        }
    	
    	HashMap<UUID, JobResponseForFreelancer> map = new HashMap<UUID, JobResponseForFreelancer>();
    	
    	for(Jobs job : jobs) {
    		UUID jobId = job.getJobId();
    		JobResponseForFreelancer data = new JobResponseForFreelancer();
    	
    		data.setJobId(job.getJobId());
    		data.setTitle(job.getTitle());
    		data.setDescription(job.getDescription());
    		data.setBudgetAmount(job.getBudgetAmount());
    		data.setBudgetCurrency(job.getBudgetCurrency());
    		data.setJobType(job.getJobType());
    		data.setRequiredSkills(job.getRequiredSkills());
    		data.setDeadlineDate(job.getDeadlineDate());
    		data.setStatus(job.getStatus());
    		data.setAssignedFreelancerId(job.getAssignedFreelancerId());
    		data.setTotalViews(job.getTotalViews());
    		data.setTotalProposals(job.getTotalProposals());
    		data.setCreatedAt(job.getCreatedAt());
    		data.setUpdatedAt(job.getUpdatedAt());
    		data.setMilestones(new ArrayList<MilestoneResponseForJob>());
    		
    		map.put(jobId, data);
    	}
    	
    	List<Milestone> milestones = milestoneRepository.findByJobIn(jobs);
    	
    	for(Milestone milestone : milestones) {
    		UUID jobId = milestone.getJob().getJobId();
    		MilestoneResponseForJob data = new MilestoneResponseForJob();
    		
    		data.setMilestoneId(milestone.getMilestoneId());
    		data.setTitle(milestone.getTitle());
    		data.setDescription(milestone.getDescription());
    		data.setBudgetAmount(milestone.getBudgetAmount());
    		data.setBudgetCurrency(milestone.getBudgetCurrency());
    		data.setStatus(milestone.getStatus());
    		data.setDeadlineDate(milestone.getDeadlineDate());
    		data.setOrderIndex(milestone.getOrderIndex());

    		map.get(jobId).getMilestones().add(data);
    	}

    	return map.values();
    }
    
    //Fetches job for freelancer using jobId.
	public JobResponseForFreelancer RetreiveJobForFreelancerUsingJobId(String id) {
		UUID jobId = UUID.fromString(id);
		Jobs job = jobRepository.findById(jobId).orElse(null);
		if(job == null) {
			throw new RuntimeException(String.format("Job with jobId -> {} not found!", jobId));
		}
		
		List<String> skills = jobRepository.findJobSkills(jobId);
		List<Milestone> milestones = milestoneRepository.findByJob(job);
		
		JobResponseForFreelancer response = new JobResponseForFreelancer();
		response.setJobId(jobId);
		response.setTitle(job.getTitle());
		response.setDescription(job.getDescription());
		response.setBudgetAmount(job.getBudgetAmount());
		response.setBudgetCurrency(job.getBudgetCurrency());
		response.setJobType(job.getJobType());
		response.setRequiredSkills(skills);
		response.setDeadlineDate(job.getDeadlineDate());
		response.setStatus(job.getStatus());
		response.setAssignedFreelancerId(job.getAssignedFreelancerId());
		response.setTotalViews(job.getTotalViews());
		response.setTotalProposals(job.getTotalProposals());
		response.setCreatedAt(job.getCreatedAt());
		response.setUpdatedAt(job.getUpdatedAt());
		response.setMilestones(new ArrayList<MilestoneResponseForJob>());
		
		for(Milestone milestone : milestones) {
			MilestoneResponseForJob data = new MilestoneResponseForJob();
			data.setMilestoneId(milestone.getMilestoneId());
			data.setTitle(milestone.getTitle());
			data.setDescription(milestone.getDescription());
			data.setBudgetAmount(milestone.getBudgetAmount());
			data.setBudgetCurrency(milestone.getBudgetCurrency());
			data.setStatus(milestone.getStatus());
			data.setDeadlineDate(milestone.getDeadlineDate());
			data.setOrderIndex(milestone.getOrderIndex());
			
			response.getMilestones().add(data);
		}
		
		return response;
	}

    @Transactional
    public ResponseEntity<JobResponseDTO> updateJobIntoDatabase(UUID id, JobUpdateRequestDTO request) {
        Jobs existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found for ID: " + id));

        existingJob.setClientId(UUID.fromString(request.getClientId()));
        existingJob.setTitle(request.getTitle());
        existingJob.setDescription(request.getDescription());
        existingJob.setBudgetAmount(request.getBudgetAmount());
        existingJob.setBudgetCurrency(request.getBudgetCurrency());
        existingJob.setJobType(request.getJobType());
        existingJob.setRequiredSkills(request.getRequiredSkills());

        if (request.getDeadlineDate() != null) {
            existingJob.setDeadlineDate(LocalDate.parse(request.getDeadlineDate()));
        }

        Jobs updated = jobRepository.save(existingJob);
        return ResponseEntity.ok(mapToResponseDTO(updated));
    }
    
    @Transactional
    public ResponseEntity<Jobs> updateJobStatusFromDatabase(JobStatusUpdateDTO request, UUID id) {
        Jobs job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found for ID: " + id));

        job.setStatus(request.getStatus());
        return ResponseEntity.ok(jobRepository.save(job));
    }
    
    public ResponseEntity<List<Jobs>> getAllJobsFromDatabase() {
        return ResponseEntity.ok(jobRepository.findAll());
    }
    
    public List<Jobs> filterJobs(CustomArgumentsJobFilterRequest filter) {
    	
    	Specification<Jobs> spec = JobSpecifications.hasKeyword(filter.getKeyword());
    	
    	if(!filter.getBudgetRange().equalsIgnoreCase("all")) {
    		spec = spec == null ? JobSpecifications.hasBudgetRange(filter.parseBudgetRange())
    							: spec.and(JobSpecifications.hasBudgetRange(filter.parseBudgetRange()));
    	}
    	
    	if(!filter.getStatus().equalsIgnoreCase("all")) {
    		spec = spec == null ? JobSpecifications.hasStatus(JobStatus.valueOf(filter.getStatus()))
    							: spec.and(JobSpecifications.hasStatus(JobStatus.valueOf(filter.getStatus())));
    	}
    	
    	spec = spec == null ? JobSpecifications.hasAnySkill(filter.getSkillSet())
    						: spec.and(JobSpecifications.hasAnySkill(filter.getSkillSet()));
    	
        return jobRepository.findAll(spec);
    }
    
    

    private Jobs mapToEntity(JobPostRequestDTO request, String clientId) {
        Jobs job = new Jobs();
        job.setClientId(UUID.fromString(clientId));
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setBudgetAmount(request.getBudgetAmount());
        job.setBudgetCurrency(request.getBudgetCurrency());
        job.setJobType(request.getJobType());
        job.setRequiredSkills(request.getRequiredSkills());

        if (request.getDeadlineDate() != null) {
            job.setDeadlineDate(LocalDate.parse(request.getDeadlineDate()));
        }

        return job;
    }

    private JobResponseDTO mapToResponseDTO(Jobs job) {
        JobResponseDTO dto = new JobResponseDTO();

        dto.setJobId(job.getJobId().toString());
        dto.setClientId(job.getClientId().toString());
        dto.setTitle(job.getTitle());
        dto.setDescription(job.getDescription());
        dto.setBudgetAmount(job.getBudgetAmount());
        dto.setBudgetCurrency(job.getBudgetCurrency());
        dto.setJobType(job.getJobType());
        dto.setRequiredSkills(job.getRequiredSkills());
        dto.setDeadlineDate(job.getDeadlineDate() != null ? job.getDeadlineDate().toString() : null);
        dto.setStatus(job.getStatus());
        dto.setCreatedAt(job.getCreatedAt().toString());
        dto.setUpdatedAt(job.getUpdatedAt().toString());
        dto.setAssignedFreelancerId(job.getAssignedFreelancerId() != null
                ? job.getAssignedFreelancerId().toString() : null);

        return dto;
    }

    // find job title and client name for job
	public HashMap<UUID, ClientNameAndJobTitle> findClientNameAndJobTitle(List<UUID> jobIds) {
		HashMap<UUID, ClientNameAndJobTitle> response = new HashMap<UUID, ClientNameAndJobTitle>();
		
		  List<Object[]> jobTitleAndClientIds = jobRepository.findJobTitleAndClientIdUsingJobId(jobIds);
		  
		  List<UUID> clientIds = new ArrayList<>();
		  for(Object[] obj : jobTitleAndClientIds) {
			  UUID clientId = (UUID) obj[2];
			  clientIds.add(clientId);
		  }
		  
		  HashMap<UUID, String> userNames = userServiceProxy.retrieveUsernameUsingUserId(clientIds);
		  
		  for(Object[] obj : jobTitleAndClientIds) {
			  UUID jobId = (UUID) obj[0];
			  String title = (String) obj[1];
			  UUID clientId = (UUID) obj[2];
			  String clientName = userNames.get(clientId);  
			  ClientNameAndJobTitle data = new ClientNameAndJobTitle(title, clientName);
			  response.put(jobId, data);
		  }
		  return response;
	}

	//Assign Freelancer to Job
	public boolean assignFreelancerToJob(UUID jobId, UUID freelancerId) {
		Jobs job = jobRepository.findById(jobId).orElse(null);
		if(job != null) {
			job.setAssignedFreelancerId(freelancerId);
			job.setStatus(JobStatus.IN_PROGRESS);
			jobRepository.save(job);
		}else {
			return false;
		}
		return true;		
	}

	//Update Job status to "CLOSED"
	public boolean updateJobStatusToClosed(String jobId) {
		Jobs job = jobRepository.findById(UUID.fromString(jobId)).orElse(null);
		if(job != null) {
			job.setStatus(JobStatus.CLOSED);
			jobRepository.save(job);
			return true;
		}else {
			return false;
		}
	}

	//Update Job Status
	public Jobs updateJobStatus(String jobId, String updatedStatus)
	        throws EntityNotFoundException, IllegalArgumentException {
	    
	    Jobs job = jobRepository.findById(UUID.fromString(jobId))
	            .orElseThrow(() -> new EntityNotFoundException(
	                    String.format("Job entity with id -> %s not found!", jobId)));

	    JobStatus status;
	    try {
	        status = JobStatus.valueOf(updatedStatus.toUpperCase());
	    } catch (IllegalArgumentException e) {
	        throw new IllegalArgumentException(
	                String.format("Status value -> %s for job is invalid!", updatedStatus));
	    }

	    job.setStatus(status);
	    return jobRepository.save(job);
	}

	//Fetch job title using jobId.
	public String retrieveJobTitle(UUID jobId) throws Exception {
		Jobs job = jobRepository.findById(jobId).orElse(null);
		
		if(job == null) {
			throw new Exception(String.format("Job with id %s is not found", jobId));
		}else {
			return job.getTitle();
		}
	}
	
	//Fetch job title and milestone title. 
	public JobTitleAndMilestoneTitle retrieveJobTitleAndMilestoneTitle(UUID jobId, UUID milestoneId) throws Exception {
		Jobs job = jobRepository.findById(jobId).orElse(null);
		Milestone milestone = milestoneRepository.findById(milestoneId).orElse(null);
		
		if(job == null || milestone == null) {
			throw new Exception("Job or Milestone entity not found!");
		}else {
			return new  JobTitleAndMilestoneTitle(job.getTitle(), milestone.getTitle());
		}
	}
	
	public Jobs fetchJobUsingId(String jobId) {
		return jobRepository.findById(UUID.fromString(jobId)).orElseThrow(() -> new EntityNotFoundException(
                String.format("Job entity with id -> %s not found!", jobId)));
		
	}
}




