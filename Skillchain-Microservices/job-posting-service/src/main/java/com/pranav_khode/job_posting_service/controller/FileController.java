package com.pranav_khode.job_posting_service.controller;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.job_posting_service.file_management.FileEntity;
import com.pranav_khode.job_posting_service.file_management.FileEntityService;
import com.pranav_khode.job_posting_service.file_management.FileUploadDto;



@RestController
@RequestMapping("/api/files")
@CrossOrigin
public class FileController {

//    private final FileService service;
    private final FileEntityService fileEntityService;

    public FileController(FileEntityService fileEntityService) {
        this.fileEntityService = fileEntityService;
    }
    
    @PostMapping("/upload")
    public ResponseEntity<FileEntity> uploadFile(@RequestBody FileUploadDto dto) throws IOException {
    	FileEntity fileEntity = fileEntityService.upload(dto);
    	return ResponseEntity.ok().body(fileEntity);
    }

//    @PostMapping(value = "/upload", consumes = "multipart/form-data")
//    public ResponseEntity<?> upload(
//            @RequestParam MultipartFile file,
//            @RequestParam Long userId) throws Exception {
//
//        service.upload(file, userId);
//        return ResponseEntity.ok("Uploaded");
//    }
    
    @GetMapping("job/{jobId}")
    public ResponseEntity<List<FileEntity>> getFilesForJob(@PathVariable UUID jobId) {
    	return ResponseEntity.ok().body(fileEntityService.getFilesForJob(jobId));
    }
    
    @GetMapping("/milestone/{milestoneId}")
    public ResponseEntity<List<FileEntity>> getFilesForMilestone(@PathVariable UUID milestoneId) {
    	return ResponseEntity.ok().body(fileEntityService.getFilesForMilestone(milestoneId));
    }
    

//    @GetMapping("/user/{userId}")
//    public List<UserFile> list(@PathVariable Long userId) {
//        return service.getUserFiles(userId);
//    }
    
    @GetMapping("get/{fileId}")
    public ResponseEntity<Resource> getFile(@PathVariable UUID fileId) throws Exception{
			FileEntity fileData = fileEntityService.getFile(fileId);
			Path filePath = Paths.get(fileData.getFilePath());
			
			Resource resource = new UrlResource(filePath.toUri());
			
			if(!resource.exists()) {
				throw new Exception("File not found");
			}
			return ResponseEntity.ok()
	                .contentType(MediaType.parseMediaType(fileData.getFileType()))
	                .header(HttpHeaders.CONTENT_DISPOSITION,
	                        "attachment; filename=\"" + fileData.getFileName() + "\"")
	                .body(resource);
    }
    
//    @GetMapping("/download/{id}")
//    public ResponseEntity<Resource> download(@PathVariable Long id) throws IOException {
//
//        UserFile uf = service.getFile(id);
//        Path filePath = Paths.get(uf.getFilePath());
//
//        Resource resource = new UrlResource(filePath.toUri());
//
//        if (!resource.exists()) {
//            throw new RuntimeException("File not found");
//        }
//
//        return ResponseEntity.ok()
//                .contentType(MediaType.parseMediaType(uf.getFileType()))
//                .header(HttpHeaders.CONTENT_DISPOSITION,
//                        "attachment; filename=\"" + uf.getFileName() + "\"")
//                .body(resource);
//    }
    
    

}

