package com.strivehive.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "fitness_activities")
public class FitnessActivity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotBlank(message = "Activity type is required")
    @Column(name = "activity_type", nullable = false, length = 50)
    private String activityType; // running, walking, cycling, swimming, weightlifting, yoga, etc.
    
    @Min(value = 1, message = "Duration must be positive")
    @Column(nullable = false)
    private Integer duration; // in minutes
    
    @DecimalMin(value = "0", message = "Calories burned cannot be negative")
    @Column(name = "calories_burned", nullable = false)
    private Double caloriesBurned;
    
    @Column(length = 500)
    private String notes;
    
    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;
    
    // Constructors
    public FitnessActivity() {
        this.recordedAt = LocalDateTime.now();
    }
    
    public FitnessActivity(User user, String activityType, Integer duration, Double caloriesBurned, String notes) {
        this.user = user;
        this.activityType = activityType;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
        this.notes = notes;
        this.recordedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getActivityType() { return activityType; }
    public void setActivityType(String activityType) { this.activityType = activityType; }
    
    public Integer getDuration() { return duration; }
    public void setDuration(Integer duration) { this.duration = duration; }
    
    public Double getCaloriesBurned() { return caloriesBurned; }
    public void setCaloriesBurned(Double caloriesBurned) { this.caloriesBurned = caloriesBurned; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    
    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }
}