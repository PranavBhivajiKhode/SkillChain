package com.pranav_khode.user_management_service.database;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FreelancerRepository extends JpaRepository<Freelancer, UUID> {
	

	@Query("SELECT u.userId, u.username FROM User u WHERE u.userId IN :userIds")
	public List<Object[]> findUsernamesByUserIds(@Param("userIds") List<UUID> userIds);
	
	@Query("SELECT f.freelancerId, f.averageRating, f.totalProjects " +
			"FROM Freelancer f WHERE f.freelancerId IN :freelancerIds")
	List<Object[]> retrieveFreelancerDetailsForBid(@Param("freelancerIds") List<UUID> freelancerIds);
	
	@Query("SELECT f.freelancerId, s FROM Freelancer f JOIN f.skills s WHERE f.freelancerId IN :freelancerIds")
	List<Object[]> findFreelancerSkills(@Param("freelancerIds") List<UUID> freelancerIds);

	
}
