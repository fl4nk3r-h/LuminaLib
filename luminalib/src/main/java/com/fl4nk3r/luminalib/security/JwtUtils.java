package com.fl4nk3r.luminalib.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private long jwtExpirationMs;

    /**
     * Generates JWT token from username
     * 
     * @param userDetails User details
     * @return JWT token string
     */
    public String generateJwtToken(UserDetails userDetails) {
        return generateTokenFromUsername(userDetails.getUsername());
    }

    /**
     * Generates JWT token from username string
     * 
     * @param username Username/email
     * @return JWT token string
     */
    public String generateTokenFromUsername(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts username from JWT token
     * 
     * @param token JWT token
     * @return Username
     */
    public String getUserNameFromJwtToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Validates JWT token
     * 
     * @param token       JWT token
     * @param userDetails User details
     * @return true if valid
     */
    public boolean validateJwtToken(String token, UserDetails userDetails) {
        final String username = getUserNameFromJwtToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    /**
     * Validates JWT token structure and expiration
     * 
     * @param authToken JWT token
     * @return true if valid
     */
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            // Log the exception if needed
            return false;
        }
    }

    /**
     * Extracts specific claim from token
     * 
     * @param token          JWT token
     * @param claimsResolver Function to extract claim
     * @return Extracted claim
     */
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Extracts all claims from token
     * 
     * @param token JWT token
     * @return Claims
     */
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Checks if token is expired
     * 
     * @param token JWT token
     * @return true if expired
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts expiration date from token
     * 
     * @param token JWT token
     * @return Expiration date
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Gets the signing key for JWT
     * 
     * @return Key for signing
     */
    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
