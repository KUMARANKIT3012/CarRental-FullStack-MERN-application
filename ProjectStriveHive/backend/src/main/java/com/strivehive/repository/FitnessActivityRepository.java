package com.strivehive.repository;

import com.strivehive.model.FitnessActivity;
import com.strivehive.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface FitnessActivityRepository extends JpaRepository<FitnessActivity, Long> {
    List<FitnessActivity> findByUserOrderByRecordedAtDesc(User user);
    
    List<FitnessActivity> findByUserAndRecordedAtBetween(User user, LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT SUM(f.caloriesBurned) FROM FitnessActivity f WHERE f.user = :user AND f.recordedAt BETWEEN :start AND :end")
    Double getTotalCaloriesBurnedBetween(@Param("user") User user, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT f.activityType, COUNT(f) FROM FitnessActivity f WHERE f.user = :user GROUP BY f.activityType")
    List<Object[]> getActivityTypeStats(@Param("user") User user);
}