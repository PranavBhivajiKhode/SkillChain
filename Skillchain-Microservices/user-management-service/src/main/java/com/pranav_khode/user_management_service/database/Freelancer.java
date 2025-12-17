package com.pranav_khode.user_management_service.database;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "freelancers")
public class Freelancer {

    @Id
    @Column(name = "freelancer_id", columnDefinition = "BINARY(16)")
    private UUID freelancerId; // Same as userId

    @OneToOne
    @MapsId
    @JoinColumn(name = "freelancer_id", referencedColumnName = "user_id")
    private User user;

    @ElementCollection
    @CollectionTable(name = "freelancer_skills", joinColumns = @JoinColumn(name = "freelancerId"))
    @Column(name = "skill", nullable = false)
    private List<@NotBlank String> skills;

    @Size(max = 100)
    private String experience;

    @DecimalMin(value = "0.0", inclusive = false, message = "Hourly rate must be greater than 0")
    private BigDecimal hourlyRate;

    @Size(max = 100)
    private String title;

    @Size(max = 255)
    private String location;

    @Size(max = 1000)
    private String bio;

    @Min(0)
    private Integer totalProjects;

    @Min(0)
    private Integer activeProjects;

    @DecimalMin(value = "0.0")
    @DecimalMax(value = "100.0")
    private Double successRate; // in percentage (0–100)

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    private Double averageRating;

    @DecimalMin("0.0")
    private BigDecimal totalEarnings;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private ZonedDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = ZonedDateTime.now();
        this.updatedAt = ZonedDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = ZonedDateTime.now();
    }
    
    public Freelancer() {}

	public UUID getFreelancerId() {
		return freelancerId;
	}

	public void setFreelancerId(UUID freelancerId) {
		this.freelancerId = freelancerId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<String> getSkills() {
		return skills;
	}

	public void setSkills(List<String> skills) {
		this.skills = skills;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public BigDecimal getHourlyRate() {
		return hourlyRate;
	}

	public void setHourlyRate(BigDecimal hourlyRate) {
		this.hourlyRate = hourlyRate;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public Integer getTotalProjects() {
		return totalProjects;
	}

	public void setTotalProjects(Integer totalProjects) {
		this.totalProjects = totalProjects;
	}

	public Integer getActiveProjects() {
		return activeProjects;
	}

	public void setActiveProjects(Integer activeProjects) {
		this.activeProjects = activeProjects;
	}

	public Double getSuccessRate() {
		return successRate;
	}

	public void setSuccessRate(Double successRate) {
		this.successRate = successRate;
	}

	public Double getAverageRating() {
		return averageRating;
	}

	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}

	public BigDecimal getTotalEarnings() {
		return totalEarnings;
	}

	public void setTotalEarnings(BigDecimal totalEarnings) {
		this.totalEarnings = totalEarnings;
	}

	public ZonedDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(ZonedDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public ZonedDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(ZonedDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

    
}



	

    

    

    
    

    
    
    
	