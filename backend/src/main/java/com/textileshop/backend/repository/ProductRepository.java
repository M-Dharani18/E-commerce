package com.textileshop.backend.repository;

import com.textileshop.backend.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByIsFeaturedTrueAndIsActiveTrue();
    List<Product> findByCategoryIdAndIsActiveTrue(Long categoryId);
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);
}