package com.pranav_khode.job_posting_service.file_management;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pranav_khode.job_posting_service.enums.FileAssociationType;

public interface FileEntityRepository extends JpaRepository<FileEntity, UUID>{

	List<FileEntity> findByReferenceIdAndAssociationType(UUID jobId, FileAssociationType job);
	
}
