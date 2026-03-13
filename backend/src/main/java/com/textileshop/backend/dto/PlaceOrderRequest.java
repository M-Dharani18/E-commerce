package com.textileshop.backend.dto;

import com.textileshop.backend.entity.PaymentMethod;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PlaceOrderRequest {

    @NotNull(message = "Address ID is required")
    private Long addressId;

    @NotNull(message = "Payment method is required")
    private PaymentMethod paymentMethod;

    // For UPI payments
    private String utrNumber;
    private String screenshotUrl;

    // Customer notes
    private String notes;
}