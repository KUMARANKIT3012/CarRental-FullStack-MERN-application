package com.strivehive.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Name is required")
    @Column(nullable = false, length = 100)
    private String name;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Min(value = 1, message = "Age must be positive")
    @Max(value = 150, message = "Age must be realistic")
    @Column(nullable = false)
    private Integer age;
    
    @NotBlank(message = "Gender is required")
    @Column(nullable = false, length = 10)
    private String gender;
    
    @DecimalMin(value = "0.1", message = "Height must be positive")
    @Column(nullable = false)
    private Double height; // in cm
    
    @DecimalMin(value = "0.1", message = "Weight must be positive")
    @Column(nullable = false)
    private Double weight; // in kg
    
    @Column(name = "activity_level", nullable = false)
    private String activityLevel; // sedentary, lightly_active, moderately_active, very_active
    
    @Column(name = "fitness_goal", nullable = false)
    private String fitnessGoal; // weight_loss, weight_gain, maintain, muscle_gain
    
    @Column(name = "created_date", nullable = false)
    private LocalDate createdDate;
    
    // Constructors
    public User() {
        this.createdDate = LocalDate.now();
    }
    
    public User(String name, String email, Integer age, String gender, Double height, Double weight, 
                String activityLevel, String fitnessGoal) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.height = height;
        this.weight = weight;
        this.activityLevel = activityLevel;
        this.fitnessGoal = fitnessGoal;
        this.createdDate = LocalDate.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public Double getHeight() { return height; }
    public void setHeight(Double height) { this.height = height; }
    
    public Double getWeight() { return weight; }
    public void setWeight(Double weight) { this.weight = weight; }
    
    public String getActivityLevel() { return activityLevel; }
    public void setActivityLevel(String activityLevel) { this.activityLevel = activityLevel; }
    
    public String getFitnessGoal() { return fitnessGoal; }
    public void setFitnessGoal(String fitnessGoal) { this.fitnessGoal = fitnessGoal; }
    
    public LocalDate getCreatedDate() { return createdDate; }
    public void setCreatedDate(LocalDate createdDate) { this.createdDate = createdDate; }
    
    // Utility methods
    public double calculateBMI() {
        return weight / Math.pow(height / 100, 2);
    }
    
    public double calculateBMR() {
        // Harris-Benedict Formula
        if ("male".equalsIgnoreCase(gender)) {
            return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }
    }
}