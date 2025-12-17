package com.pranav_khode.bidding_service.DaoService;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.UUID;


import org.springframework.stereotype.Service;

import com.pranav_khode.bidding_service.DTO.request.BidRequestDTO;
import com.pranav_khode.bidding_service.DTO.request.BidStatusUpdateDTO;
import com.pranav_khode.bidding_service.DTO.response.JobBidResponseDto;
import com.pranav_khode.bidding_service.DTO.response.ListOfBidsForFreelancerResponseDto;
import com.pranav_khode.bidding_service.database.Bid;
import com.pranav_khode.bidding_service.database.BidRepository;
import com.pranav_khode.bidding_service.enums.BidStatus;
import com.pranav_khode.bidding_service.proxy.JobServiceProxy;
import com.pranav_khode.bidding_service.proxy.UserServiceProxy;
import com.pranav_khode.bidding_service.records.ClientNameAndJobTitle;
import com.pranav_khode.bidding_service.records.FreelancerBidDetails;

@Service
public class BidService {

    private final BidRepository bidRepository;
    private final UserServiceProxy userServiceProxy;
    private final JobServiceProxy jobServiceProxy;

    public BidService(BidRepository bidRepository, UserServiceProxy proxy, JobServiceProxy jobServiceProxy) {
        this.bidRepository = bidRepository;
        this.userServiceProxy = proxy;
        this.jobServiceProxy = jobServiceProxy;
    }

    public Bid saveNewBidToDatabase(BidRequestDTO dto, String freelancerId) {
    	Bid bid = new Bid();
		bid.setJobId(UUID.fromString(dto.getJobId()));
		bid.setFreelancerId(UUID.fromString(freelancerId));
		bid.setProposedAmount(dto.getProposedAmount());
		bid.setProposedCurrency(dto.getProposedCurrency());
		bid.setProposedTimelineDays(dto.getProposedTimelineDays());
		bid.setProposalText(dto.getProposalText());

        return bidRepository.save(bid);
    }

	public List<JobBidResponseDto> retriveAllBidsForJob(String jobId) {
		List<Bid> bids = bidRepository.findAllByJobId(UUID.fromString(jobId));
		
		List<UUID> freelancerIds = new ArrayList<UUID>();
		for(Bid bid : bids) {
			freelancerIds.add(bid.getFreelancerId());
		}
		HashMap<UUID, FreelancerBidDetails> freelancersDetails= userServiceProxy.retrieveFreelancerDetailsForBid(freelancerIds);
		
		List<JobBidResponseDto> responseDto = new ArrayList<JobBidResponseDto>();
		
		for(Bid bid : bids) {
			UUID freelancerId = bid.getFreelancerId();
			FreelancerBidDetails freelancerDetail = freelancersDetails.get(freelancerId);
			if(freelancerDetail == null) {
				continue;
			}
			
			JobBidResponseDto data = new JobBidResponseDto();
			data.setId(bid.getBidId());
			data.setJobId(bid.getJobId().toString());
			data.setFreelancerId(bid.getFreelancerId().toString());
			data.setBidAmount(bid.getProposedAmount());
			data.setDeliveryTime(bid.getProposedTimelineDays().toString());
			data.setCoverLetter(bid.getProposalText());
			data.setStatus(bid.getStatus().toString());
			data.setSubmittedAt(bid.getCreatedAt().toLocalDate());
			data.setFreelancerName(freelancerDetail.freelancerName());
			data.setSkills(freelancerDetail.skills());
			data.setFreelancerRating(freelancerDetail.freelancerRating());
			data.setFreelancerCompletedJobs(freelancerDetail.freelancerCompletedJobs());
			
			responseDto.add(data);
		}
		return responseDto;
	}

	public List<ListOfBidsForFreelancerResponseDto> retriveAllBidsForFreelancer(String freelancerId) {
		
		List<Bid> bids = bidRepository.findAllByFreelancerId(UUID.fromString(freelancerId));
		
		List<UUID> jobIds = new ArrayList<UUID>();
		for(Bid bid : bids) {
			jobIds.add(bid.getJobId());
		}
		
		HashMap<UUID,ClientNameAndJobTitle> nameAndJobTitle = jobServiceProxy.retrieveNameAndJobTitle(jobIds);
		
		List<ListOfBidsForFreelancerResponseDto> response = new ArrayList<ListOfBidsForFreelancerResponseDto>();
		
		for(Bid bid : bids) {
			
			ClientNameAndJobTitle clientNameAndTitle = nameAndJobTitle.get(bid.getJobId());
			
			ListOfBidsForFreelancerResponseDto data = new ListOfBidsForFreelancerResponseDto(bid.getBidId(), bid.getJobId(), bid.getFreelancerId(), 
					bid.getProposedAmount(), bid.getProposedCurrency(), bid.getProposedTimelineDays(), bid.getProposalText(), bid.getStatus().toString(), 
					bid.getCreatedAt(), bid.getUpdatedAt(), clientNameAndTitle.title(), clientNameAndTitle.clientName()); 
			
			response.add(data);
		}
		
		return response;
	}

	public Bid updateBidStatusFromDatabase(String id, BidStatusUpdateDTO dto) throws Exception {
	    Bid bid = bidRepository.findById(UUID.fromString(id)).orElse(null);
	    if (bid == null) {
	        throw new Exception(String.format("No bid found for id -> %s", id));
	    }

	    bid.setStatus(dto.getStatus());
	    return bidRepository.save(bid);  
	}


	public Bid retriveBid(String id) throws Exception{
		Bid bid = bidRepository.findById(UUID.fromString(id)).orElse(null);
		if(bid == null) {
			throw new Exception("Bid does not exists!");
		}
		return bid;
	}

	public void UpdateBidStatusToRejected(String bidId) {
		Bid bid = bidRepository.findById(UUID.fromString(bidId)).orElse(null);
		if(bid != null) {
			bid.setStatus(BidStatus.REJECTED);
			bidRepository.save(bid);
		}
	}

	public boolean updateBidStatusToAccepted(String id) {
		UUID bidId = UUID.fromString(id);
		Bid bid = bidRepository.findById(bidId).orElse(null);
		if(bid != null) {
			UUID jobId = bid.getJobId();
			UUID freelancerId = bid.getFreelancerId();
			
			if(jobServiceProxy.assignFreelancerToJob(jobId, freelancerId)) {
				bid.setStatus(BidStatus.ACCEPTED);
				bidRepository.save(bid);
			}else {
				throw new RuntimeException("Failed to update status of Bid");
			}
		}else {
			throw new RuntimeException("No bid found for given bidId!");
		}
		return true;
	}
}
