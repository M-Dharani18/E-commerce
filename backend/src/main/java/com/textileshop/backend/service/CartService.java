package com.textileshop.backend.service;

import com.textileshop.backend.dto.CartItemResponse;
import com.textileshop.backend.entity.CartItem;
import com.textileshop.backend.entity.Product;
import com.textileshop.backend.entity.User;
import com.textileshop.backend.exception.ResourceNotFoundException;
import com.textileshop.backend.repository.CartRepository;
import com.textileshop.backend.repository.ProductRepository;
import com.textileshop.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public List<CartItemResponse> getCart(String email) {
        User user = getUser(email);
        return cartRepository.findByUserId(user.getId())
                .stream().map(CartItemResponse::from).collect(Collectors.toList());
    }

    @Transactional
    public CartItemResponse addToCart(String email, Long productId, int quantity) {
        User user = getUser(email);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (!product.getIsActive()) throw new IllegalStateException("Product is not available");
        if (product.getStockQuantity() < quantity) throw new IllegalStateException("Insufficient stock");

        CartItem item = cartRepository.findByUserIdAndProductId(user.getId(), productId)
                .orElse(CartItem.builder().user(user).product(product).quantity(0).build());

        int newQty = item.getQuantity() + quantity;
        if (newQty > product.getStockQuantity()) throw new IllegalStateException("Insufficient stock");
        item.setQuantity(newQty);
        return CartItemResponse.from(cartRepository.save(item));
    }

    @Transactional
    public CartItemResponse updateQuantity(String email, Long itemId, int quantity) {
        User user = getUser(email);
        CartItem item = cartRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!item.getUser().getId().equals(user.getId())) throw new SecurityException("Unauthorized");
        if (quantity <= 0) { cartRepository.delete(item); return null; }
        if (quantity > item.getProduct().getStockQuantity()) throw new IllegalStateException("Insufficient stock");
        item.setQuantity(quantity);
        return CartItemResponse.from(cartRepository.save(item));
    }

    @Transactional
    public void removeFromCart(String email, Long itemId) {
        User user = getUser(email);
        CartItem item = cartRepository.findById(itemId)
                .orElseThrow(() -> new ResourceNotFoundException("Cart item not found"));
        if (!item.getUser().getId().equals(user.getId())) throw new SecurityException("Unauthorized");
        cartRepository.delete(item);
    }

    @Transactional
    public void clearCart(String email) {
        User user = getUser(email);
        cartRepository.deleteByUserId(user.getId());
    }

    /**
     * Returns a quick summary of the cart for the given user.  The
     * shipping charge is calculated based on the delivery state passed
     * in; if the state equals Tamil Nadu (case‑insensitive) the charge is
     * waived, otherwise a flat ₹80 applies.  A flat 10% discount is
     * applied to all orders and returned as a separate field.
     *
     * @param email   user email
     * @param state   delivery state (may be null)
     */
    public Map<String, Object> getCartSummary(String email, String state) {
        List<CartItemResponse> items = getCart(email);
        BigDecimal subtotal = items.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // calculate discount (10% of subtotal)
        BigDecimal discount = subtotal.multiply(BigDecimal.valueOf(0.10))
                .setScale(0, BigDecimal.ROUND_HALF_UP);
        BigDecimal discounted = subtotal.subtract(discount);

        // shipping depends solely on state
        BigDecimal shipping;
        if (state != null && state.trim().equalsIgnoreCase("Tamil Nadu")) {
            shipping = BigDecimal.ZERO;
        } else {
            shipping = BigDecimal.valueOf(80);
        }

        BigDecimal total = discounted.add(shipping);
        return Map.of(
                "items", items,
                "subtotal", subtotal,
                "discount", discount,
                "shipping", shipping,
                "total", total,
                "itemCount", items.size()
        );
    }

    public int getCartCount(String email) {
        User user = getUser(email);
        return cartRepository.countByUserId(user.getId());
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}