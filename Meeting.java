package com.pitchperfect.model;

import java.time.LocalDateTime;

public class Meeting {
    private Long id;
    private User entrepreneur;
    private User investor;
    private LocalDateTime scheduledTime;
    private String status; // "scheduled", "completed", "cancelled"
    private String zoomLink;
    private String description;
    private double price;
    private boolean isPaid;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor
    public Meeting(User entrepreneur, User investor, LocalDateTime scheduledTime, String description) {
        this.entrepreneur = entrepreneur;
        this.investor = investor;
        this.scheduledTime = scheduledTime;
        this.description = description;
        this.status = "scheduled";
        this.price = 299.0; // Fixed price for meetings
        this.isPaid = false;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getEntrepreneur() {
        return entrepreneur;
    }

    public void setEntrepreneur(User entrepreneur) {
        this.entrepreneur = entrepreneur;
    }

    public User getInvestor() {
        return investor;
    }

    public void setInvestor(User investor) {
        this.investor = investor;
    }

    public LocalDateTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalDateTime scheduledTime) {
        this.scheduledTime = scheduledTime;
        this.updatedAt = LocalDateTime.now();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.updatedAt = LocalDateTime.now();
    }

    public String getZoomLink() {
        return zoomLink;
    }

    public void setZoomLink(String zoomLink) {
        this.zoomLink = zoomLink;
        this.updatedAt = LocalDateTime.now();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
        this.updatedAt = LocalDateTime.now();
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean paid) {
        isPaid = paid;
        this.updatedAt = LocalDateTime.now();
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

    @Override
    public String toString() {
        return "Meeting{" +
                "id=" + id +
                ", entrepreneur=" + entrepreneur.getName() +
                ", investor=" + investor.getName() +
                ", scheduledTime=" + scheduledTime +
                ", status='" + status + '\'' +
                ", price=" + price +
                ", isPaid=" + isPaid +
                '}';
    }
}
