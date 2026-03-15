package com.textileshop.backend.service;

import com.textileshop.backend.entity.Order;
import com.textileshop.backend.entity.OrderItem;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
 
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String baseUrl;

    public void sendTestMail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Test Mail - Sri Aboorva Silk House");
        message.setText("This is a test email from Sri Aboorva Silk House.");
        mailSender.send(message);
    }

    public void sendVerificationEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Email Verification - Sri Aboorva Silk House");
        message.setText("Click the link below to verify your email:\n\n" +
                baseUrl + "/verify-email?token=" + token);
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(String to, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset - Sri Aboorva Silk House");
        message.setText("Click the link below to reset your password:\n\n" +
                baseUrl + "/reset-password?token=" + token + "\n\n" +
                "This link will expire in 1 hour.");
        mailSender.send(message);
    }

    // ── Order Status Emails ───────────────────────────────────────────────
 
    @Async
    public void sendOrderStatusEmail(Order order) {
        try {
            String to = order.getDeliveryEmail();
            if (to == null || to.isBlank()) return;
 
            String subject = getSubject(order);
            String html    = buildOrderEmailHtml(order);
 
            MimeMessage mime = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mime, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setFrom("Sri Aboorva Silks <dharani18.nex@gmail.com>");
            helper.setText(html, true);
            mailSender.send(mime);
 
        } catch (MessagingException e) {
            System.err.println("Failed to send order email: " + e.getMessage());
        }
    }
 
    private String getSubject(Order order) {
        return switch (order.getStatus()) {
            case CONFIRMED  -> "Order Confirmed! #" + order.getOrderNumber() + " - Sri Aboorva Silks";
            case PACKED     -> "Your Order is Packed #" + order.getOrderNumber() + " - Sri Aboorva Silks";
            case SHIPPED    -> "Your Order is on the Way! #" + order.getOrderNumber() + " - Sri Aboorva Silks";
            case DELIVERED  -> "Order Delivered! #" + order.getOrderNumber() + " - Sri Aboorva Silks";
            case CANCELLED  -> "Order Cancelled #" + order.getOrderNumber() + " - Sri Aboorva Silks";
            default         -> "Order Update #" + order.getOrderNumber() + " - Sri Aboorva Silks";
        };
    }
    private String buildOrderEmailHtml(Order order) {
        String statusConfig = getStatusConfig(order);
        String[] parts = statusConfig.split("\\|");
        String icon        = parts[0];
        String statusTitle = parts[1];
        String statusMsg   = parts[2];
        String bannerColor = parts[3];
        String accentColor = parts[4];
 
        String fmt = "en-IN";
        String orderDate = order.getCreatedAt() != null
                ? order.getCreatedAt().format(DateTimeFormatter.ofPattern("dd MMM yyyy"))
                : "—";
 
        // Build items rows
        StringBuilder itemsHtml = new StringBuilder();
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                String imgHtml = (item.getProductImage() != null && !item.getProductImage().isBlank())
                        ? "<img src='" + item.getProductImage() + "' width='64' height='80' style='object-fit:cover;border-radius:6px;display:block;' alt='" + item.getProductName() + "'/>"
                        : "<div style='width:64px;height:80px;background:#f0ece4;border-radius:6px;display:flex;align-items:center;justify-content:center;'></div>";
 
                itemsHtml.append("""
                        <tr>
                          <td style="padding:14px 0;border-bottom:1px solid #f0ece4;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                              <tr>
                                <td width="80" valign="top">%s</td>
                                <td valign="top" style="padding-left:14px;">
                                  <p style="margin:0 0 4px;font-family:'Georgia',serif;font-size:15px;font-weight:bold;color:#1a1a2e;">%s</p>
                                  <p style="margin:0 0 4px;font-size:12px;color:#888;">%s</p>
                                  <p style="margin:0;font-size:13px;color:#555;">Qty: %d &nbsp;&middot;&nbsp; &#8377;%s each</p>
                                </td>
                                <td align="right" valign="top" style="font-family:'Georgia',serif;font-size:15px;font-weight:bold;color:#1a1a2e;white-space:nowrap;">
                                  &#8377;%s
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        """.formatted(
                        imgHtml,
                        item.getProductName(),
                        item.getCategoryName() != null ? item.getCategoryName() : "",
                        item.getQuantity(),
                        formatAmount(item.getPrice()),
                        formatAmount(item.getSubtotal())
                ));
            }
        }
 
        // Tracking info
        String trackingHtml = "";
        if (order.getStatus().name().equals("SHIPPED") && order.getTrackingNumber() != null) {
            trackingHtml = """
                    <div style="background:#EFF6FF;border:1px solid #BFDBFE;border-radius:10px;padding:16px;margin:20px 0;">
                      <p style="margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;color:#1D4ED8;">Tracking Information</p>
                      <p style="margin:0;font-size:14px;color:#1a1a2e;">
                        <strong>%s</strong> &nbsp;|&nbsp; %s
                      </p>
                    </div>
                    """.formatted(
                    order.getCourierPartner() != null ? order.getCourierPartner() : "Courier",
                    order.getTrackingNumber()
            );
        }
 
        // Cancellation reason
        String cancelHtml = "";
        if (order.getStatus().name().equals("CANCELLED") && order.getCancellationReason() != null) {
            cancelHtml = """
                    <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:10px;padding:16px;margin:20px 0;">
                      <p style="margin:0 0 6px;font-size:12px;font-weight:bold;letter-spacing:0.1em;text-transform:uppercase;color:#B91C1C;">Reason</p>
                      <p style="margin:0;font-size:14px;color:#1a1a2e;">%s</p>
                    </div>
                    """.formatted(order.getCancellationReason());
        }
 
        // Delivery address
        String address = String.join(", ",
                order.getDeliveryAddressLine1() != null ? order.getDeliveryAddressLine1() : "",
                order.getDeliveryCity() != null ? order.getDeliveryCity() : "",
                order.getDeliveryState() != null ? order.getDeliveryState() : "",
                order.getDeliveryPincode() != null ? String.valueOf(order.getDeliveryPincode()) : ""
        ).replaceAll("^,\\s*|,\\s*$|(?:,\\s*){2,}", ", ").strip();
 
        BigDecimal deliveryCharge = order.getDeliveryCharge() != null ? order.getDeliveryCharge() : BigDecimal.ZERO;
        String deliveryStr = deliveryCharge.compareTo(BigDecimal.ZERO) == 0 ? "FREE" : "&#8377;" + formatAmount(deliveryCharge);
 
        return """
                <!DOCTYPE html>
                <html>
                <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
                <body style="margin:0;padding:0;background:#f4f1eb;font-family:'DM Sans','Segoe UI',sans-serif;">
                  <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:32px 0;">
                    <tr><td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%%;">
 
                        <!-- HEADER -->
                        <tr><td style="background:%s;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
                          <div style="font-size:52px;margin-bottom:12px;">%s</div>
                          <h1 style="margin:0 0 8px;font-family:'Georgia',serif;font-size:28px;color:#FFFFF0;font-weight:bold;">%s</h1>
                          <p style="margin:0;font-size:15px;color:rgba(255,255,240,0.8);">%s</p>
                        </td></tr>
 
                        <!-- BODY -->
                        <tr><td style="background:#ffffff;padding:36px 40px;">
 
                          <!-- Order Info Bar -->
                          <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f9f6f0;border-radius:10px;margin-bottom:28px;">
                            <tr>
                              <td style="padding:16px 20px;border-right:1px solid #e8e2d8;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Order Number</p>
                                <p style="margin:0;font-family:'Georgia',serif;font-size:16px;font-weight:bold;color:%s;">%s</p>
                              </td>
                              <td style="padding:16px 20px;border-right:1px solid #e8e2d8;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Order Date</p>
                                <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">%s</p>
                              </td>
                              <td style="padding:16px 20px;">
                                <p style="margin:0 0 4px;font-size:11px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Payment</p>
                                <p style="margin:0;font-size:14px;font-weight:600;color:#1a1a2e;">%s</p>
                              </td>
                            </tr>
                          </table>
 
                          <!-- Greeting -->
                          <p style="font-size:16px;color:#333;margin:0 0 24px;">
                            Hi <strong>%s</strong>,<br/>
                            %s
                          </p>
 
                          %s
                          %s
 
                          <!-- Items -->
                          <h3 style="font-family:'Georgia',serif;font-size:17px;color:#1a1a2e;margin:0 0 4px;border-bottom:2px solid #1a1a2e;padding-bottom:10px;">Order Items</h3>
                          <table width="100%%" cellpadding="0" cellspacing="0">
                            %s
                          </table>
 
                          <!-- Price Summary -->
                          <table width="100%%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#888;">Subtotal</td>
                              <td align="right" style="padding:6px 0;font-size:13px;color:#555;">&#8377;%s</td>
                            </tr>
                            <tr>
                              <td style="padding:6px 0;font-size:13px;color:#888;">Delivery</td>
                              <td align="right" style="padding:6px 0;font-size:13px;color:#555;">%s</td>
                            </tr>
                            <tr>
                              <td style="padding:12px 0 6px;border-top:2px solid #1a1a2e;font-family:'Georgia',serif;font-size:17px;font-weight:bold;color:#1a1a2e;">Grand Total</td>
                              <td align="right" style="padding:12px 0 6px;border-top:2px solid #1a1a2e;font-family:'Georgia',serif;font-size:20px;font-weight:bold;color:%s;">&#8377;%s</td>
                            </tr>
                          </table>
 
                          <!-- Delivery Address -->
                          <div style="background:#f9f6f0;border-radius:10px;padding:18px 20px;margin:24px 0 0;">
                            <p style="margin:0 0 6px;font-size:11px;font-weight:bold;letter-spacing:0.12em;text-transform:uppercase;color:#888;">Delivering To</p>
                            <p style="margin:0;font-size:14px;font-weight:bold;color:#1a1a2e;">%s</p>
                            <p style="margin:4px 0 0;font-size:13px;color:#666;line-height:1.5;">%s</p>
                            %s
                          </div>
 
                        </td></tr>
 
                        <!-- FOOTER -->
                        <tr><td style="background:#1a1a2e;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
                          <p style="margin:0 0 6px;font-family:'Georgia',serif;font-size:18px;font-weight:bold;color:#D4AF37;">Sri Aboorva Silks</p>
                          <p style="margin:0 0 12px;font-size:12px;color:rgba(255,255,240,0.5);">Premium Silk &amp; Ethnic Wear</p>
                          <a href="%s" style="display:inline-block;padding:10px 24px;background:#800000;color:#FFFFF0;text-decoration:none;border-radius:8px;font-size:13px;font-weight:bold;margin-bottom:16px;">View My Orders</a>
                          <p style="margin:12px 0 0;font-size:11px;color:rgba(255,255,240,0.3);">
                            You received this email because you placed an order on Sri Aboorva Silks.<br/>
                            &copy; 2026 Sri Aboorva Silks. All rights reserved.
                          </p>
                        </td></tr>
 
                      </table>
                    </td></tr>
                  </table>
                </body>
                </html>
                """.formatted(
                // Header
                bannerColor, icon, statusTitle, statusMsg,
                // Order info bar
                accentColor, order.getOrderNumber(),
                orderDate,
                order.getPaymentMethod() != null ? order.getPaymentMethod().name() : "—",
                // Greeting
                order.getDeliveryName() != null ? order.getDeliveryName() : "Customer",
                getGreetingText(order),
                // Tracking / cancel
                trackingHtml, cancelHtml,
                // Items
                itemsHtml.toString(),
                // Price summary
                formatAmount(order.getSubtotal()),
                deliveryStr,
                accentColor, formatAmount(order.getGrandTotal()),
                // Delivery address
                order.getDeliveryName() != null ? order.getDeliveryName() : "",
                address,
                order.getDeliveryPhone() != null ? "<p style='margin:4px 0 0;font-size:13px;color:#666;'>Ph: " + order.getDeliveryPhone() + "</p>" : "",
                // Footer
                baseUrl + "/orders"
        );
    }
 
    private String getStatusConfig(Order order) {
        return switch (order.getStatus()) {
            case CONFIRMED -> "✅|Order Confirmed!|We've received your order and it's being prepared.|#15803D|#15803D";
            case PACKED    -> "📦|Order Packed!|Your order has been carefully packed and is ready for pickup.|#1D4ED8|#1D4ED8";
            case SHIPPED   -> "🚚|Order Shipped!|Your order is on its way to you!|#7C3AED|#7C3AED";
            case DELIVERED -> "🎉|Order Delivered!|Your order has been delivered. Enjoy your purchase!|#D4AF37|#92400E";
            case CANCELLED -> "❌|Order Cancelled|Your order has been cancelled.|#B91C1C|#B91C1C";
            default        -> "📋|Order Update|Your order status has been updated.|#1a1a2e|#800000";
        };
    }
 
    private String getGreetingText(Order order) {
        return switch (order.getStatus()) {
            case CONFIRMED -> "Great news! Your order has been <strong>confirmed</strong> and our team is preparing it with care.";
            case PACKED    -> "Your order has been <strong>carefully packed</strong> and is ready to be handed over to the courier.";
            case SHIPPED   -> "Your order is <strong>on its way</strong>! You can track it using the details below.";
            case DELIVERED -> "Your order has been <strong>successfully delivered</strong>. We hope you love your new purchase!";
            case CANCELLED -> "We're sorry to inform you that your order has been <strong>cancelled</strong>.";
            default        -> "Your order status has been updated.";
        };
    }
 
    private String formatAmount(BigDecimal amount) {
        if (amount == null) return "0";
        return String.format("%,.2f", amount);
    }
}