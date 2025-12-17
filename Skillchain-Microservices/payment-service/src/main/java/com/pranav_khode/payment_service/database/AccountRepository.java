package com.pranav_khode.payment_service.database;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository  extends JpaRepository<Account, UUID>{

	Account findByUserId(UUID clientId);

}
