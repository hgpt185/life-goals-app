package com.example.lifegoalsapp.controller;

import com.example.lifegoalsapp.dto.GoalDTO;
import com.example.lifegoalsapp.model.User;
import com.example.lifegoalsapp.service.GoalService;
import com.example.lifegoalsapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;
    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<GoalDTO>> getGoals(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.loadUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(goalService.getGoalsForUser(user.getId()));
    }

    @PostMapping
    public ResponseEntity<GoalDTO> createGoal(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody GoalDTO goalDTO) {
        User user = userService.loadUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(goalService.createGoal(user.getId(), goalDTO));
    }

    @PutMapping("/{goalId}")
    public ResponseEntity<GoalDTO> updateGoal(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String goalId,
            @RequestBody GoalDTO goalDTO) {
        User user = userService.loadUserByEmail(userDetails.getUsername());
        return ResponseEntity.ok(goalService.updateGoal(goalId, goalDTO, user.getId()));
    }

    @DeleteMapping("/{goalId}")
    public ResponseEntity<Void> deleteGoal(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable String goalId) {
        User user = userService.loadUserByEmail(userDetails.getUsername());
        goalService.deleteGoal(goalId, user.getId());
        return ResponseEntity.ok().build();
    }
} 