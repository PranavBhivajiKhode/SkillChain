package com.pranav_khode.payment_service.proxies;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", path = "/users")
public interface UserServiceProxy {
	
	@GetMapping("/{freelancerId}/freelancerName")
	public String retrieveFreelancerName(@PathVariable UUID freelancerId);
}
