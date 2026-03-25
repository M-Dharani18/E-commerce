package com.textileshop.backend.entity;

import lombok.*;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder


@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discountPercent;
    
    private String imageUrl;
    private Integer stockQuantity;
    private Boolean isFeatured;
    private Boolean isActive;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;

    private String colours;
    private String sizes;
    private String gender;
    private String fabric;
    private String occasion;
}