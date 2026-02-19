package com.fl4nk3r.luminalib.dto.response;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object for error responses.
 * This class encapsulates the details of an error response, including the
 * timestamp of the error, the HTTP status code, a descriptive error message,
 * and the path of the request that caused the error.
 * It uses Lombok annotations to generate boilerplate code such as constructors,
 * getters, setters, and builders.
 * This DTO can be used in exception handlers to provide consistent and
 * informative error responses to clients.
 * 
 * @author fl4nk3r
 * @version 1.0
 * @since 2025-02
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private HttpStatus status;
    private String errorMessage;
    private String path;
}
