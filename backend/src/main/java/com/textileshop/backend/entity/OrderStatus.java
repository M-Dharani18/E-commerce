package com.textileshop.backend.entity;

public enum OrderStatus {
    PLACED,      // Order placed by customer
    CONFIRMED,   // Order confirmed by admin
    PACKED,      // Order packed
    SHIPPED,     // Order shipped
    DELIVERED,   // Order delivered
    CANCELLED,   // Order cancelled
    RETURNED     // Order returned
}