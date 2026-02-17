package com.textileshop.backend.dto;

import lombok.Data;
import jakarta.validation.constraints.Size;

@Data
public class UserProfileRequest {
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits")
    private String phone;

    private String address;
}
