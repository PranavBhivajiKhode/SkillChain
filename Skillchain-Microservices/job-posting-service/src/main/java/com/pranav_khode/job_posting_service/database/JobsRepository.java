package com.pranav_khode.job_posting_service.database;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JobsRepository extends JpaRepository<Jobs, UUID>{

}
