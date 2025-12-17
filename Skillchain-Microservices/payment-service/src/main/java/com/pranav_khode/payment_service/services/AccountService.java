package com.pranav_khode.payment_service.services;

import java.math.BigDecimal;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranav_khode.payment_service.database.Account;
import com.pranav_khode.payment_service.database.AccountRepository;
import com.pranav_khode.payment_service.dto.requets.AddAmountDto;
import com.pranav_khode.payment_service.services.custom_exceptions.InvalidDetailsException;

@Service
public class AccountService {
	private final AccountRepository accountRepository;
	
	public AccountService(AccountRepository accountRepository) {
		this.accountRepository = accountRepository;
	}
	
	public boolean verifyAccountDetails(AddAmountDto dto) {
		return true;
	}
	
	public Account addAmount(UUID clientId, AddAmountDto dto) throws InvalidDetailsException {
		if(verifyAccountDetails(dto)) {
			Account account = accountRepository.findByUserId(clientId);
			if(account != null) {
				BigDecimal newAmount = BigDecimal.valueOf(dto.getAmount()).add(account.getAvailableBalance());
				account.setAvailableBalance(newAmount);
				return accountRepository.save(account);
			}else {
				account = new Account();
				account.setUserId(clientId);
				account.setAvailableBalance(BigDecimal.valueOf(dto.getAmount()));
				account.setTotalEarned(BigDecimal.ZERO);
				account.setTotalPaid(BigDecimal.ZERO);
				return accountRepository.save(account);
			}
		}else {
			throw new InvalidDetailsException (String.format("The given details for account are invalid! Details : %s", dto.toString()));
		}
	}
}
