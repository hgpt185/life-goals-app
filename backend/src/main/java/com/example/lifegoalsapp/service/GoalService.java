package com.example.lifegoalsapp.service;

import com.example.lifegoalsapp.dto.GoalDTO;
import com.example.lifegoalsapp.model.Goal;
import com.example.lifegoalsapp.model.User;
import com.example.lifegoalsapp.repository.GoalRepository;
import com.example.lifegoalsapp.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public List<GoalDTO> getGoalsForUser(String userId) {
        return goalRepository.findByUserId(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public GoalDTO createGoal(String userId, GoalDTO goalDTO) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        Goal goal = new Goal();
        goal.setTitle(goalDTO.getTitle());
        goal.setDescription(goalDTO.getDescription());
        goal.setCompleted(goalDTO.isCompleted());
        goal.setUser(user);

        return toDTO(goalRepository.save(goal));
    }

    public GoalDTO updateGoal(String goalId, GoalDTO goalDTO, String userId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));

        // Verify that the goal belongs to the user
        if (!goal.getUser().getId().equals(userId)) {
            throw new SecurityException("User not authorized to update this goal");
        }

        if (goalDTO.getTitle() != null) {
            goal.setTitle(goalDTO.getTitle());
        }
        if (goalDTO.getDescription() != null) {
            goal.setDescription(goalDTO.getDescription());
        }
        goal.setCompleted(goalDTO.isCompleted());

        return toDTO(goalRepository.save(goal));
    }

    public void deleteGoal(String goalId, String userId) {
        Goal goal = goalRepository.findById(goalId)
                .orElseThrow(() -> new EntityNotFoundException("Goal not found"));
        
        // Verify that the goal belongs to the user
        if (!goal.getUser().getId().equals(userId)) {
            throw new SecurityException("User not authorized to delete this goal");
        }
        
        goalRepository.deleteById(goalId);
    }

    public GoalDTO toDTO(Goal goal) {
        GoalDTO dto = new GoalDTO();
        dto.setId(goal.getId());
        dto.setTitle(goal.getTitle());
        dto.setDescription(goal.getDescription());
        dto.setCompleted(goal.isCompleted());
        dto.setCreatedAt(goal.getCreatedAt().toString());
        dto.setUpdatedAt(goal.getUpdatedAt().toString());
        dto.setUserId(goal.getUser().getId());
        return dto;
    }
} 