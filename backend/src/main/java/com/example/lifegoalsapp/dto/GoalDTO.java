package com.example.lifegoalsapp.dto;

import lombok.Data;

@Data
public class GoalDTO {
    private String id;
    private String title;
    private String description;
    private boolean completed;
    private String createdAt;
    private String updatedAt;
    private String userId;
} 