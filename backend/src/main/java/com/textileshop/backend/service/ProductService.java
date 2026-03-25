// package com.textileshop.backend.service;

// import com.textileshop.backend.dto.ProductRequest;
// import com.textileshop.backend.entity.Category;
// import com.textileshop.backend.entity.Product;
// import com.textileshop.backend.exception.ResourceNotFoundException;
// import com.textileshop.backend.repository.CategoryRepository;
// import com.textileshop.backend.repository.ProductRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.data.domain.Page;
// import org.springframework.data.domain.PageRequest;
// import org.springframework.data.domain.Pageable;
// import org.springframework.data.domain.Sort;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class ProductService {

//     @Autowired
//     private ProductRepository productRepository;

//     @Autowired
//     private CategoryRepository categoryRepository;

//     public Page<Product> getAllProducts(int page, int size, String search) {
//         Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
//         if (search != null && !search.isEmpty()) {
//             return productRepository.findByNameContainingIgnoreCase(search, pageable);
//         }
//         return productRepository.findAll(pageable);
//     }

//     public List<Product> getFeaturedProducts() {
//         return productRepository.findByIsFeaturedTrueAndIsActiveTrue();
//     }

//     public List<Product> getProductsByCategory(Long categoryId) {
//         return productRepository.findByCategoryIdAndIsActiveTrue(categoryId);
//     }

//     public Product getProductById(Long id) {
//         return productRepository.findById(id)
//                 .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
//     }

//     public Product createProduct(ProductRequest request) {
//         Category category = categoryRepository.findById(request.getCategoryId())
//                 .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

//         Product product = new Product();
//         product.setName(request.getName());
//         product.setDescription(request.getDescription());
//         product.setPrice(request.getPrice());
//         product.setOriginalPrice(request.getOriginalPrice());
//         product.setDiscountPercent(request.getDiscountPercent());
//         product.setImageUrl(request.getImageUrl());
//         product.setStockQuantity(request.getStockQuantity());
//         product.setCategory(category);
//         product.setIsFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false);
//         product.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);

//         return productRepository.save(product);
//     }

//     public Product updateProduct(Long id, ProductRequest request) {
//         Product product = getProductById(id);
//         Category category = categoryRepository.findById(request.getCategoryId())
//                 .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

//         product.setName(request.getName());
//         product.setDescription(request.getDescription());
//         product.setPrice(request.getPrice());
//         product.setOriginalPrice(request.getOriginalPrice());
//         product.setDiscountPercent(request.getDiscountPercent());
//         if (request.getImageUrl() != null) {
//             product.setImageUrl(request.getImageUrl());
//         }
//         product.setStockQuantity(request.getStockQuantity());
//         product.setCategory(category);
//         if (request.getIsFeatured() != null) {
//             product.setIsFeatured(request.getIsFeatured());
//         }
//         if (request.getIsActive() != null) {
//             product.setIsActive(request.getIsActive());
//         }

//         return productRepository.save(product);
//     }

//     public Product updateProductImage(Long id, String imageUrl) {
//         Product product = getProductById(id);
//         product.setImageUrl(imageUrl);
//         return productRepository.save(product);
//     }

//     public Product toggleFeatured(Long id) {
//         Product product = getProductById(id);
//         product.setIsFeatured(!product.getIsFeatured());
//         return productRepository.save(product);
//     }

//     public Product toggleActive(Long id) {
//         Product product = getProductById(id);
//         product.setIsActive(!product.getIsActive());
//         return productRepository.save(product);
//     }

//     public void deleteProduct(Long id) {
//         Product product = getProductById(id);
//         productRepository.delete(product);
//     }
// }





package com.textileshop.backend.service;

import com.textileshop.backend.dto.ProductRequest;
import com.textileshop.backend.entity.Category;
import com.textileshop.backend.entity.Product;
import com.textileshop.backend.exception.ResourceNotFoundException;
import com.textileshop.backend.repository.CategoryRepository;
import com.textileshop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<Product> getAllProducts(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        if (search != null && !search.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCase(search, pageable);
        }
        return productRepository.findAll(pageable);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue();
    }

    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryIdAndIsActiveTrue(categoryId);
    }
    
    public List<Product> getProductsByGender(String gender) {
        return productRepository.findByGenderAndIsActiveTrue(gender);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    public Product createProduct(ProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setDiscountPercent(request.getDiscountPercent());
        product.setImageUrl(request.getImageUrl());
        product.setStockQuantity(request.getStockQuantity());
        product.setCategory(category);
        product.setIsFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false);
        product.setIsActive(request.getIsActive() != null ? request.getIsActive() : true);
        
        // Set filter attributes
        product.setColours(request.getColours());
        product.setSizes(request.getSizes());
        product.setGender(request.getGender());
        product.setFabric(request.getFabric());
        product.setOccasion(request.getOccasion());

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, ProductRequest request) {
        Product product = getProductById(id);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setDiscountPercent(request.getDiscountPercent());
        if (request.getImageUrl() != null) {
            product.setImageUrl(request.getImageUrl());
        }
        product.setStockQuantity(request.getStockQuantity());
        product.setCategory(category);
        if (request.getIsFeatured() != null) {
            product.setIsFeatured(request.getIsFeatured());
        }
        if (request.getIsActive() != null) {
            product.setIsActive(request.getIsActive());
        }
        
        // Update filter attributes
        product.setColours(request.getColours());
        product.setSizes(request.getSizes());
        product.setGender(request.getGender());
        product.setFabric(request.getFabric());
        product.setOccasion(request.getOccasion());

        return productRepository.save(product);
    }

    public Product updateProductImage(Long id, String imageUrl) {
        Product product = getProductById(id);
        product.setImageUrl(imageUrl);
        return productRepository.save(product);
    }

    public Product toggleFeatured(Long id) {
        Product product = getProductById(id);
        product.setIsFeatured(!product.getIsFeatured());
        return productRepository.save(product);
    }

    public Product toggleActive(Long id) {
        Product product = getProductById(id);
        product.setIsActive(!product.getIsActive());
        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}