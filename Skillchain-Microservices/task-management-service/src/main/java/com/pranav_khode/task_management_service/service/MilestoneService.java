package com.pranav_khode.task_management_service.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.pranav_khode.task_management_service.DTO.request.MilestonePostRequest;
import com.pranav_khode.task_management_service.database.Milestone;
import com.pranav_khode.task_management_service.database.MilestoneRepository;
import com.pranav_khode.task_management_service.enums.Status;

import jakarta.transaction.Transactional;

@Service
public class MilestoneService {

    private final MilestoneRepository repository;

    public MilestoneService(MilestoneRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public List<Milestone> saveMilestones(List<MilestonePostRequest> requests, String jobId) {
        List<Milestone> milestones = new ArrayList<>();

        int index = 1; 
        for (MilestonePostRequest req : requests) {
            Milestone newMilestone = Milestone.builder()
                    .jobId(UUID.fromString(jobId))
                    .title(req.getTitle())
                    .description(req.getDescription())
                    .budgetAmount(req.getBudgetAmount())
                    .budgetCurrency(req.getBudgetCurrency())
                    .status(Status.NOT_STARTED)
                    .deadlineDate(req.getDeadlineDate())
                    .orderIndex(req.getOrder() != null ? req.getOrder() : index++)
                    .build();

            milestones.add(newMilestone);
        }

        return repository.saveAll(milestones);
    }
}

