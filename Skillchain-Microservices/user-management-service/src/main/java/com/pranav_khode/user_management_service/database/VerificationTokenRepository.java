package com.pranav_khode.user_management_service.database;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long>{
	VerificationToken findByUser(User user);
	
	void deleteByUser(User user);
	
	VerificationToken findByToken(String token);
	
	boolean existsByUser(User user);
}
