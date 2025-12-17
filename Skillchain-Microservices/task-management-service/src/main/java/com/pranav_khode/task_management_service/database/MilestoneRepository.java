package com.pranav_khode.task_management_service.database;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MilestoneRepository extends JpaRepository<Milestone, UUID>{

}
