package com.pranav_khode.payment_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.payment_service.database.Transaction;
import com.pranav_khode.payment_service.dto.requets.JobPaymentDto;
import com.pranav_khode.payment_service.dto.requets.MilestonePaymentDto;
import com.pranav_khode.payment_service.services.TransactionService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
	
	private final TransactionService transactionService;
	
	public TransactionController(TransactionService transactionService) {
		this.transactionService = transactionService;
	}
	
	@PostMapping("/milestone")
	public ResponseEntity<?> paymentForMilestone(@Valid @RequestBody MilestonePaymentDto dto) {
		try {
			Transaction transaction = transactionService.managePaymentForMilestone(dto);
			return ResponseEntity.ok().body(transaction);
		} catch (EntityNotFoundException e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(e.toString());
		}
	}
	
	@PostMapping("/job")
	public ResponseEntity<?> paymentForJob(@Valid @RequestBody JobPaymentDto dto) {
		try {
			Transaction transaction = transactionService.managePaymentForJob(dto);
			return ResponseEntity.ok().body(transaction);
		}catch(EntityNotFoundException ex) {
			ex.printStackTrace();
			return ResponseEntity.internalServerError().body(ex.toString());
		}
	}
}

//
//public class MilestonePaymentDto {
//	@NotNull
//	private UUID clientId;
//	
//	@NotNull
//	private UUID freelancerId;
//	
//	@NotNull
//	private UUID jobId;
//	
//	@NotNull
//	private UUID milestoneId;
//	
//	@NotNull
//	private double amount;
//	
//	@NotNull
//	private String currency;
//	
//	@NotNull
//	private TransactionFor paymentType;