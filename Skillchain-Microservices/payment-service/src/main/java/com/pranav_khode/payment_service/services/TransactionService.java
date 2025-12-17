package com.pranav_khode.payment_service.services;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.pranav_khode.payment_service.database.Transaction;
import com.pranav_khode.payment_service.database.TransactionRepository;
import com.pranav_khode.payment_service.dto.requets.JobPaymentDto;
import com.pranav_khode.payment_service.dto.requets.MilestonePaymentDto;
import com.pranav_khode.payment_service.enums.PaymentStatus;
import com.pranav_khode.payment_service.enums.TransactionFor;
import com.pranav_khode.payment_service.proxies.JobServiceProxy;
import com.pranav_khode.payment_service.proxies.UserServiceProxy;
import com.pranav_khode.payment_service.records.JobTitleAndMilestoneTitle;

import feign.FeignException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;


@Service
public class TransactionService {
	
	private final JobServiceProxy jobServiceProxy;
	private final UserServiceProxy userServiceProxy;
	private final TransactionRepository transactionRepository;
	
	public TransactionService(JobServiceProxy jobServiceProxy, UserServiceProxy userServiceProxy,
			TransactionRepository transactionRepository) {
		this.jobServiceProxy = jobServiceProxy;
		this.userServiceProxy = userServiceProxy;
		this.transactionRepository = transactionRepository;
	}

	public Transaction managePaymentForMilestone(MilestonePaymentDto dto) throws EntityNotFoundException {
		String freelancerName;
		JobTitleAndMilestoneTitle jobTitleAndMilestoneTitle;
		
		try {
			jobTitleAndMilestoneTitle = jobServiceProxy.retrieveJobTitleAndMilestoneTitle(dto.getJobId(), dto.getMilestoneId());
		}catch(FeignException.NotFound ex) {
			throw new EntityNotFoundException("Job not found with id: " + dto.getJobId());
		}
		
		try {
			freelancerName = userServiceProxy.retrieveFreelancerName(dto.getFreelancerId());
		}catch(FeignException.NotFound ex) {
			throw new EntityNotFoundException("Freelancer not found with id: " + dto.getFreelancerId());
		}
		
		Transaction transaction = new Transaction();
		transaction.setClientId(dto.getClientId());
		transaction.setFreelancerId(dto.getFreelancerId());
		transaction.setJobId(dto.getJobId());
		transaction.setProjectTitle(jobTitleAndMilestoneTitle.jobTitle());
		transaction.setFreelancerName(freelancerName);
		transaction.setAmount(BigDecimal.valueOf(dto.getAmount()));
		transaction.setCurrency(dto.getCurrency());
		transaction.setType(TransactionFor.MILESTONE);
		transaction.setStatus(PaymentStatus.COMPLETED);
		transaction.setDescription(jobTitleAndMilestoneTitle.milestoneTitle());
		transaction.setTime(LocalDateTime.now());
		
		return transactionRepository.save(transaction);
	}	
	
	public Transaction managePaymentForJob(@Valid JobPaymentDto dto) throws EntityNotFoundException{
		String jobTitle;
		String freelancerName;
		
		try {
			jobTitle = jobServiceProxy.retrieveJobTitle(dto.getJobId());
		}catch(FeignException.NotFound ex) {
			throw new EntityNotFoundException("Job not found with id: " + dto.getJobId());
		}
		
		try {
			freelancerName = userServiceProxy.retrieveFreelancerName(dto.getFreelancerId());
		}catch(FeignException.NotFound ex) {
			throw new EntityNotFoundException("Freelancer not found with id: " + dto.getFreelancerId());
		}
		
		Transaction transaction = new Transaction();
		transaction.setClientId(dto.getClientId());
		transaction.setFreelancerId(dto.getFreelancerId());
		transaction.setJobId(dto.getJobId());
		transaction.setProjectTitle(jobTitle);
		transaction.setFreelancerName(freelancerName);
		transaction.setAmount(BigDecimal.valueOf(dto.getAmount()));
		transaction.setCurrency(dto.getCurrency());
		transaction.setType(TransactionFor.JOB);
		transaction.setDescription("Final payment for project");
		transaction.setTime(LocalDateTime.now());
		
		return transactionRepository.save(transaction);
	}
	
}

