package com.fl4nk3r.luminalib.exception;

/**
 * Custom exception for unauthorized access scenarios.
 * This exception is thrown when a user attempts to access a resource or perform
 * an action that they do not have permission for (e.g., accessing admin-only
 * endpoints without proper authentication).
 * It extends RuntimeException, allowing it to be thrown without being declared
 * in method signatures.
 * The exception message can provide details about the unauthorized access
 * attempt,
 * aiding in debugging and user feedback.
 * 
 * Example usage: * throw new UnauthorizedException("User does not have admin
 * privileges");
 * 
 * @author fl4nk3r
 * @version 1.0
 * @since 2025-02
 */
public class UnauthorizedException extends RuntimeException {
    /**
     * Constructor for UnauthorizedException.
     * 
     * @param message The detail message for the exception.
     */
    public UnauthorizedException(String message) {
        super(message);
    }
}
