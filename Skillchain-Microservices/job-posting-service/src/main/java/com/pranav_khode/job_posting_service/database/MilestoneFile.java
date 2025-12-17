//package com.pranav_khode.job_posting_service.database;
//
//import java.util.UUID;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.FetchType;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.Lob;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Table;
//@Entity
//@Table(name = "milestone_files")
//public class MilestoneFile {
//
//    @Id
//    @GeneratedValue
//    private UUID id;
//
//    private String fileName;
//    private String fileType;
//    private String userType;
//
//    @Lob
//    @Column(nullable = false, columnDefinition = "LONGBLOB")
//    private byte[] fileData;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "milestone_id", nullable = false)
//    @JsonBackReference("milestone-files") // ✅ prevents recursion
//    private Milestone milestone;
//
//
//	public UUID getId() {
//		return id;
//	}
//
//	public void setId(UUID id) {
//		this.id = id;
//	}
//
//	public String getFileName() {
//		return fileName;
//	}
//
//	public void setFileName(String fileName) {
//		this.fileName = fileName;
//	}
//
//	public String getFileType() {
//		return fileType;
//	}
//
//	public void setFileType(String fileType) {
//		this.fileType = fileType;
//	}
//
//	public String getUserType() {
//		return userType;
//	}
//
//	public void setUserType(String userType) {
//		this.userType = userType;
//	}
//
//	public byte[] getFileData() {
//		return fileData;
//	}
//
//	public void setFileData(byte[] fileData) {
//		this.fileData = fileData;
//	}
//
//	public Milestone getMilestone() {
//		return milestone;
//	}
//
//	public void setMilestone(Milestone milestone) {
//		this.milestone = milestone;
//	}
//
//    
//}
//
