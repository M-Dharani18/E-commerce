package com.textileshop.backend.entity;

public enum PaymentStatus {
    PENDING,               // Payment not yet received
    PENDING_VERIFICATION,  // UPI screenshot uploaded, awaiting verification
    VERIFIED,              // Payment verified by admin
    COMPLETED,             // Payment completed
    FAILED,                // Payment failed
    REFUNDED               // Payment refunded
}