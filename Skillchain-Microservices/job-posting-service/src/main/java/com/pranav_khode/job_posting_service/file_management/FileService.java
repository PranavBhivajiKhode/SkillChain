package com.pranav_khode.job_posting_service.file_management;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    private final UserFileRepository repo;
    private final FileStorageService storage;

    public FileService(UserFileRepository repo, FileStorageService storage) {
        this.repo = repo;
        this.storage = storage;
    }

    public void upload(MultipartFile file, Long userId) throws Exception {
        String path = storage.saveFile(file, userId);

        UserFile uf = new UserFile();
        uf.setUserId(userId);
        uf.setFileName(file.getOriginalFilename());
        uf.setFileType(file.getContentType());
        uf.setFileSize(file.getSize());
        uf.setFilePath(path);

        repo.save(uf);
    }

    public List<UserFile> getUserFiles(Long userId) {
        return repo.findByUserId(userId);
    }
    
    public UserFile getFile(Long fileId) {
        return repo.findById(fileId)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }
}
