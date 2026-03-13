package com.textileshop.backend.controller;

import com.textileshop.backend.dto.OrderResponse;
import com.textileshop.backend.dto.PlaceOrderRequest;
import com.textileshop.backend.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(
            Principal principal,
            @Valid @RequestBody PlaceOrderRequest request) {
        return ResponseEntity.ok(orderService.placeOrder(principal.getName(), request));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders(Principal principal) {
        return ResponseEntity.ok(orderService.getMyOrders(principal.getName()));
    }

    @GetMapping("/{orderNumber}")
    public ResponseEntity<OrderResponse> getOrderDetails(
            Principal principal,
            @PathVariable String orderNumber) {
        return ResponseEntity.ok(orderService.getOrderDetails(principal.getName(), orderNumber));
    }

    @PostMapping("/{orderNumber}/cancel")
    public ResponseEntity<OrderResponse> cancelOrder(
            Principal principal,
            @PathVariable String orderNumber,
            @RequestBody Map<String, String> body) {
        String reason = body.getOrDefault("reason", "Customer requested cancellation");
        return ResponseEntity.ok(orderService.cancelOrder(principal.getName(), orderNumber, reason));
    }
}