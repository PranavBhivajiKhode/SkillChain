package com.pranav_khode.bidding_service.database;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, UUID>{
	
	public List<Bid> findAllByJobId(UUID jobId);
	
	public List<Bid> findAllByFreelancerId(UUID freelancerId);
}
