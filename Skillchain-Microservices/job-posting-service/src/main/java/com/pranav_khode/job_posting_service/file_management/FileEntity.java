package com.pranav_khode.job_posting_service.file_management;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

import com.pranav_khode.job_posting_service.enums.FileAssociationType;
import com.pranav_khode.job_posting_service.enums.FileOwnerType;

@Entity
@Table(name = "files")
public class FileEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID fileId;

    // JOB or MILESTONE
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FileAssociationType associationType;

    // CLIENT or FREELANCER
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FileOwnerType ownerType;

    // Job ID or Milestone ID (UUID)
    @Column(nullable = false)
    private UUID referenceId;

    @Column(nullable = false)
    private String fileName;

    @Column(nullable = false, length = 500)
    private String filePath;

    @Column(nullable = false)
    private Long fileSize;

    @Column(nullable = false)
    private String fileType;

    @Column(nullable = false)
    private LocalDateTime uploadedAt;

    // Auto timestamp before insert
    @PrePersist
    public void onCreate() {
        this.uploadedAt = LocalDateTime.now();
    }

	public UUID getFileId() {
		return fileId;
	}

	public void setFileId(UUID fileId) {
		this.fileId = fileId;
	}

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

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public Long getFileSize() {
		return fileSize;
	}

	public void setFileSize(Long fileSize) {
		this.fileSize = fileSize;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public LocalDateTime getUploadedAt() {
		return uploadedAt;
	}

	public void setUploadedAt(LocalDateTime uploadedAt) {
		this.uploadedAt = uploadedAt;
	}

    
}

