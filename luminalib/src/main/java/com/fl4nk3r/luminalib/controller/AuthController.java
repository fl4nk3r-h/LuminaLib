package com.fl4nk3r.luminalib.controller;

import com.fl4nk3r.luminalib.dto.request.LoginRequest;
import com.fl4nk3r.luminalib.dto.request.RegisterRequest;
import com.fl4nk3r.luminalib.dto.response.AuthResponse;
import com.fl4nk3r.luminalib.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Register a new user
     * POST /api/auth/register
     * @param request Registration details (email, password, firstName, lastName)
     * @return JWT token wrapped in AuthResponse
     */
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Login existing user
     * POST /api/auth/login
     * @param request Login credentials (email, password)
     * @return JWT token wrapped in AuthResponse
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }
}
