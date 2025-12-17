package com.pranav_khode.payment_service.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.payment_service.database.Account;
import com.pranav_khode.payment_service.dto.requets.AddAmountDto;
import com.pranav_khode.payment_service.services.AccountService;
import com.pranav_khode.payment_service.services.custom_exceptions.InvalidDetailsException;


@RestController
@RequestMapping("/account")
public class AccountController {
	
	private final AccountService accountService;
	
	public AccountController(AccountService accountService) {
		this.accountService = accountService;
	}
	
	@PostMapping("/add-amount")
	public ResponseEntity<?> addAmountToAccount(@RequestParam String clientId, @RequestBody AddAmountDto dto) {
		try {
			Account account = accountService.addAmount(UUID.fromString(clientId), dto);
			return ResponseEntity.ok().body(account);
		} catch (InvalidDetailsException e) {
			return ResponseEntity.badRequest().body(e.toString());
		}
	}
	
	
	
}

//
//const [addAmountForm, setAddAmountForm] = useState({
//    amount: "",
//    cardNumber: "",
//    expiryDate: "",
//    cvv: "",
//    cardholderName: "",
//  })