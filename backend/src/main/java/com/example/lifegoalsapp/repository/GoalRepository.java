package com.example.lifegoalsapp.repository;

import com.example.lifegoalsapp.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GoalRepository extends JpaRepository<Goal, String> {
    List<Goal> findByUserId(String userId);
} 