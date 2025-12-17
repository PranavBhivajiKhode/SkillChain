package com.pranav_khode.bidding_service.DAoService;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranav_khode.bidding_service.DTO.request.BidRequestDTO;
import com.pranav_khode.bidding_service.DTO.request.BidStatusUpdateDTO;
import com.pranav_khode.bidding_service.database.Bid;
import com.pranav_khode.bidding_service.database.BidRepository;

@Service
public class BidService {

    private final BidRepository repository;

    public BidService(BidRepository repository) {
        this.repository = repository;
    }

    public Bid saveNewBidToDatabase(BidRequestDTO dto) {
    	Bid bid = new Bid();
		bid.setJobId(UUID.fromString(dto.getJobId()));
		bid.setFreelancerId(UUID.fromString(dto.getFreelancerId()));
		bid.setProposedAmount(dto.getProposedAmount());
		bid.setProposedCurrency(dto.getProposedCurrency());
		bid.setProposedTimelineDays(dto.getProposedTimelineDays());
		bid.setProposalText(dto.getProposalText());

        return repository.save(bid);
    }

	public List<Bid> retriveAllBidsForJobFromDatabase(String jobId) {
		List<Bid> bids = repository.findAllByJobId(UUID.fromString(jobId));
		return bids;
	}

	public List<Bid> retriveAllBidsForFreelancerFromDatabase(String freelancerId) {
		return repository.findAllByFreelancerId(UUID.fromString(freelancerId));
	}

	public Bid updateBidStatusFromDatabase(String id, BidStatusUpdateDTO dto) throws Exception {
	    Bid bid = repository.findById(UUID.fromString(id)).orElse(null);
	    if (bid == null) {
	        throw new Exception(String.format("No bid found for id -> %s", id));
	    }

	    bid.setStatus(dto.getStatus());
	    return repository.save(bid);  
	}


	public Bid retriveBid(String id) throws Exception{
		Bid bid = repository.findById(UUID.fromString(id)).orElse(null);
		if(bid == null) {
			throw new Exception("Bid does not exists!");
		}
		return bid;
	}
}
