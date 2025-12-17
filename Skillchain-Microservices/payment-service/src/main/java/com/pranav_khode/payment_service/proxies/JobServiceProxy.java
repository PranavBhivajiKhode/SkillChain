package com.pranav_khode.payment_service.proxies;

import java.util.UUID;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.pranav_khode.payment_service.records.JobTitleAndMilestoneTitle;


@FeignClient(name = "job-service", path="/jobs")
public interface JobServiceProxy {
	
	@GetMapping("/job-title/milestone-title")
	public JobTitleAndMilestoneTitle retrieveJobTitleAndMilestoneTitle(@RequestParam UUID jobId, 
			 @RequestParam UUID milestoneId);
	
	@GetMapping("/job-title")
	public String retrieveJobTitle(@RequestParam UUID jobId);
}
