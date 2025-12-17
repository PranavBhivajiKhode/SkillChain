package com.pranav_khode.job_posting_service.DAOService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranav_khode.job_posting_service.DTO.request.MilestonePaymentDto;
import com.pranav_khode.job_posting_service.DTO.request.MilestonePostRequest;
import com.pranav_khode.job_posting_service.database.Jobs;
import com.pranav_khode.job_posting_service.database.JobsRepository;
import com.pranav_khode.job_posting_service.database.Milestone;
import com.pranav_khode.job_posting_service.database.MilestoneRepository;
import com.pranav_khode.job_posting_service.enums.MileStoneStatus;
import com.pranav_khode.job_posting_service.records.MilestonePaymentResponse;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class MilestoneService {

    private final MilestoneRepository milestoneRepository;
    private final JobsRepository jobsRepository;

    public MilestoneService(MilestoneRepository milestoneRepository, JobsRepository jobsRepository) {
        this.milestoneRepository = milestoneRepository;
        this.jobsRepository = jobsRepository;
    }

    @Transactional
    public List<Milestone> saveMilestones(List<MilestonePostRequest> requests, Jobs job) {
        List<Milestone> milestones = new ArrayList<>();

        int index = 1; 
        for (MilestonePostRequest req : requests) {
            Milestone newMilestone = Milestone.builder()
                    .job(job)
                    .title(req.getTitle())
                    .description(req.getDescription())
                    .budgetAmount(req.getBudgetAmount())
                    .budgetCurrency(req.getBudgetCurrency())
                    .status(MileStoneStatus.NOT_STARTED)
                    .deadlineDate(req.getDeadlineDate())
                    .orderIndex(req.getOrder() != null ? req.getOrder() : index++)
                    .build();

            milestones.add(newMilestone);
        }
        

        return milestoneRepository.saveAll(milestones);
    }

	public  Milestone updateMilestoneStatus(String jobId, String milestoneId, String updatedStatus)
			throws IllegalArgumentException, RuntimeException {
		Milestone milestone = milestoneRepository.findById(UUID.fromString(milestoneId)).orElse(null);
		
		if(milestone == null) {
			throw new RuntimeException(String.format("Milestone with id -> {} not found!", milestoneId));
		}
		
		Jobs job = milestone.getJob();
		if(job == null) {
			throw new RuntimeException(String.format("Milestone with id -> {} is not associated with any job", milestoneId));
		}
		
		MileStoneStatus status = null;
		
		try {
			status = MileStoneStatus.valueOf(updatedStatus);
		}catch(IllegalArgumentException exception) {
			throw new IllegalArgumentException(String.format("Status value -> {} is invalid for milestone", updatedStatus));
		}
		
		milestone.setStatus(status);
		return milestoneRepository.save(milestone);
	}
	
	public MilestonePaymentResponse managePayment(MilestonePaymentDto dto) throws EntityNotFoundException, IllegalStateException, RuntimeException {
		
		Milestone milestone = milestoneRepository.findById(dto.getMilestoneId()).orElse(null);
		
		if(milestone == null) {
			throw new EntityNotFoundException("Milestone not found with id: " + dto.getMilestoneId());
		}else if(milestone.isPaid()){
			throw new IllegalStateException("Milestone with id -> " + dto.getMilestoneId() + " is already paid");
		}else {
			BigDecimal amount = dto.getAmount();
			BigDecimal difference = milestone.getBudgetAmount().subtract(amount).abs();
			
			if (difference.compareTo(BigDecimal.valueOf(5)) <= 0) {
		    	Jobs job = jobsRepository.findById(dto.getJobId()).orElse(null);
		    	
		    	if(job == null) {
		    		throw new EntityNotFoundException("Job not found with id: " + dto.getJobId());
		    	}else if(job.isPaid()) {
		    		throw new IllegalStateException("job with id -> " + dto.getJobId() + " is already paid");
		    	}else {
		    		BigDecimal newAmount = dto.getAmount().add(job.getAmountPaid());
		    		if(job.getBudgetAmount().compareTo(newAmount) <= 5) {
		    			job.setPaid(true);
		    		}
		    		job.setAmountPaid(newAmount);
		    		milestone.setPaid(true);
		    		jobsRepository.save(job);
		    		milestoneRepository.save(milestone);
		    		return new MilestonePaymentResponse (true, job.getTitle(), milestone.getTitle());
		    	}
			} else {
			    throw new RuntimeException("Amount is not correct. It should be " + milestone.getBudgetAmount());
			}
		}
	}
}


