package com.textileshop.backend.controller;

import com.textileshop.backend.dto.UserProfileRequest;
import com.textileshop.backend.entity.User;
import com.textileshop.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // Get Current User Profile
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(Authentication authentication) {
        String email = authentication.getName();
        User user = userService.getUserProfile(email);
        return ResponseEntity.ok(user);
    }

    // Update User Profile
    @PutMapping("/profile")
    public ResponseEntity<?> updateUserProfile(Authentication authentication,
                                               @Valid @RequestBody UserProfileRequest request) {
        String email = authentication.getName();
        User updatedUser = userService.updateUserProfile(email, request);
        return ResponseEntity.ok(updatedUser);
    }

    // Upload Profile Picture
    @PostMapping("/profile/picture")
    public ResponseEntity<?> uploadProfilePicture(Authentication authentication,
                                                  @RequestParam("file") MultipartFile file) {
        String email = authentication.getName();
        String imageUrl = userService.uploadProfilePicture(email, file);
        return ResponseEntity.ok(Map.of("imageUrl", imageUrl, "message", "Profile picture uploaded successfully"));
    }
}

