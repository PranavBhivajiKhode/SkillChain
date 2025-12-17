package com.pranav_khode.task_management_service.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pranav_khode.task_management_service.DTO.request.MilestonePostRequest;
import com.pranav_khode.task_management_service.service.MilestoneService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/milestone")
public class MilestoneController {

    private final MilestoneService service;

    public MilestoneController(MilestoneService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Void>  addMilestones(
            @Valid @RequestBody List<MilestonePostRequest> requests,
            @RequestParam("jobId") String jobId) {

        service.saveMilestones(requests, jobId);
        return ResponseEntity.ok().build();
    }
}

