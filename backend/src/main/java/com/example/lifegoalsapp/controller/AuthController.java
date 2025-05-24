package com.example.lifegoalsapp.controller;

import com.example.lifegoalsapp.dto.AuthRequest;
import com.example.lifegoalsapp.dto.AuthResponse;
import com.example.lifegoalsapp.dto.RegisterRequest;
import com.example.lifegoalsapp.model.User;
import com.example.lifegoalsapp.security.JwtTokenProvider;
import com.example.lifegoalsapp.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = tokenProvider.generateToken(authentication);
        User user = userService.loadUserByEmail(request.getEmail());

        return ResponseEntity.ok(new AuthResponse(token, userService.toDTO(user)));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.createUser(request.getName(), request.getEmail(), request.getPassword());
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new AuthResponse(token, userService.toDTO(user)));
    }
} 