package com.mdcreativo.backenduserapp.auth;

import com.mdcreativo.backenduserapp.auth.filters.JWTAuthenticationFilter;
import com.mdcreativo.backenduserapp.auth.filters.JWTValidationFilter;
import jakarta.validation.constraints.NotBlank;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       //return httpSecurity.authorizeHttpRequests
        return http.authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/users").permitAll()
                .requestMatchers(HttpMethod.GET, "/users/{id}").hasAnyRole("ADMIN", "USER")
                .requestMatchers(HttpMethod.POST, "/users").hasAnyRole("ADMIN")
                .requestMatchers("/users/**").hasAnyRole("ADMIN")
                //.requestMatchers(HttpMethod.PUT, "/users/{id}").hasAnyRole("ADMIN")
                // .requestMatchers(HttpMethod.DELETE, "/users/{id}").hasAnyRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .addFilter(new JWTAuthenticationFilter(authenticationConfiguration.getAuthenticationManager()))
                .addFilter(new JWTValidationFilter(authenticationConfiguration.getAuthenticationManager()))
                .csrf( config -> config.disable())
                .sessionManagement(managment -> managment.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }
}
