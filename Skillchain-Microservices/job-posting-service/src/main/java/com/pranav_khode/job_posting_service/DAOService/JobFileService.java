//package com.pranav_khode.job_posting_service.DAOService;
//
//import java.io.IOException;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.UUID;
//
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.pranav_khode.job_posting_service.database.JobFile;
//import com.pranav_khode.job_posting_service.database.JobFileRepository;
//import com.pranav_khode.job_posting_service.database.Jobs;
//import com.pranav_khode.job_posting_service.database.JobsRepository;
//
//@Service
//public class JobFileService {
//	
////	private final JobFileRepository jobFileRepository;
//	private final JobsRepository jobsRepository;
//	
//	public JobFileService(JobsRepository jobsRepository) {
//		super();
//		this.jobFileRepository = jobFileRepository;
//		this.jobsRepository = jobsRepository;
//	}
//	
//	public List<JobFile> saveFiles(UUID jobId, String userType, MultipartFile[] files) {
//		System.out.println("From jobFileService.java, saving file");
//		Jobs job = jobsRepository.findById(jobId).orElse(null);
//		if(job == null) {
//			throw new RuntimeException(String.format("Job not found for id -> {}", jobId));
//		}
//		
//		List<JobFile> jobFiles = new ArrayList<>();
//		
//		for(MultipartFile file : files) {
//			try {
//				JobFile jobFile = new JobFile();
//				jobFile.setFileName(file.getOriginalFilename());
//				jobFile.setFileType(file.getContentType());
//				jobFile.setFileData(file.getBytes());
//				jobFile.setUserType(userType);
//				jobFile.setJob(job);
//				
//				jobFiles.add(jobFile);
//			}catch(IOException e) {
//				System.out.println(e);
//			}
//		}
//		
//		List<JobFile> savedFiles =  jobFileRepository.saveAll(jobFiles);
//		return savedFiles;
//	}
//	
//}
