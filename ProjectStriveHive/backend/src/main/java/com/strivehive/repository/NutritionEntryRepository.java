package com.strivehive.repository;

import com.strivehive.model.NutritionEntry;
import com.strivehive.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NutritionEntryRepository extends JpaRepository<NutritionEntry, Long> {
    List<NutritionEntry> findByUserOrderByRecordedAtDesc(User user);
    
    List<NutritionEntry> findByUserAndRecordedAtBetween(User user, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(n.calories) FROM NutritionEntry n WHERE n.user = :user AND n.recordedAt BETWEEN :start AND :end")
    Double getTotalCaloriesBetween(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT n.mealType, SUM(n.calories) FROM NutritionEntry n WHERE n.user = :user AND n.recordedAt BETWEEN :start AND :end GROUP BY n.mealType")
    List<Object[]> getMealTypeCaloriesBetween(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT SUM(n.protein), SUM(n.carbs), SUM(n.fat) FROM NutritionEntry n WHERE n.user = :user AND n.recordedAt BETWEEN :start AND :end")
    Object[] getMacronutrientsBetween(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}