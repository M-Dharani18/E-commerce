package com.textileshop.backend.controller;

import com.textileshop.backend.dto.OrderResponse;
import com.textileshop.backend.entity.OrderStatus;
import com.textileshop.backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/orders")
@PreAuthorize("hasAuthority('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderResponse>> getAllOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(orderService.getAllOrders(pageable));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<OrderResponse>> getOrdersByStatus(
            @PathVariable OrderStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(orderService.getOrdersByStatus(status, pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<OrderResponse>> searchOrders(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(orderService.searchOrders(query, pageable));
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> body) {
        OrderStatus newStatus = OrderStatus.valueOf(body.get("status"));
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, newStatus));
    }

    @PatchMapping("/{orderId}/verify-payment")
    public ResponseEntity<OrderResponse> verifyPayment(
            @PathVariable Long orderId,
            @RequestBody Map<String, Boolean> body) {
        boolean approved = body.getOrDefault("approved", false);
        return ResponseEntity.ok(orderService.verifyPayment(orderId, approved));
    }

    @PatchMapping("/{orderId}/tracking")
    public ResponseEntity<OrderResponse> updateTracking(
            @PathVariable Long orderId,
            @RequestBody Map<String, String> body) {
        String trackingNumber = body.get("trackingNumber");
        String courierPartner = body.get("courierPartner");
        return ResponseEntity.ok(orderService.updateTracking(orderId, trackingNumber, courierPartner));
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        return ResponseEntity.ok(orderService.getOrderStatistics());
    }
}