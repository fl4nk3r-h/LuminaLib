package com.fl4nk3r.luminalib.exception;

/**
 * Custom exception for bad request scenarios.
 * This exception is thrown when the client sends a request that is invalid or
 * cannot be processed by the server (e.g., missing required fields, invalid
 * data format).
 * It extends RuntimeException, allowing it to be thrown without being declared
 * in method signatures.
 * The exception message can provide details about the nature of the bad
 * request,
 * aiding in debugging and user feedback.
 * 
 * Example usage: * throw new BadRequestException("Missing required field:
 * title");
 * 
 * @author fl4nk3r
 * @version 1.0
 * @since 2025-02
 */
public class BadRequestException extends RuntimeException {
    /**
     * Constructor for BadRequestException.
     * 
     * @param message The detail message for the exception.
     */
    public BadRequestException(String message) {
        super(message);
    }
}
