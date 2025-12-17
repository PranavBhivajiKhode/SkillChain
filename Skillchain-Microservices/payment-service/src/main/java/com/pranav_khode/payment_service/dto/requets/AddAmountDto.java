package com.pranav_khode.payment_service.dto.requets;

import jakarta.persistence.Column;

public class AddAmountDto {
	@Column(nullable = false)
	private double amount;
	
	@Column(nullable = false)
	private String cardNumber;
	
	@Column(nullable = false)
	private String expiryDate;
	
	@Column(nullable = false)
	private int cvv;
	
	@Column(nullable = false)
	private String cardholderName;

	public AddAmountDto() {
		super();
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}

	public int getCvv() {
		return cvv;
	}

	public void setCvv(int cvv) {
		this.cvv = cvv;
	}

	public String getCardholderName() {
		return cardholderName;
	}

	public void setCardholderName(String cardholderName) {
		this.cardholderName = cardholderName;
	}
	
}


//
//const [addAmountForm, setAddAmountForm] = useState({
//  amount: "",
//  cardNumber: "",
//  expiryDate: "",
//  cvv: "",
//  cardholderName: "",
//})