//package com.textileshop.backend.dto;
//
//import lombok.Data;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Positive;
//import jakarta.validation.constraints.Size;
//
//import java.math.BigDecimal;
//
//@Data
//public class ProductRequest {
//    @NotBlank(message = "Product name is required")
//    @Size(min = 2, max = 200, message = "Name must be between 2 and 200 characters")
//    private String name;
//
//    private String description;
//
//    @NotNull(message = "Price is required")
//    @Positive(message = "Price must be positive")
//    private BigDecimal price;
//
//    private BigDecimal originalPrice;
//
//    private Integer discountPercent;
//
//    private String imageUrl;
//
//    @NotNull(message = "Stock quantity is required")
//    private Integer stockQuantity = 0;
//
//    @NotNull(message = "Category is required")
//    private Long categoryId;
//
//    private Boolean isFeatured = false;
//
//    private Boolean isActive = true;
//
//    private String colours;
//    private String sizes;
//    private String gender;
//    private String fabric;
//    private String occasion;
//}




package com.textileshop.backend.dto;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.annotation.Nulls;
import lombok.Data;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;

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

    // ── Flexible colour field ──────────────────────────────────────────────
    // Accepts EITHER:
    //   "Black,Red,Gold"         (comma-string from old frontend)
    //   ["Black","Red","Gold"]   (array from new frontend)
    // Always stored as comma-separated String in DB
    private String colours;

    @JsonSetter(nulls = Nulls.SKIP)
    public void setColours(Object value) {
        if (value == null) {
            this.colours = null;
        } else if (value instanceof String) {
            this.colours = (String) value;
        } else if (value instanceof List) {
            @SuppressWarnings("unchecked")
            List<String> list = (List<String>) value;
            this.colours = String.join(",", list);
        } else {
            this.colours = value.toString();
        }
    }

    // ── Flexible size field ────────────────────────────────────────────────
    // Same logic as colours
    private String sizes;

    @JsonSetter(nulls = Nulls.SKIP)
    public void setSizes(Object value) {
        if (value == null) {
            this.sizes = null;
        } else if (value instanceof String) {
            this.sizes = (String) value;
        } else if (value instanceof List) {
            @SuppressWarnings("unchecked")
            List<String> list = (List<String>) value;
            this.sizes = String.join(",", list);
        } else {
            this.sizes = value.toString();
        }
    }

    // ── Simple string fields ───────────────────────────────────────────────
    private String gender;
    private String fabric;
    private String occasion;
}