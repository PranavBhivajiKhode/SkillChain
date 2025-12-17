package com.pranav_khode.user_management_service.database;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "clients")
public class Client {

    @Id
    @Column(name = "client_id", columnDefinition = "BINARY(16)")
    private UUID clientId; // Same as userId

    @OneToOne
    @MapsId
    @JoinColumn(name = "client_id", referencedColumnName = "user_id")
    private User user;

    @Size(max = 100)
    private String companyName;

    @Pattern(regexp = "^[0-9]+$", message = "Company size must be a valid number")
    private String companySize;

    @Size(max = 100)
    private String industry;

    @Size(max = 100)
    private String position;

    @Size(max = 255)
    private String location;

    @Size(max = 1000)
    private String bio;

    @Min(0)
    private Integer totalProjects;

    @Min(0)
    private Integer activeProjects;

    @DecimalMin("0.0")
    private BigDecimal totalSpent;

    @DecimalMin("0.0")
    @DecimalMax("5.0")
    private Double avgRating;

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

	public Client() {
		super();
	}

	public UUID getClientId() {
		return clientId;
	}

	public void setClientId(UUID clientId) {
		this.clientId = clientId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanySize() {
		return companySize;
	}

	public void setCompanySize(String companySize) {
		this.companySize = companySize;
	}

	public String getIndustry() {
		return industry;
	}

	public void setIndustry(String industry) {
		this.industry = industry;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
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

	public BigDecimal getTotalSpent() {
		return totalSpent;
	}

	public void setTotalSpent(BigDecimal totalSpent) {
		this.totalSpent = totalSpent;
	}

	public Double getAvgRating() {
		return avgRating;
	}

	public void setAvgRating(Double avgRating) {
		this.avgRating = avgRating;
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

