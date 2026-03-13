package com.textileshop.backend.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    @NotBlank(message = "Product name is required")
    @Size(min = 2, max = 200, message = "Name must be between 2 and 200 characters")
    private String name;

    private String description;

    @NotNull(message = "Price is required")
    @Positive(message = "Price must be positive")
    private BigDecimal price;

    private BigDecimal originalPrice;

    private Integer discountPercent;

    private String imageUrl;

    @NotNull(message = "Stock quantity is required")
    private Integer stockQuantity = 0;

    @NotNull(message = "Category is required")
    private Long categoryId;

    private Boolean isFeatured = false;

    private Boolean isActive = true;
}