package com.fl4nk3r.luminalib.security;

import com.fl4nk3r.luminalib.entity.User;
import com.fl4nk3r.luminalib.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    
    private final UserRepository userRepository;

    /**
     * Loads user by email (username in this context)
     * This method is called by Spring Security during authentication
     * @param username The user's email address
     * @return UserDetails object containing user information
     * @throws UsernameNotFoundException if user with given email is not found
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "User not found with email: " + username));
        
        return user;
    }
}
