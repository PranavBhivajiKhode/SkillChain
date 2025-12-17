package com.pranav_khode.user_management_service.controller;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.user_management_service.DAOservice.UserManagamentService;
import com.pranav_khode.user_management_service.records.FreelancerBidDetails;

@RestController
@RequestMapping("/users")
public class UserManagementController {
	
	private final UserManagamentService service;
	
	public UserManagementController(UserManagamentService service) {
		super();
		this.service = service;
	}

	@PostMapping("/usernames")
	public HashMap<UUID, String> retrieveUsernameUsingUserId(@RequestBody List<UUID> userIds) {
		HashMap<UUID, String> userMap =  (HashMap<UUID, String>) service.retrieveUsernameUsingUserId(userIds);
		return userMap;
	}
	
	@PostMapping("/freelancer/details")
	public HashMap<UUID, FreelancerBidDetails> retrieveFreelancerDetailsForBid(@RequestBody List<UUID> freelancerIds) {
		return service.retrieveFreelancersDetailsForBid(freelancerIds);
	}
	
	@GetMapping("/{freelancerId}/freelancerName")
	public ResponseEntity<String> retrieveFreelancerName(@PathVariable UUID freelancerId) {
	    try {
	    	String freelancerName = service.retrieveFreelancerName(freelancerId);
		    return ResponseEntity.ok(freelancerName);
	    }catch(Exception ex) {
	    	return ResponseEntity.notFound().build();
	    }
	}

}
