package com.pranav_khode.bidding_service.proxy;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.pranav_khode.bidding_service.records.FreelancerBidDetails;

@FeignClient(name = "user-service", path="/users")
public interface UserServiceProxy {
	
	@PostMapping("/usernames")
	public HashMap<UUID, String> retrieveUsernameUsingUserId(@RequestBody List<UUID> userIds);
	
	@PostMapping("/freelancer/details")
	public HashMap<UUID, FreelancerBidDetails> retrieveFreelancerDetailsForBid(@RequestBody List<UUID> freelancerIds);
}
