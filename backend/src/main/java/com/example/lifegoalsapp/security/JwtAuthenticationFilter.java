package com.example.lifegoalsapp.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtTokenProvider tokenProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);
            String requestURI = request.getRequestURI();
            String method = request.getMethod();
            logger.debug("Processing request to: {} with method: {}", requestURI, method);
            
            // Skip token validation for OPTIONS requests (CORS preflight)
            if ("OPTIONS".equalsIgnoreCase(method)) {
                logger.debug("Skipping token validation for OPTIONS request");
                filterChain.doFilter(request, response);
                return;
            }
            
            // Skip token validation for auth endpoints
            if (requestURI.startsWith("/api/auth/")) {
                logger.debug("Skipping token validation for auth endpoint");
                filterChain.doFilter(request, response);
                return;
            }

            logger.debug("JWT token present: {}", jwt != null);

            if (StringUtils.hasText(jwt)) {
                boolean isValid = tokenProvider.validateToken(jwt);
                logger.debug("JWT token validation result: {}", isValid);

                if (isValid) {
                    String userEmail = tokenProvider.getUserEmailFromToken(jwt);
                    logger.debug("User email from token: {}", userEmail);
                    
                    if (userEmail != null) {
                        UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
                        
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                        logger.debug("Authentication set in SecurityContext for user: {}", userEmail);
                    } else {
                        logger.error("Could not get user email from token");
                    }
                } else {
                    logger.error("Invalid JWT token");
                }
            } else {
                logger.debug("No JWT token found in request");
            }

            filterChain.doFilter(request, response);
        } catch (Exception ex) {
            logger.error("Could not set user authentication in security context: {}", ex.getMessage(), ex);
            filterChain.doFilter(request, response);
        }
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        logger.debug("Authorization header: {}", bearerToken);
        
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
} 