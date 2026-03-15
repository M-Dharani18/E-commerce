//package com.textileshop.backend.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        http
//                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers(
//                                "/api/test/mail",   // allow mail test
//                                "/login"
//                        ,"/api/images/upload").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .formLogin(form -> form.disable()) // disable default login page
//                .httpBasic(httpBasic -> httpBasic.disable());
//
//        return http.build();
//    }
//}


package com.textileshop.backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> {})
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // Public endpoints
                        .requestMatchers("/", "/error").permitAll()
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/api/test/mail").permitAll()
                        .requestMatchers("/api/products/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/images/upload").permitAll()
                        .requestMatchers("/api/categories/**").permitAll()
                        .requestMatchers("/api/reviews/product/**").permitAll()

                        // Admin-only endpoints
                        .requestMatchers("/api/admin/**").hasAuthority("ADMIN")

                        // Cart & Wishlist — accessible by both CUSTOMER and ADMIN
                        // (ADMIN may browse/test; @PreAuthorize handles finer logic)
                        .requestMatchers("/api/cart/**").hasAnyAuthority("CUSTOMER", "ADMIN")
                        .requestMatchers("/api/wishlist/**").hasAnyAuthority("CUSTOMER", "ADMIN")
                        .requestMatchers("/api/payments/**").hasAnyAuthority("CUSTOMER", "ADMIN")

                        // Customer-only endpoints
                        .requestMatchers("/api/user/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/api/orders/**").hasAuthority("CUSTOMER")
                        .requestMatchers("/api/reviews/create").hasAuthority("CUSTOMER")

                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of(
        "http://localhost:5173",
        "https://aboorvasilks.vercel.app",
        "https://e-commerce-delta-silk-18.vercel.app"
));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

