package com.fl4nk3r.luminalib.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.fl4nk3r.luminalib.dto.response.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Global exception handler for the application.
 * This class uses @RestControllerAdvice to handle exceptions thrown by any
 * controller in a centralized manner.
 * It defines specific handlers for custom exceptions like
 * ResourceNotFoundException, UnauthorizedException, and BadRequestException,
 * as well as a generic handler for all other exceptions.
 * Each handler returns a structured ErrorResponse with details about the error,
 * including a timestamp, HTTP status code, error message, and the request path.
 * 
 * @author fl4nk3r
 * @version 1.0
 * @since 2025-02
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Helper method to build an ErrorResponse object.
     * 
     * @param status  The HTTP status code for the error.
     * @param message The error message.
     * @param path    The request path that caused the error.
     * @return The built ErrorResponse object.
     */
    private ErrorResponse buildErrorResponse(HttpStatus status, String message, String path) {
        return ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .status(status)
                .errorMessage(message)
                .path(path)
                .build();
    }

    /**
     * Handler for ResourceNotFoundException.
     * 
     * @param ex      The ResourceNotFoundException that was thrown.
     * @param request The HttpServletRequest that caused the exception, used to get
     *                the request URI.
     * @return The message from the exception, indicating which resource was not
     *         found.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException ex,
            HttpServletRequest request) {
        ErrorResponse errorResponse = buildErrorResponse(HttpStatus.NOT_FOUND,
                "Resource not found: " + ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    /**
     * Handler for UnauthorizedException.
     * 
     * @param ex      The UnauthorizedException that was thrown.
     * @param request The HttpServletRequest that caused the exception, used to get
     *                the request URI.
     * @return The message from the exception, indicating unauthorized access.
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException ex,
            HttpServletRequest request) {
        ErrorResponse errorResponse = buildErrorResponse(HttpStatus.UNAUTHORIZED,
                "Unauthorized access: " + ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    /**
     * Handler for BadRequestException.
     * 
     * @param ex      The BadRequestException that was thrown.
     * @param request The HttpServletRequest that caused the exception, used to get
     *                the request URI.
     * @return The message from the exception, indicating a bad request.
     */
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorResponse> handleBadRequestException(BadRequestException ex, HttpServletRequest request) {
        ErrorResponse errorResponse = buildErrorResponse(HttpStatus.BAD_REQUEST,
                "Bad request: " + ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    /**
     * Handler for validation errors (e.g., @Valid annotation failures).
     * 
     * @param ex      The MethodArgumentNotValidException that was thrown.
     * @param request The HttpServletRequest that caused the exception.
     * @return Error response for validation failures.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .reduce((msg1, msg2) -> msg1 + ", " + msg2)
                .orElse("Validation failed");

        ErrorResponse errorResponse = buildErrorResponse(HttpStatus.BAD_REQUEST,
                "Validation error: " + message,
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    /**
     * Handler for authentication failures (bad credentials, etc.).
     * 
     * @param ex      The AuthenticationException that was thrown.
     * @param request The HttpServletRequest that caused the exception.
     * @return Error response for authentication failures.
     */
    @ExceptionHandler({ AuthenticationException.class, BadCredentialsException.class })
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex,
            HttpServletRequest request) {
        ErrorResponse errorResponse = buildErrorResponse(HttpStatus.UNAUTHORIZED,
                "Invalid email or password",
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    /**
     * Generic exception handler for all unhandled exceptions.
     * 
     * @param ex      The exception that was thrown.
     * @param request The HttpServletRequest that caused the exception, used to get
     *                the request URI.
     * @return A generic error response indicating that an unexpected error
     *         occurred.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleAllExceptions(Exception ex, HttpServletRequest request) {
        ErrorResponse errorResponse = buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                "An unexpected error occurred: " + ex.getMessage(),
                request.getRequestURI());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

}
