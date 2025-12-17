package com.pranav_khode.user_management_service.database;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranav_khode.user_management_service.enums.Role;

public interface UserRepository extends JpaRepository<User, UUID>{
	public boolean existsByEmailAndRole(String email, Role string);
	
	public boolean existsByUsername(String username);

//	@Lock(LockModeType.PESSIMISTIC_WRITE)
	public User findByEmailAndRole(String email, Role role);
	
//	@Lock(LockModeType.PESSIMISTIC_WRITE)
	public User findByUsername(String username);
	
	@Query("SELECT u.userId, u.username FROM User u WHERE u.userId IN :userIds")
	public List<Object[]> findUsernamesByUserIds(@Param("userIds") List<UUID> userIds);

}
