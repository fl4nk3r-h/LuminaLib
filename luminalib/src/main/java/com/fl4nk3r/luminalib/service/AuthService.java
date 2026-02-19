package com.fl4nk3r.luminalib.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fl4nk3r.luminalib.dto.request.LoginRequest;
import com.fl4nk3r.luminalib.dto.request.RegisterRequest;
import com.fl4nk3r.luminalib.dto.response.AuthResponse;
import com.fl4nk3r.luminalib.entity.User;
import com.fl4nk3r.luminalib.exception.BadRequestException;
import com.fl4nk3r.luminalib.exception.ResourceNotFoundException;
import com.fl4nk3r.luminalib.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    /**
     * Registers a new user and returns a JWT token
     * 
     * @param request Registration details
     * @return AuthResponse containing JWT token
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already exists: " + request.getEmail());
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .role("ROLE_USER")
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }

    /**
     * Authenticates user and returns a JWT token
     * 
     * @param request Login credentials
     * @return AuthResponse containing JWT token
     */
    public AuthResponse login(LoginRequest request) {
        // This will throw an exception if authentication fails
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + request.getEmail()));

        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }
}