package com.pranav_khode.bidding_service.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.bidding_service.DTO.request.BidRequestDTO;
import com.pranav_khode.bidding_service.DTO.request.BidStatusUpdateDTO;
import com.pranav_khode.bidding_service.DTO.response.JobBidResponseDto;
import com.pranav_khode.bidding_service.DTO.response.ListOfBidsForFreelancerResponseDto;
import com.pranav_khode.bidding_service.DaoService.BidService;
import com.pranav_khode.bidding_service.database.Bid;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bids")
public class BidController {

    private final BidService bidService;

    public BidController(BidService bidService) {
        this.bidService = bidService;
    }

    //Creates a bid for job
    @PostMapping("/freelancer/{freelancerId}")
    public ResponseEntity<Bid> createBid(@Valid @RequestBody BidRequestDTO requestBody, @PathVariable String freelancerId) {
        Bid savedBid = bidService.saveNewBidToDatabase(requestBody, freelancerId);
        URI location = URI.create("/bids/" + savedBid.getBidId()); 
        return ResponseEntity.created(location).body(savedBid);
    }
    
    //Fetches all bids for freelancer
    @GetMapping("/freelancer/{freelancerId}")
    public ResponseEntity<List<ListOfBidsForFreelancerResponseDto>> retriveAllBidsUsingForFreelancer(@PathVariable String freelancerId) throws Exception {
    	if(freelancerId.isBlank()) {
    		throw new Exception("Freelancer Id can not be empty");
    	}
    	List<ListOfBidsForFreelancerResponseDto> bids = bidService.retriveAllBidsForFreelancer(freelancerId);
    	return ResponseEntity.ok().body(bids);
    }
    
    //Fetches all bids associated with job
    @GetMapping("/jobs/{jobId}")
    public ResponseEntity<List<JobBidResponseDto>> retriveAllBidsForJob(@PathVariable String jobId) throws Exception {
    	if(jobId.isBlank()) {
    		throw new Exception("Job ID can not be empty");
    	}
    	List<JobBidResponseDto> bids = bidService.retriveAllBidsForJob(jobId);
    	return ResponseEntity.ok().body(bids);
    }
    
    //Update status of bid to accepted
    @PutMapping("/{bidId}/status/accept")
    public ResponseEntity<?> acceptBid(@PathVariable String bidId) {
    	if(bidService.updateBidStatusToAccepted(bidId)) {
    		return ResponseEntity.ok().build();
    	}else {
    		return ResponseEntity.internalServerError().build();
    	}
    }

    //Update status of bid to Rejected
    @PutMapping("/{bidId}/status/reject")
    public ResponseEntity<Object> rejectBid(@PathVariable String bidId) {
    	bidService.UpdateBidStatusToRejected(bidId);
    	return ResponseEntity.ok().build();
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
