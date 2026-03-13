package com.textileshop.backend.controller;

import com.textileshop.backend.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<?> getWishlist(Principal principal) {
        return ResponseEntity.ok(wishlistService.getWishlist(principal.getName()));
    }

    @GetMapping("/count")
    public ResponseEntity<?> getCount(Principal principal) {
        return ResponseEntity.ok(Map.of("count", wishlistService.getWishlistCount(principal.getName())));
    }

    @PostMapping("/toggle/{productId}")
    public ResponseEntity<?> toggle(Principal principal, @PathVariable Long productId) {
        return ResponseEntity.ok(wishlistService.toggleWishlist(principal.getName(), productId));
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> remove(Principal principal, @PathVariable Long productId) {
        wishlistService.removeFromWishlist(principal.getName(), productId);
        return ResponseEntity.ok(Map.of("message", "Removed from wishlist"));
    }

    @GetMapping("/check/{productId}")
    public ResponseEntity<?> check(Principal principal, @PathVariable Long productId) {
        return ResponseEntity.ok(Map.of("wishlisted", wishlistService.isWishlisted(principal.getName(), productId)));
    }
}