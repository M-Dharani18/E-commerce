package com.textileshop.backend.repository;

import com.textileshop.backend.entity.Order;
import com.textileshop.backend.entity.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Customer queries
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    Optional<Order> findByOrderNumber(String orderNumber);

    // Admin queries
    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);
    Page<Order> findByStatusOrderByCreatedAtDesc(OrderStatus status, Pageable pageable);
    Page<Order> findByOrderNumberContainingOrUserNameContainingOrUserEmailContainingOrderByCreatedAtDesc(
            String orderNumber, String userName, String userEmail, Pageable pageable);

    // Statistics
    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt >= :startDate")
    Long countOrdersSince(LocalDateTime startDate);

    @Query("SELECT SUM(o.grandTotal) FROM Order o WHERE o.createdAt >= :startDate AND o.status != 'CANCELLED'")
    java.math.BigDecimal sumRevenueSince(LocalDateTime startDate);

    Long countByStatus(OrderStatus status);

    // For generating sequential order numbers
    @Query("SELECT MAX(o.id) FROM Order o")
    Long findMaxId();
}