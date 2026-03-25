//package com.textileshop.backend.controller;
//
//import com.textileshop.backend.dto.ProductRequest;
//import com.textileshop.backend.entity.Product;
//import com.textileshop.backend.service.CloudinaryService;
//import com.textileshop.backend.service.ProductService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/admin/products")
//@PreAuthorize("hasAuthority('ADMIN')")
//@CrossOrigin(origins = {"http://localhost:5173","https://aboorvasilks.vercel.app"})
//public class AdminProductController {
//
//    @Autowired
//    private ProductService productService;
//
//    @Autowired
//    private CloudinaryService cloudinaryService;
//
//    @GetMapping
//    public ResponseEntity<Page<Product>> getAllProducts(
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "20") int size,
//            @RequestParam(required = false) String search) {
//        Page<Product> products = productService.getAllProducts(page, size, search);
//        return ResponseEntity.ok(products);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
//        return ResponseEntity.ok(productService.getProductById(id));
//    }
//
//    @PostMapping
//    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
//        Product product = productService.createProduct(request);
//        return ResponseEntity.ok(product);
//    }
//
//    @PutMapping("/{id}")
//    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductRequest request) {
//        Product product = productService.updateProduct(id, request);
//        return ResponseEntity.ok(product);
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
//        productService.deleteProduct(id);
//        return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
//    }
//
//    @PostMapping("/{id}/image")
//    public ResponseEntity<?> uploadProductImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
//        try {
//            String imageUrl = cloudinaryService.uploadImage(file);
//            Product product = productService.updateProductImage(id, imageUrl);
//            return ResponseEntity.ok(Map.of("imageUrl", imageUrl, "product", product));
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body(Map.of("error", "Image upload failed: " + e.getMessage()));
//        }
//    }
//
//    @PatchMapping("/{id}/toggle-featured")
//    public ResponseEntity<Product> toggleFeatured(@PathVariable Long id) {
//        return ResponseEntity.ok(productService.toggleFeatured(id));
//    }
//
//    @PatchMapping("/{id}/toggle-active")
//    public ResponseEntity<Product> toggleActive(@PathVariable Long id) {
//        return ResponseEntity.ok(productService.toggleActive(id));
//    }
//}




package com.textileshop.backend.controller;

import com.textileshop.backend.dto.ProductRequest;
import com.textileshop.backend.entity.Product;
import com.textileshop.backend.service.CloudinaryService;
import com.textileshop.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/products")
@PreAuthorize("hasAuthority('ADMIN')")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "https://aboorvasilks.vercel.app"
})
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.getAllProducts(page, size, search));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.createProduct(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(Map.of("message", "Product deleted successfully"));
    }

    @PostMapping("/{id}/image")
    public ResponseEntity<?> uploadProductImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = cloudinaryService.uploadImage(file);
            Product product  = productService.updateProductImage(id, imageUrl);
            return ResponseEntity.ok(Map.of("imageUrl", imageUrl, "product", product));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", "Image upload failed: " + e.getMessage()));
        }
    }

    @PatchMapping("/{id}/toggle-featured")
    public ResponseEntity<Product> toggleFeatured(@PathVariable Long id) {
        return ResponseEntity.ok(productService.toggleFeatured(id));
    }

    @PatchMapping("/{id}/toggle-active")
    public ResponseEntity<Product> toggleActive(@PathVariable Long id) {
        return ResponseEntity.ok(productService.toggleActive(id));
    }
}