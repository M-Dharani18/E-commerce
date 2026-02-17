package com.textileshop.backend.controller;

import com.textileshop.backend.service.EmailService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestMailController {

    private final EmailService emailService;

    public TestMailController(EmailService emailService) {
        this.emailService = emailService;
    }

    @GetMapping("/api/test/mail")
    public String testMail(@RequestParam String to) {
        emailService.sendTestMail(to);
        return "Mail sent successfully";
    }
}
