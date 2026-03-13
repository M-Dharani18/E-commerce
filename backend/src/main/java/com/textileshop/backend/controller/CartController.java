package com.textileshop.backend.controller;

import com.textileshop.backend.dto.CartItemResponse;
import com.textileshop.backend.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart(
            Principal principal,
            @RequestParam(value = "state", required = false) String state) {
        // note: state may be null; service will treat anything other than
        // Tamil Nadu as outside and charge ₹80 by default
        return ResponseEntity.ok(cartService.getCartSummary(principal.getName(), state));
    }

    @GetMapping("/count")
    public ResponseEntity<?> getCount(Principal principal) {
        return ResponseEntity.ok(Map.of("count", cartService.getCartCount(principal.getName())));
    }

    @PostMapping("/add")
    public ResponseEntity<CartItemResponse> addToCart(
            Principal principal,
            @RequestParam Long productId,
            @RequestParam(defaultValue = "1") int quantity) {
        return ResponseEntity.ok(cartService.addToCart(principal.getName(), productId, quantity));
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> updateQuantity(
            Principal principal,
            @PathVariable Long itemId,
            @RequestParam int quantity) {
        CartItemResponse updated = cartService.updateQuantity(principal.getName(), itemId, quantity);
        if (updated == null) return ResponseEntity.ok(Map.of("message", "Item removed"));
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<?> removeItem(Principal principal, @PathVariable Long itemId) {
        cartService.removeFromCart(principal.getName(), itemId);
        return ResponseEntity.ok(Map.of("message", "Item removed from cart"));
    }

    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(Principal principal) {
        cartService.clearCart(principal.getName());
        return ResponseEntity.ok(Map.of("message", "Cart cleared"));
    }
}