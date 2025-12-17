package com.pranav_khode.job_posting_service.file_management;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserFileRepository extends JpaRepository<UserFile, Long> {
    List<UserFile> findByUserId(Long userId);
}

