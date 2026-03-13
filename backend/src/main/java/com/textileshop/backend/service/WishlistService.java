package com.textileshop.backend.service;

import com.textileshop.backend.entity.Product;
import com.textileshop.backend.entity.User;
import com.textileshop.backend.entity.WishlistItem;
import com.textileshop.backend.exception.ResourceNotFoundException;
import com.textileshop.backend.repository.ProductRepository;
import com.textileshop.backend.repository.UserRepository;
import com.textileshop.backend.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<Product> getWishlist(String email) {
        User user = getUser(email);
        return wishlistRepository.findByUserId(user.getId())
                .stream().map(WishlistItem::getProduct).collect(Collectors.toList());
    }

    @Transactional
    public Map<String, Object> toggleWishlist(String email, Long productId) {
        User user = getUser(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        var existing = wishlistRepository.findByUserIdAndProductId(user.getId(), productId);
        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());
            return Map.of("wishlisted", false, "message", "Removed from wishlist");
        } else {
            WishlistItem item = WishlistItem.builder().user(user).product(product).build();
            wishlistRepository.save(item);
            return Map.of("wishlisted", true, "message", "Added to wishlist");
        }
    }

    @Transactional
    public void removeFromWishlist(String email, Long productId) {
        User user = getUser(email);
        wishlistRepository.deleteByUserIdAndProductId(user.getId(), productId);
    }

    public boolean isWishlisted(String email, Long productId) {
        User user = getUser(email);
        return wishlistRepository.existsByUserIdAndProductId(user.getId(), productId);
    }

    public Map<String, Object> getWishlistStatus(String email, List<Long> productIds) {
        User user = getUser(email);
        List<WishlistItem> items = wishlistRepository.findByUserId(user.getId());
        var wishlisted = items.stream()
                .map(i -> i.getProduct().getId())
                .collect(Collectors.toSet());
        return Map.of("wishlistedIds", wishlisted);
    }

    public int getWishlistCount(String email) {
        User user = getUser(email);
        return wishlistRepository.countByUserId(user.getId());
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}