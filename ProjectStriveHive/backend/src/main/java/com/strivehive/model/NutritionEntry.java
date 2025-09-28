package com.strivehive.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "nutrition_entries")
public class NutritionEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @NotBlank(message = "Food name is required")
    @Column(name = "food_name", nullable = false, length = 100)
    private String foodName;
    
    @NotBlank(message = "Meal type is required")
    @Column(name = "meal_type", nullable = false, length = 20)
    private String mealType; // breakfast, lunch, dinner, snack
    
    @DecimalMin(value = "0", message = "Calories cannot be negative")
    @Column(nullable = false)
    private Double calories;
    
    @DecimalMin(value = "0", message = "Protein cannot be negative")
    @Column(nullable = false)
    private Double protein; // in grams
    
    @DecimalMin(value = "0", message = "Carbs cannot be negative")
    @Column(nullable = false)
    private Double carbs; // in grams
    
    @DecimalMin(value = "0", message = "Fat cannot be negative")
    @Column(nullable = false)
    private Double fat; // in grams
    
    @DecimalMin(value = "0.1", message = "Serving size must be positive")
    @Column(name = "serving_size", nullable = false)
    private Double servingSize; // in grams or units
    
    @Column(name = "serving_unit", length = 20)
    private String servingUnit; // grams, cups, pieces, etc.
    
    @Column(name = "recorded_at", nullable = false)
    private LocalDateTime recordedAt;
    
    // Constructors
    public NutritionEntry() {
        this.recordedAt = LocalDateTime.now();
    }
    
    public NutritionEntry(User user, String foodName, String mealType, Double calories, 
                         Double protein, Double carbs, Double fat, Double servingSize, String servingUnit) {
        this.user = user;
        this.foodName = foodName;
        this.mealType = mealType;
        this.calories = calories;
        this.protein = protein;
        this.carbs = carbs;
        this.fat = fat;
        this.servingSize = servingSize;
        this.servingUnit = servingUnit;
        this.recordedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public String getFoodName() { return foodName; }
    public void setFoodName(String foodName) { this.foodName = foodName; }
    
    public String getMealType() { return mealType; }
    public void setMealType(String mealType) { this.mealType = mealType; }
    
    public Double getCalories() { return calories; }
    public void setCalories(Double calories) { this.calories = calories; }
    
    public Double getProtein() { return protein; }
    public void setProtein(Double protein) { this.protein = protein; }
    
    public Double getCarbs() { return carbs; }
    public void setCarbs(Double carbs) { this.carbs = carbs; }
    
    public Double getFat() { return fat; }
    public void setFat(Double fat) { this.fat = fat; }
    
    public Double getServingSize() { return servingSize; }
    public void setServingSize(Double servingSize) { this.servingSize = servingSize; }
    
    public String getServingUnit() { return servingUnit; }
    public void setServingUnit(String servingUnit) { this.servingUnit = servingUnit; }
    
    public LocalDateTime getRecordedAt() { return recordedAt; }
    public void setRecordedAt(LocalDateTime recordedAt) { this.recordedAt = recordedAt; }
}