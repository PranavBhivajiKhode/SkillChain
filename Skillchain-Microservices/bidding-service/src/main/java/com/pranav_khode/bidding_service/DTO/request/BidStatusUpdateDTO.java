package com.pranav_khode.bidding_service.DTO.request;

import com.pranav_khode.bidding_service.enums.BidStatus;

import jakarta.validation.constraints.NotNull;

public class BidStatusUpdateDTO {
	@NotNull
    private BidStatus status;

	public BidStatus getStatus() {
		return status;
	}

	public void setStatus(BidStatus status) {
		this.status = status;
	}
	
	
}
