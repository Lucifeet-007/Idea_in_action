package com.pitchperfect.model;

import java.time.LocalDateTime;
import java.util.List;

public class Pitch {
    private Long id;
    private String title;
    private String description;
    private String detailedPlan;
    private double fundingAmount;
    private User entrepreneur;
    private List<User> interestedInvestors;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String status; // "draft", "submitted", "reviewing", "approved", "rejected"
    private String imageUrl;

    // Constructor
    public Pitch(String title, String description, String detailedPlan, double fundingAmount, User entrepreneur) {
        this.title = title;
        this.description = description;
        this.detailedPlan = detailedPlan;
        this.fundingAmount = fundingAmount;
        this.entrepreneur = entrepreneur;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = "draft";
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = LocalDateTime.now();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public String getDetailedPlan() {
        return detailedPlan;
    }

    public void setDetailedPlan(String detailedPlan) {
        this.detailedPlan = detailedPlan;
        this.updatedAt = LocalDateTime.now();
    }

    public double getFundingAmount() {
        return fundingAmount;
    }

    public void setFundingAmount(double fundingAmount) {
        this.fundingAmount = fundingAmount;
        this.updatedAt = LocalDateTime.now();
    }

    public User getEntrepreneur() {
        return entrepreneur;
    }

    public void setEntrepreneur(User entrepreneur) {
        this.entrepreneur = entrepreneur;
    }

    public List<User> getInterestedInvestors() {
        return interestedInvestors;
    }

    public void setInterestedInvestors(List<User> interestedInvestors) {
        this.interestedInvestors = interestedInvestors;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
        this.updatedAt = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Pitch{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", fundingAmount=" + fundingAmount +
                ", entrepreneur=" + entrepreneur.getName() +
                ", status='" + status + '\'' +
                '}';
    }
}
