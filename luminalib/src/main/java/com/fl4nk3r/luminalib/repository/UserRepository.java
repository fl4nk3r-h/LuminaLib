package com.fl4nk3r.luminalib.repository;

import com.fl4nk3r.luminalib.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find a user by email
     * @param email User email
     * @return Optional containing user if found
     */
    Optional<User> findByEmail(String email);

    /**
     * Check if email already exists
     * @param email Email to check
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
}
