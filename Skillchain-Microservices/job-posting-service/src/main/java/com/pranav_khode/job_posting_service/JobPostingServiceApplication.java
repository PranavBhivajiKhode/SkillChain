package com.pranav_khode.job_posting_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class JobPostingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobPostingServiceApplication.class, args);
	}

}
