package com.pranav_khode.job_posting_service.database;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MilestoneRepository extends JpaRepository<Milestone, UUID>{

	List<Milestone> findByJobIn(List<Jobs> activeJobs);
	
	List<Milestone> findByJob(Jobs job);

}
