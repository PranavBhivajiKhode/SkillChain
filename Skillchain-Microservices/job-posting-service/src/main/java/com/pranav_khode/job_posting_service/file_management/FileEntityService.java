package com.pranav_khode.job_posting_service.file_management;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranav_khode.job_posting_service.enums.FileAssociationType;

@Service
public class FileEntityService {
	
	private final FileEntityRepository fileEntityRepository;
	private final FileStorageService fileStorageService;
	
	public FileEntityService(FileEntityRepository fileEntityRepository,
						FileStorageService fileStorageService) {
		this.fileEntityRepository = fileEntityRepository;
		this.fileStorageService = fileStorageService;
	}

	public FileEntity upload(FileUploadDto dto) throws IOException {
		String path = fileStorageService.saveFile(dto);
		
		FileEntity fileData = new FileEntity();
		fileData.setAssociationType(dto.getAssociationType());
		fileData.setOwnerType(dto.getOwnerType());
		fileData.setReferenceId(dto.getReferenceId());
		fileData.setFileName(dto.getFile().getOriginalFilename());
		fileData.setFileType(dto.getFile().getContentType());
		fileData.setFileSize(dto.getFile().getSize());
		fileData.setFilePath(path);
		
		return fileEntityRepository.save(fileData);
	}

	public FileEntity getFile(UUID fileId) throws Exception {
		FileEntity fe = fileEntityRepository.findById(fileId).orElse(null);
		if(fe == null) {
			throw new Exception("File not found for id " + fileId);
		}else {
			return fe;
		}
	}

	public List<FileEntity> getFilesForJob(UUID jobId) {
		return fileEntityRepository.findByReferenceIdAndAssociationType(jobId, FileAssociationType.JOB);
	}

	public List<FileEntity> getFilesForMilestone(UUID milestoneId) {
		return fileEntityRepository.findByReferenceIdAndAssociationType(milestoneId, FileAssociationType.MILESTONE);		
	}

}
