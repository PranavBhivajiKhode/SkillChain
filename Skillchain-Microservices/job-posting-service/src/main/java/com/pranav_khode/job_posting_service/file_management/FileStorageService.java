package com.pranav_khode.job_posting_service.file_management;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    private final Path basePath;

    public FileStorageService(@Value("${file.upload-dir}") String uploadDir) {
        this.basePath = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    public String saveFile(MultipartFile file, Long userId) throws IOException {

        Path targetDir = basePath.resolve(String.valueOf(userId));
        Files.createDirectories(targetDir);

        Path targetFile = targetDir.resolve(file.getOriginalFilename());

        file.transferTo(targetFile.toFile());

        return targetFile.toString();
    }

	public String saveFile(FileUploadDto dto, MultipartFile mf) throws IllegalStateException, IOException {
		Path targetDir = basePath.resolve(dto.getAssociationType().toString());
		Files.createDirectories(targetDir);
		
		targetDir = targetDir.resolve(dto.getReferenceId().toString());
		Files.createDirectories(targetDir);
		
		Path targetFile = targetDir.resolve(mf.getOriginalFilename());
		
		mf.transferTo(targetFile.toFile());
		
		return targetFile.toString();
	}
    
    

//	public String saveFile(FileUploadDto dto) throws IOException {
//		
//		Path targetDir = basePath.resolve(dto.getAssociationType().toString());
//		Files.createDirectories(targetDir);
//		
//		targetDir = targetDir.resolve(dto.getReferenceId().toString());
//		Files.createDirectories(targetDir);
//		
//		Path targetFile = targetDir.resolve(dto.getFile().getOriginalFilename());
//		
//		dto.getFile().transferTo(targetFile.toFile());
//		
//		return targetFile.toString();
//		
//	}
}




