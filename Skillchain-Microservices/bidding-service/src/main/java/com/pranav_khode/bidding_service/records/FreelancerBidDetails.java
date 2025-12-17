package com.pranav_khode.bidding_service.records;

import java.util.List;

public record FreelancerBidDetails(String freelancerName, Double freelancerRating, 
		Integer freelancerCompletedJobs, List<String> skills) {}
