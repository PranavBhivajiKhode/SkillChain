package com.pranav_khode.bidding_service.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.bidding_service.DAoService.BidService;
import com.pranav_khode.bidding_service.DTO.request.BidRequestDTO;
import com.pranav_khode.bidding_service.DTO.request.BidStatusUpdateDTO;
import com.pranav_khode.bidding_service.database.Bid;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bids")
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    @PostMapping
    public ResponseEntity<Bid> createBid(@Valid @RequestBody BidRequestDTO requestBody) {
        Bid savedBid = bidService.saveNewBidToDatabase(requestBody);
        URI location = URI.create("/bids/" + savedBid.getBidId()); 
        return ResponseEntity.created(location).body(savedBid);
    }
    
    @GetMapping("/jobs/{jobId}/bids")
    public ResponseEntity<List<Bid>> retriveAllBidsForJob(@PathVariable String jobId) throws Exception {
    	System.out.println("In bids");
    	if(jobId.isBlank()) {
    		throw new Exception("Job ID can not be empty");
    	}
    	List<Bid> bids = bidService.retriveAllBidsForJobFromDatabase(jobId);
    	return ResponseEntity.ok().body(bids);
    }
    
    @GetMapping("/users/{freelancerId}/bids")
    public ResponseEntity<List<Bid>> retriveAllBidsUsingForFreelancer(@PathVariable String freelancerId) throws Exception {
    	if(freelancerId.isBlank()) {
    		throw new Exception("Freelancer Id can not be empty");
    	}
    	List<Bid> bids = bidService.retriveAllBidsForFreelancerFromDatabase(freelancerId);
    	return ResponseEntity.ok().body(bids);
    }
    
    
    @PatchMapping("/{bidId}/status")
    public ResponseEntity<Bid> updateBidStatus(@PathVariable String bidId, @RequestBody BidStatusUpdateDTO requestBody) {
    	Bid bid = null;
    	try {
			bid = bidService.updateBidStatusFromDatabase(bidId, requestBody);
		} catch (Exception e) {
			e.printStackTrace();
		}
    	return ResponseEntity.ok().body(bid);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Bid> retriveBid(@PathVariable String id) throws Exception{
    	Bid bid = bidService.retriveBid(id);
    	return ResponseEntity.ok().body(bid);
    }
}
