package com.textileshop.backend.dto;

import com.textileshop.backend.entity.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private String customerName;
    private String customerEmail;

    // Delivery Address
    private DeliveryAddressDTO address;

    // Items
    private List<OrderItemDTO> items;

    // Pricing
    private BigDecimal subtotal;
    private BigDecimal discount;
    private BigDecimal deliveryCharge;
    private BigDecimal tax;
    private BigDecimal grandTotal;

    // Payment
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;
    private String utrNumber;
    private String screenshotUrl;

    // Status
    private OrderStatus status;
    private String cancellationReason;

    // Tracking
    private String trackingNumber;
    private String courierPartner;

    // Notes
    private String customerNotes;
    private String adminNotes;

    // Timestamps
    private LocalDateTime createdAt;
    private LocalDateTime confirmedAt;
    private LocalDateTime packedAt;
    private LocalDateTime shippedAt;
    private LocalDateTime deliveredAt;
    private LocalDateTime cancelledAt;

    public static OrderResponse from(Order order) {
        OrderResponse response = new OrderResponse();
        response.setId(order.getId());
        response.setOrderNumber(order.getOrderNumber());
        response.setCustomerName(order.getUser().getName());
        response.setCustomerEmail(order.getUser().getEmail());

        // Address
        DeliveryAddressDTO addr = new DeliveryAddressDTO();
        addr.setFullName(order.getDeliveryName());
        addr.setPhone(order.getDeliveryPhone());
        addr.setEmail(order.getDeliveryEmail());
        addr.setAddressLine1(order.getDeliveryAddressLine1());
        addr.setAddressLine2(order.getDeliveryAddressLine2());
        addr.setCity(order.getDeliveryCity());
        addr.setState(order.getDeliveryState());
        addr.setPincode(order.getDeliveryPincode());
        response.setAddress(addr);

        // Items
        response.setItems(order.getItems().stream()
                .map(OrderItemDTO::from)
                .collect(Collectors.toList()));

        // Pricing
        response.setSubtotal(order.getSubtotal());
        response.setDiscount(order.getDiscount());
        response.setDeliveryCharge(order.getDeliveryCharge());
        response.setTax(order.getTax());
        response.setGrandTotal(order.getGrandTotal());

        // Payment
        response.setPaymentMethod(order.getPaymentMethod());
        response.setPaymentStatus(order.getPaymentStatus());
        response.setUtrNumber(order.getUtrNumber());
        response.setScreenshotUrl(order.getScreenshotUrl());

        // Status
        response.setStatus(order.getStatus());
        response.setCancellationReason(order.getCancellationReason());

        // Tracking
        response.setTrackingNumber(order.getTrackingNumber());
        response.setCourierPartner(order.getCourierPartner());

        // Notes
        response.setCustomerNotes(order.getCustomerNotes());
        response.setAdminNotes(order.getAdminNotes());

        // Timestamps
        response.setCreatedAt(order.getCreatedAt());
        response.setConfirmedAt(order.getConfirmedAt());
        response.setPackedAt(order.getPackedAt());
        response.setShippedAt(order.getShippedAt());
        response.setDeliveredAt(order.getDeliveredAt());
        response.setCancelledAt(order.getCancelledAt());

        return response;
    }

    @Data
    public static class DeliveryAddressDTO {
        private String fullName;
        private String phone;
        private String email;
        private String addressLine1;
        private String addressLine2;
        private String city;
        private String state;
        private String pincode;
    }

    @Data
    public static class OrderItemDTO {
        private Long id;
        private Long productId;
        private String productName;
        private String productImage;
        private String categoryName;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer discountPercent;
        private Integer quantity;
        private BigDecimal subtotal;

        public static OrderItemDTO from(OrderItem item) {
            OrderItemDTO dto = new OrderItemDTO();
            dto.setId(item.getId());
            dto.setProductId(item.getProductId());
            dto.setProductName(item.getProductName());
            dto.setProductImage(item.getProductImage());
            dto.setCategoryName(item.getCategoryName());
            dto.setPrice(item.getPrice());
            dto.setOriginalPrice(item.getOriginalPrice());
            dto.setDiscountPercent(item.getDiscountPercent());
            dto.setQuantity(item.getQuantity());
            dto.setSubtotal(item.getSubtotal());
            return dto;
        }
    }
}