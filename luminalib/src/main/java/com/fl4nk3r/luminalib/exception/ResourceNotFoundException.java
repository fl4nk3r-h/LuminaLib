package com.fl4nk3r.luminalib.exception;

/**
 * Custom exception for resource not found scenarios.
 * This exception is thrown when a requested resource (e.g., book, user) is not
 * found in the database.
 * It extends RuntimeException, allowing it to be thrown without being declared
 * in method signatures.
 * The exception message can provide details about the missing resource, aiding
 * in debugging and user feedback.
 * 
 * Example usage: * throw new ResourceNotFoundException("Book with ID " + id + "
 * not found");
 * 
 * @author fl4nk3r
 * @version 1.0
 * @since 2025-02
 */
public class ResourceNotFoundException extends RuntimeException {
    /**
     * Constructor for ResourceNotFoundException.
     * 
     * @param message The detail message for the exception.
     */
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
