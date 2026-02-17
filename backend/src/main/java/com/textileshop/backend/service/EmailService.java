package com.textileshop.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    public void sendTestMail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Test Mail - Sri Aboorva Silk House");
        message.setText("This is a test email from Sri Aboorva Silk House.");
        mailSender.send(message);
    }

    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Email Verification - Sri Aboorva Silk House");
        message.setText("Click the link below to verify your email:\n\n" +
                baseUrl + "/verify-email?token=" + token);
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset - Sri Aboorva Silk House");
        message.setText("Click the link below to reset your password:\n\n" +
                baseUrl + "/reset-password?token=" + token + "\n\n" +
                "This link will expire in 1 hour.");
        mailSender.send(message);
    }
}