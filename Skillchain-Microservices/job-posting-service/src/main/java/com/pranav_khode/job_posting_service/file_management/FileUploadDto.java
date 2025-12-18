package com.pranav_khode.job_posting_service.file_management;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.pranav_khode.job_posting_service.enums.FileAssociationType;
import com.pranav_khode.job_posting_service.enums.FileOwnerType;

public class FileUploadDto {	
	// JOB or MILESTONE
	private FileAssociationType associationType;
	
	// CLIENT or FREELANCER
	private FileOwnerType ownerType;
	
	// Job ID or Milestone ID (UUID)
	private UUID referenceId;
	
	private MultipartFile[] file;

	public FileAssociationType getAssociationType() {
		return associationType;
	}

	public void setAssociationType(FileAssociationType associationType) {
		this.associationType = associationType;
	}

	public FileOwnerType getOwnerType() {
		return ownerType;
	}

	public void setOwnerType(FileOwnerType ownerType) {
		this.ownerType = ownerType;
	}

	public UUID getReferenceId() {
		return referenceId;
	}

	public void setReferenceId(UUID referenceId) {
		this.referenceId = referenceId;
	}

	public MultipartFile[] getFile() {
		return file;
	}

	public void setFile(MultipartFile[] file) {
		this.file = file;
	}
	
	
}


