package com.pranav_khode.job_posting_service.file_management;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

	public List<FileEntity> upload(FileUploadDto dto) throws IOException {
		
		List<FileEntity> fileEntityList = new ArrayList<FileEntity>();
		
		for(MultipartFile mf : dto.getFile()) {
			String path = fileStorageService.saveFile(dto, mf);
			
			FileEntity fileData = new FileEntity();
			fileData.setAssociationType(dto.getAssociationType());
			fileData.setOwnerType(dto.getOwnerType());
			fileData.setReferenceId(dto.getReferenceId());
			fileData.setFileName(mf.getOriginalFilename());
			fileData.setFileType(mf.getContentType());
			fileData.setFileSize(mf.getSize());
			fileData.setFilePath(path);
			
			fileEntityList.add(fileData);
		}
		
		return fileEntityRepository.saveAll(fileEntityList);
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
