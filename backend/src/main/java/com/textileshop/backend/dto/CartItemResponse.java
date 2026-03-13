package com.textileshop.backend.dto;

import com.textileshop.backend.entity.CartItem;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class CartItemResponse {
    private Long id;
    private Long productId;
    private String productName;
    private String productImage;
    private String categoryName;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer discountPercent;
    private Integer quantity;
    private Integer stockQuantity;
    private BigDecimal subtotal;

    public static CartItemResponse from(CartItem item) {
        CartItemResponse r = new CartItemResponse();
        r.setId(item.getId());
        r.setProductId(item.getProduct().getId());
        r.setProductName(item.getProduct().getName());
        r.setProductImage(item.getProduct().getImageUrl());
        r.setCategoryName(item.getProduct().getCategory() != null ? item.getProduct().getCategory().getName() : null);
        r.setPrice(item.getProduct().getPrice());
        r.setOriginalPrice(item.getProduct().getOriginalPrice());
        r.setDiscountPercent(item.getProduct().getDiscountPercent());
        r.setQuantity(item.getQuantity());
        r.setStockQuantity(item.getProduct().getStockQuantity());
        r.setSubtotal(item.getProduct().getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        return r;
    }
}