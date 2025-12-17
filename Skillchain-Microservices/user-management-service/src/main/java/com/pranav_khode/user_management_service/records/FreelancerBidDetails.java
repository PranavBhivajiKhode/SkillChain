package com.pranav_khode.user_management_service.records;

import java.util.List;

public record FreelancerBidDetails(String freelancerName, Double freelancerRating, 
		Integer freelancerCompletedJobs, List<String> skills) {}
