package com.pranav_khode.job_posting_service.database;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pranav_khode.job_posting_service.enums.JobStatus;

public interface JobsRepository extends JpaRepository<Jobs, UUID>, JpaSpecificationExecutor<Jobs> {

    List<Jobs> findByClientId(UUID clientId);
    
    List<Jobs> findByClientIdAndStatusIn(UUID clientId, List<JobStatus> statuses);
    
    List<Jobs> findByAssignedFreelancerIdAndStatus(UUID assignedFreelancerId, JobStatus status);

    @Query(value = "SELECT * FROM jobs ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Jobs> findRandomJobs();
    
    
    @Query("SELECT j.jobId, j.title, j.clientId FROM Jobs j WHERE j.jobId IN :jobIds")
	List<Object[]> findJobTitleAndClientIdUsingJobId(List<UUID> jobIds);

	@Query("SELECT j.jobId, s FROM Jobs j JOIN j.requiredSkills s WHERE j.jobId IN :jobIds")
	List<Object[]> findJobsSkills(@Param("jobIds") List<UUID> jobIds);
	
	@Query("select s from Jobs j join j.requiredSkills s where j.jobId = :jobId")
	List<String> findJobSkills(@Param("jobId") UUID jobId);

}


//public interface JobsRepository extends JpaRepository<Jobs, UUID>{
//	
//	@Query("SELECT DISTINCT j FROM Jobs j JOIN j.requiredSkills s WHERE s IN :skills")
//	List<Jobs> findDistinctByRequiredSkillsIn(@Param("skills") List<String> skills);
//
//	List<Jobs> findByStatus(JobStatus status);
//
//	List<Jobs> findByBudgetAmount(BigDecimal budgetAmount);
//
//	List<Jobs> findByJobType(JobType jobType);
//
//	@Query("SELECT DISTINCT j FROM Jobs j WHERE j.deadlineDate <= :deadlineDate")
//	List<Jobs> findByBeforeDeadline(@Param("deadlineDate") LocalDate deadlineDate);
//
//}
