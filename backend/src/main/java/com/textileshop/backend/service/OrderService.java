package com.textileshop.backend.service;

import com.textileshop.backend.dto.CartItemResponse;
import com.textileshop.backend.dto.OrderResponse;
import com.textileshop.backend.dto.PlaceOrderRequest;
import com.textileshop.backend.entity.*;
import com.textileshop.backend.exception.ResourceNotFoundException;
import com.textileshop.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Year;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final CartService cartService;
    private final ProductRepository productRepository;
    private final EmailService emailService;
    /**
     * Generate sequential order number in format: ASS-YYYY-NNNNN
     * Example: ASS-2026-00001, ASS-2026-00002, etc.
     */
    private synchronized String generateOrderNumber() {
        Long maxId = orderRepository.findMaxId();
        long nextNumber = (maxId == null ? 0 : maxId) + 1;
        int currentYear = Year.now().getValue();
        return String.format("ASS-%d-%05d", currentYear, nextNumber);
    }

    @Transactional
    public OrderResponse placeOrder(String email, PlaceOrderRequest request) {
        User user = getUser(email);

        // Get cart items
        List<CartItemResponse> cartItems = cartService.getCart(email);
        if (cartItems.isEmpty()) {
            throw new IllegalStateException("Cart is empty");
        }

        // Get delivery address
        Address address = addressRepository.findById(request.getAddressId())
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (!address.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized");
        }

        // Calculate pricing
        BigDecimal subtotal = cartItems.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal deliveryCharge = subtotal.compareTo(BigDecimal.valueOf(999)) >= 0
                ? BigDecimal.ZERO
                : BigDecimal.valueOf(99);

        BigDecimal tax = BigDecimal.ZERO; // Can add GST calculation here
        BigDecimal grandTotal = subtotal.add(deliveryCharge).add(tax);

        // Determine payment status
        PaymentStatus paymentStatus;
        if (request.getPaymentMethod() == PaymentMethod.COD) {
            paymentStatus = PaymentStatus.PENDING; // Will pay on delivery
        } else if (request.getPaymentMethod() == PaymentMethod.UPI && request.getUtrNumber() != null) {
            paymentStatus = PaymentStatus.PENDING_VERIFICATION; // Admin needs to verify
        } else {
            paymentStatus = PaymentStatus.COMPLETED; // Razorpay/Card payments
        }

        // Create order
        Order order = Order.builder()
                .orderNumber(generateOrderNumber())
                .user(user)
                .deliveryName(address.getFullName())
                .deliveryPhone(address.getPhone())
                .deliveryEmail(address.getEmail())
                .deliveryAddressLine1(address.getAddressLine1())
                .deliveryAddressLine2(address.getAddressLine2())
                .deliveryCity(address.getCity())
                .deliveryState(address.getState())
                .deliveryPincode(address.getPincode())
                .subtotal(subtotal)
                .discount(BigDecimal.ZERO)
                .deliveryCharge(deliveryCharge)
                .tax(tax)
                .grandTotal(grandTotal)
                .paymentMethod(request.getPaymentMethod())
                .paymentStatus(paymentStatus)
                .utrNumber(request.getUtrNumber())
                .screenshotUrl(request.getScreenshotUrl())
                .status(OrderStatus.PLACED)
                .customerNotes(request.getNotes())
                .build();

        // Create order items
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItemResponse cartItem : cartItems) {
            // Check stock availability
            Product product = productRepository.findById(cartItem.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            if (product.getStockQuantity() < cartItem.getQuantity()) {
                throw new IllegalStateException("Insufficient stock for " + product.getName());
            }

            // Reduce stock
            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);

            // Create order item
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .productId(cartItem.getProductId())
                    .productName(cartItem.getProductName())
                    .productImage(cartItem.getProductImage())
                    .categoryName(cartItem.getCategoryName())
                    .price(cartItem.getPrice())
                    .originalPrice(cartItem.getOriginalPrice())
                    .discountPercent(cartItem.getDiscountPercent())
                    .quantity(cartItem.getQuantity())
                    .subtotal(cartItem.getSubtotal())
                    .build();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);

        // Save order
        Order savedOrder = orderRepository.save(order);

        // Clear cart
        cartService.clearCart(email);

        return OrderResponse.from(savedOrder);
    }

    public List<OrderResponse> getMyOrders(String email) {
        User user = getUser(email);
        List<Order> orders = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return orders.stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderDetails(String email, String orderNumber) {
        User user = getUser(email);
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized");
        }

        return OrderResponse.from(order);
    }

    @Transactional
    public OrderResponse cancelOrder(String email, String orderNumber, String reason) {
        User user = getUser(email);
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new SecurityException("Unauthorized");
        }

        if (order.getStatus() != OrderStatus.PLACED && order.getStatus() != OrderStatus.CONFIRMED) {
            throw new IllegalStateException("Cannot cancel order at this stage");
        }

        order.setStatus(OrderStatus.CANCELLED);
        order.setCancellationReason(reason);
        order.setCancelledAt(LocalDateTime.now());

        // Restore stock
        for (OrderItem item : order.getItems()) {
            Product product = productRepository.findById(item.getProductId()).orElse(null);
            if (product != null) {
                product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                productRepository.save(product);
            }
        }
        Order saved = orderRepository.save(order);
        // Send cancellation email
        try { emailService.sendOrderStatusEmail(saved); } catch (Exception ignored) {}

        return OrderResponse.from(saved);
    }

    // Admin methods
    public Page<OrderResponse> getAllOrders(Pageable pageable) {
        return orderRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(OrderResponse::from);
    }

    public Page<OrderResponse> getOrdersByStatus(OrderStatus status, Pageable pageable) {
        return orderRepository.findByStatusOrderByCreatedAtDesc(status, pageable)
                .map(OrderResponse::from);
    }

    public Page<OrderResponse> searchOrders(String query, Pageable pageable) {
        return orderRepository
                .findByOrderNumberContainingOrUserNameContainingOrUserEmailContainingOrderByCreatedAtDesc(
                        query, query, query, pageable)
                .map(OrderResponse::from);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        order.setStatus(newStatus);

        // Update timestamps
        LocalDateTime now = LocalDateTime.now();
        switch (newStatus) {
            case CONFIRMED -> order.setConfirmedAt(now);
            case PACKED -> order.setPackedAt(now);
            case SHIPPED -> order.setShippedAt(now);
            case DELIVERED -> order.setDeliveredAt(now);
            case CANCELLED -> order.setCancelledAt(now);
        }

        Order saved = orderRepository.save(order);
        // Send email notification for key status changes
        try { emailService.sendOrderStatusEmail(saved); } catch (Exception ignored) {}

        return OrderResponse.from(saved);
    }

    @Transactional
    public OrderResponse verifyPayment(Long orderId, boolean approved) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        if (approved) {
            order.setPaymentStatus(PaymentStatus.VERIFIED);
            order.setStatus(OrderStatus.CONFIRMED);
            order.setConfirmedAt(LocalDateTime.now());
        } else {
            order.setPaymentStatus(PaymentStatus.FAILED);
            order.setStatus(OrderStatus.CANCELLED);
            order.setCancellationReason("Payment verification failed");
            order.setCancelledAt(LocalDateTime.now());

            // Restore stock
            for (OrderItem item : order.getItems()) {
                Product product = productRepository.findById(item.getProductId()).orElse(null);
                if (product != null) {
                    product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
                    productRepository.save(product);
                }
            }
        }

        Order saved = orderRepository.save(order);
 
        // Send email on payment verification
        try { emailService.sendOrderStatusEmail(saved); } catch (Exception ignored) {}

        return OrderResponse.from(saved);
    }

    @Transactional
    public OrderResponse updateTracking(Long orderId, String trackingNumber, String courierPartner) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        order.setTrackingNumber(trackingNumber);
        order.setCourierPartner(courierPartner);

        return OrderResponse.from(orderRepository.save(order));
    }

    public Map<String, Object> getOrderStatistics() {
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
        LocalDateTime thisMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);

        return Map.of(
                "todayOrders", orderRepository.countOrdersSince(today),
                "monthOrders", orderRepository.countOrdersSince(thisMonth),
                "todayRevenue", orderRepository.sumRevenueSince(today) != null ? orderRepository.sumRevenueSince(today) : BigDecimal.ZERO,
                "monthRevenue", orderRepository.sumRevenueSince(thisMonth) != null ? orderRepository.sumRevenueSince(thisMonth) : BigDecimal.ZERO,
                "pendingOrders", orderRepository.countByStatus(OrderStatus.PLACED),
                "confirmedOrders", orderRepository.countByStatus(OrderStatus.CONFIRMED)
        );
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
}