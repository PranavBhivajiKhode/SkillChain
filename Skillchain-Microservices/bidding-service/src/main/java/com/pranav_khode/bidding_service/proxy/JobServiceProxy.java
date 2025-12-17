package com.pranav_khode.bidding_service.proxy;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.pranav_khode.bidding_service.records.ClientNameAndJobTitle;


@FeignClient(name = "job-service", path = "/jobs")
public interface JobServiceProxy {
	
	@PostMapping("/fetch/title-and-clientname")
    public HashMap<UUID, ClientNameAndJobTitle> retrieveNameAndJobTitle(@RequestBody List<UUID> jobIds);
	
	@PutMapping("/{jobId}/assign-freelancer/{freelancerId}")
    public boolean assignFreelancerToJob(@PathVariable("jobId") UUID jobId, @PathVariable("freelancerId") UUID freelancerId);
}

