package com.textileshop.backend.controller;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.security.Principal;
import java.util.HexFormat;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class RazorpayController {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;

    @Value("${razorpay.key.secret}")
    private String razorpayKeySecret;

    /**
     * Step 1: Create a Razorpay order before showing the payment popup
     * Frontend calls this → gets razorpay order_id → opens Razorpay popup
     */
    @PostMapping("/create-order")
    @PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Object>> createOrder(
            @RequestBody Map<String, Object> body,
            Principal principal) {

        try {
            // Amount in paise (multiply by 100)
            Object amountObj = body.get("amount");
            BigDecimal amount = new BigDecimal(amountObj.toString());
            long amountInPaise = amount.multiply(BigDecimal.valueOf(100)).longValue();

            RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", amountInPaise);
            orderRequest.put("currency", "INR");
            orderRequest.put("receipt", "order_" + System.currentTimeMillis());
            orderRequest.put("payment_capture", 1);

            Order razorpayOrder = client.orders.create(orderRequest);

            return ResponseEntity.ok(Map.of(
                    "orderId", razorpayOrder.get("id"),
                    "amount", amountInPaise,
                    "currency", "INR",
                    "keyId", razorpayKeyId
            ));

        } catch (RazorpayException e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Failed to create Razorpay order: " + e.getMessage()));
        }
    }

    /**
     * Step 2: Verify payment signature after successful payment
     * Called by frontend after Razorpay popup succeeds
     */
    @PostMapping("/verify")
    @PreAuthorize("hasAuthority('CUSTOMER') or hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, Object>> verifyPayment(
            @RequestBody Map<String, String> body) {

        try {
            String razorpayOrderId   = body.get("razorpayOrderId");
            String razorpayPaymentId = body.get("razorpayPaymentId");
            String razorpaySignature = body.get("razorpaySignature");

            // Verify signature
            String data = razorpayOrderId + "|" + razorpayPaymentId;
            String expectedSignature = hmacSHA256(data, razorpayKeySecret);

            if (expectedSignature.equals(razorpaySignature)) {
                return ResponseEntity.ok(Map.of(
                        "verified", true,
                        "paymentId", razorpayPaymentId
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                        "verified", false,
                        "error", "Payment signature mismatch"
                ));
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("verified", false, "error", e.getMessage()));
        }
    }

    private String hmacSHA256(String data, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] hash = mac.doFinal(data.getBytes());
        return HexFormat.of().formatHex(hash);
    }
}