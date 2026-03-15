package com.textileshop.backend.config;
 
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
 
@Configuration
@EnableAsync
public class AsyncConfig {
    // Enables @Async annotation used in EmailService
    // Emails are sent in background thread — won't slow down API responses
}
 