
// // Uses jsPDF (already available via CDN or install: npm install jspdf)

// import { jsPDF } from "jspdf";

// const fmt = (n) => Number(n || 0).toLocaleString("en-IN");

// export function generateInvoicePDF(order) {
//   const doc = new jsPDF({ unit: "mm", format: "a4" });
//   const W = 210; // A4 width
//   const margin = 20;
//   let y = 0;

//   // ── Colors ──
//   const maroon = [128, 0, 0];
//   const gold = [180, 140, 40];
//   const dark = [26, 26, 46];
//   const gray = [120, 120, 120];
//   const lightGray = [240, 240, 240];
//   const white = [255, 255, 255];

//   // ── Helper functions ──
//   const setColor = (rgb) => doc.setTextColor(...rgb);
//   const setFont = (style = "normal", size = 10) => {
//     doc.setFontSize(size);
//     doc.setFont("helvetica", style);
//   };

//   // ── HEADER BACKGROUND ──
//   doc.setFillColor(...dark);
//   doc.rect(0, 0, W, 45, "F");

//   // ── Brand Name ──
//   setColor(gold);
//   setFont("bold", 22);
//   doc.text("SRI ABOORVA SILKS", margin, 18);

//   setColor([212, 175, 55]);
//   setFont("normal", 9);
//   doc.text("Premium Silk & Ethnic Wear", margin, 25);

//   setColor([180, 180, 180]);
//   setFont("normal", 8);
//   doc.text("admin@aboorvasilks.com  |  aboorvasilks.vercel.app", margin, 31);

//   // ── INVOICE label (top right) ──
//   setColor(white);
//   setFont("bold", 20);
//   doc.text("INVOICE", W - margin, 18, { align: "right" });

//   setColor([180, 180, 180]);
//   setFont("normal", 9);
//   doc.text(`#${order.orderNumber}`, W - margin, 26, { align: "right" });

//   const orderDate = order.createdAt
//     ? new Date(order.createdAt).toLocaleDateString("en-IN", {
//         day: "numeric", month: "long", year: "numeric",
//       })
//     : "—";
//   doc.text(`Date: ${orderDate}`, W - margin, 33, { align: "right" });

//   y = 55;

//   // ── INFO SECTION: Billed To + Order Info ──
//   // Left: Billed To
//   setColor(maroon);
//   setFont("bold", 9);
//   doc.text("BILLED TO", margin, y);

//   y += 6;
//   setColor(dark);
//   setFont("bold", 11);
//   doc.text(order.deliveryName || "Customer", margin, y);

//   y += 5;
//   setColor(gray);
//   setFont("normal", 9);

//   const address = [
//     order.deliveryAddressLine1,
//     order.deliveryAddressLine2,
//     `${order.deliveryCity || ""}, ${order.deliveryState || ""} - ${order.deliveryPincode || ""}`,
//   ].filter(Boolean);

//   address.forEach((line) => {
//     if (line.trim()) {
//       doc.text(line, margin, y);
//       y += 5;
//     }
//   });

//   if (order.deliveryPhone) {
//     doc.text(`Phone: ${order.deliveryPhone}`, margin, y);
//     y += 5;
//   }
//   if (order.deliveryEmail) {
//     doc.text(`Email: ${order.deliveryEmail}`, margin, y);
//     y += 5;
//   }

//   // Right: Order Details box
//   const boxX = W / 2 + 10;
//   const boxW = W / 2 - margin - 10;
//   const infoStartY = 55;

//   doc.setFillColor(...lightGray);
//   doc.roundedRect(boxX, infoStartY - 4, boxW, 48, 3, 3, "F");

//   setColor(maroon);
//   setFont("bold", 9);
//   doc.text("ORDER DETAILS", boxX + 8, infoStartY + 2);

//   const details = [
//     ["Order No.", order.orderNumber],
//     ["Date", orderDate],
//     ["Payment", order.paymentMethod || "—"],
//     ["Pay Status", order.paymentStatus || "—"],
//     ["Status", order.status || "—"],
//   ];

//   let dy = infoStartY + 9;
//   details.forEach(([label, value]) => {
//     setColor(gray);
//     setFont("normal", 8);
//     doc.text(label, boxX + 8, dy);
//     setColor(dark);
//     setFont("bold", 8);
//     doc.text(String(value), boxX + boxW - 8, dy, { align: "right" });
//     dy += 6;
//   });

//   y = Math.max(y, infoStartY + 52) + 8;

//   // ── DIVIDER ──
//   doc.setDrawColor(...maroon);
//   doc.setLineWidth(0.5);
//   doc.line(margin, y, W - margin, y);
//   y += 8;

//   // ── ITEMS TABLE HEADER ──
//   doc.setFillColor(...dark);
//   doc.rect(margin, y, W - margin * 2, 8, "F");

//   setColor(white);
//   setFont("bold", 8);
//   doc.text("#", margin + 3, y + 5.5);
//   doc.text("PRODUCT", margin + 10, y + 5.5);
//   doc.text("CATEGORY", margin + 90, y + 5.5);
//   doc.text("QTY", margin + 125, y + 5.5);
//   doc.text("UNIT PRICE", margin + 138, y + 5.5);
//   doc.text("SUBTOTAL", W - margin - 3, y + 5.5, { align: "right" });

//   y += 8;

//   // ── ITEMS ROWS ──
//   const items = order.items || [];
//   items.forEach((item, idx) => {
//     const rowBg = idx % 2 === 0 ? [255, 255, 255] : [250, 248, 245];
//     doc.setFillColor(...rowBg);
//     doc.rect(margin, y, W - margin * 2, 10, "F");

//     setColor(gray);
//     setFont("normal", 8);
//     doc.text(String(idx + 1), margin + 3, y + 6.5);

//     setColor(dark);
//     setFont("bold", 9);
//     const nameLines = doc.splitTextToSize(item.productName || "—", 75);
//     doc.text(nameLines[0], margin + 10, y + 6.5);

//     setColor(gray);
//     setFont("normal", 8);
//     doc.text(item.categoryName || "—", margin + 90, y + 6.5);
//     doc.text(String(item.quantity || 1), margin + 128, y + 6.5);
//     doc.text(`₹${fmt(item.price)}`, margin + 138, y + 6.5);

//     setColor(dark);
//     setFont("bold", 9);
//     doc.text(`₹${fmt(item.subtotal)}`, W - margin - 3, y + 6.5, { align: "right" });

//     y += 10;
//   });

//   // ── TABLE BOTTOM BORDER ──
//   doc.setDrawColor(...lightGray);
//   doc.setLineWidth(0.3);
//   doc.line(margin, y, W - margin, y);
//   y += 8;

//   // ── TOTALS ──
//   const totalsX = W / 2 + 20;
//   const totalsW = W - margin - totalsX;

//   const rows = [
//     ["Subtotal", `₹${fmt(order.subtotal)}`],
//     ["Delivery Charge", Number(order.deliveryCharge || 0) === 0 ? "FREE" : `₹${fmt(order.deliveryCharge)}`],
//   ];

//   if (Number(order.discount || 0) > 0) {
//     rows.push(["Discount", `- ₹${fmt(order.discount)}`]);
//   }
//   if (Number(order.tax || 0) > 0) {
//     rows.push(["Tax / GST", `₹${fmt(order.tax)}`]);
//   }

//   rows.forEach(([label, value]) => {
//     setColor(gray);
//     setFont("normal", 9);
//     doc.text(label, totalsX, y);
//     setColor(dark);
//     setFont("normal", 9);
//     doc.text(value, W - margin, y, { align: "right" });
//     y += 7;
//   });

//   // Grand total box
//   doc.setFillColor(...dark);
//   doc.roundedRect(totalsX - 4, y - 2, totalsW + 4 + margin - totalsX + W - margin - totalsX + 4, 11, 2, 2, "F");

//   setColor(gold);
//   setFont("bold", 10);
//   doc.text("GRAND TOTAL", totalsX, y + 6.5);

//   setColor([212, 175, 55]);
//   setFont("bold", 13);
//   doc.text(`₹${fmt(order.grandTotal)}`, W - margin, y + 6.5, { align: "right" });

//   y += 18;

//   // ── PAYMENT INFO BOX ──
//   if (order.paymentMethod === "RAZORPAY" || order.razorpayPaymentId) {
//     doc.setFillColor(240, 255, 245);
//     doc.setDrawColor(100, 180, 100);
//     doc.setLineWidth(0.3);
//     doc.roundedRect(margin, y, W - margin * 2, 16, 3, 3, "FD");

//     setColor([20, 120, 60]);
//     setFont("bold", 9);
//     doc.text("✓ Payment Successful via Razorpay", margin + 6, y + 6);
//     setColor(gray);
//     setFont("normal", 8);
//     if (order.razorpayPaymentId) {
//       doc.text(`Payment ID: ${order.razorpayPaymentId}`, margin + 6, y + 12);
//     }
//     y += 22;
//   }

//   // ── NOTES ──
//   if (order.customerNotes) {
//     setColor(maroon);
//     setFont("bold", 8);
//     doc.text("CUSTOMER NOTES:", margin, y);
//     y += 5;
//     setColor(gray);
//     setFont("normal", 8);
//     const noteLines = doc.splitTextToSize(order.customerNotes, W - margin * 2);
//     doc.text(noteLines, margin, y);
//     y += noteLines.length * 5 + 5;
//   }

//   // ── FOOTER ──
//   const footerY = 280;
//   doc.setFillColor(...dark);
//   doc.rect(0, footerY, W, 17, "F");

//   setColor([212, 175, 55]);
//   setFont("bold", 9);
//   doc.text("Sri Aboorva Silks", margin, footerY + 6);

//   setColor([160, 160, 160]);
//   setFont("normal", 7.5);
//   doc.text("Thank you for shopping with us!", W / 2, footerY + 6, { align: "center" });
//   doc.text("aboorvasilks.vercel.app", W - margin, footerY + 6, { align: "right" });

//   setColor([120, 120, 120]);
//   setFont("normal", 7);
//   doc.text("Prices are inclusive of all taxes. This is a computer-generated invoice.", W / 2, footerY + 12, { align: "center" });

//   // ── SAVE ──
//   doc.save(`Invoice_${order.orderNumber}.pdf`);
// }



// generateInvoice.js
// Place this file in: frontend/src/utils/generateInvoice.js
// Requires: npm install jspdf

import { jsPDF } from "jspdf";

const fmt = (n) => "Rs." + Number(n || 0).toLocaleString("en-IN");

export function generateInvoicePDF(order) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const M = 18;
  let y = 0;

  const rgb = (...c) => doc.setTextColor(...c);
  const fill = (...c) => doc.setFillColor(...c);
  const draw = (...c) => doc.setDrawColor(...c);
  const lw = (w) => doc.setLineWidth(w);
  const font = (style, size) => { doc.setFont("helvetica", style); doc.setFontSize(size); };
  const text = (t, x, yy, opts) => doc.text(String(t ?? ""), x, yy, opts);

  // HEADER
  fill(22, 22, 40); doc.rect(0, 0, W, 50, "F");
  fill(180, 140, 40); doc.rect(0, 0, 4, 50, "F");

  rgb(212, 175, 55); font("bold", 24); text("SRI ABOORVA SILKS", M + 4, 18);
  rgb(180, 160, 100); font("normal", 9); text("PREMIUM SILK & ETHNIC WEAR", M + 4, 25);
  rgb(140, 140, 160); font("normal", 8); text("aboorvasilks.vercel.app", M + 4, 32);
  draw(212, 175, 55); lw(0.3); doc.line(M + 4, 36, W - M, 36);

  rgb(255, 255, 240); font("bold", 28); text("INVOICE", W - M, 20, { align: "right" });
  rgb(212, 175, 55); font("bold", 11); text(order.orderNumber || "—", W - M, 29, { align: "right" });

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  // Push the date slightly lower so it doesn't overlap the header divider line
  rgb(160, 160, 180); font("normal", 8); text(orderDate, W - M, 40, { align: "right" });

  y = 58;
  const col1 = M, col2 = W / 2 + 5, colW = W / 2 - M - 5;

  // BILLED TO box
  fill(245, 242, 236); doc.roundedRect(col1, y, colW, 52, 3, 3, "F");
  draw(200, 190, 170); lw(0.3); doc.roundedRect(col1, y, colW, 52, 3, 3, "S");
  fill(22, 22, 40); doc.roundedRect(col1, y, colW, 9, 3, 3, "F"); doc.rect(col1, y + 4, colW, 5, "F");
  rgb(212, 175, 55); font("bold", 7.5); text("BILLED TO", col1 + 6, y + 6.5);
  // Add a bit more breathing room between the label and the customer name
  y += 16;

  const custName = order.deliveryName || order.customerName || order.userName || "Customer";
  rgb(22, 22, 40); font("bold", 12); text(custName, col1 + 6, y); y += 6;

  rgb(80, 80, 100); font("normal", 8.5);
  const addrLine1 = order.deliveryAddressLine1 || order.address?.addressLine1 || "";
  const addrLine2 = order.deliveryAddressLine2 || order.address?.addressLine2 || "";
  const city = order.deliveryCity || order.address?.city || "";
  const state = order.deliveryState || order.address?.state || "";
  const pincode = order.deliveryPincode || order.address?.pincode || "";
  const phone = order.deliveryPhone || order.address?.phone || "";
  const email = order.deliveryEmail || order.address?.email || "";

  if (addrLine1) { text(addrLine1, col1 + 6, y); y += 5; }
  if (addrLine2) { text(addrLine2, col1 + 6, y); y += 5; }
  if (city || state) { text(`${city}${city && state ? ", " : ""}${state}${pincode ? " - " + pincode : ""}`, col1 + 6, y); y += 5; }
  if (phone) { text(`Ph: ${phone}`, col1 + 6, y); y += 5; }
  if (email) { text(email, col1 + 6, y); y += 5; }

  // ORDER DETAILS box
  y = 58;
  fill(22, 22, 40); doc.roundedRect(col2, y, colW, 52, 3, 3, "F");
  rgb(212, 175, 55); font("bold", 7.5); text("ORDER DETAILS", col2 + 6, y + 6.5);

  const details = [
    ["Order Number", order.orderNumber || "—"],
    ["Order Date", orderDate],
    ["Payment Method", order.paymentMethod || "—"],
    ["Payment Status", order.paymentStatus || "—"],
    ["Order Status", order.status || "—"],
  ];
  let dy = y + 14;
  details.forEach(([label, value]) => {
    rgb(140, 140, 160); font("normal", 8); text(label, col2 + 6, dy);
    rgb(255, 255, 240); font("bold", 8); text(value, col2 + colW - 6, dy, { align: "right" });
    draw(40, 40, 60); lw(0.2); doc.line(col2 + 6, dy + 2, col2 + colW - 6, dy + 2);
    dy += 8;
  });

  y = 120;

  // ITEMS TABLE HEADER
  fill(22, 22, 40); doc.rect(M, y, W - M * 2, 9, "F");
  rgb(212, 175, 55); font("bold", 8);
  text("#", M + 3, y + 6);
  text("PRODUCT", M + 12, y + 6);
  text("CATEGORY", M + 95, y + 6);
  text("QTY", M + 128, y + 6);
  text("UNIT PRICE", M + 142, y + 6);
  text("SUBTOTAL", W - M - 2, y + 6, { align: "right" });
  y += 9;

  const items = order.items || [];
  items.forEach((item, idx) => {
    const rowH = 10;
    idx % 2 === 0 ? fill(255, 255, 255) : fill(250, 247, 242);
    doc.rect(M, y, W - M * 2, rowH, "F");

    rgb(150, 150, 150); font("normal", 8); text(String(idx + 1), M + 3, y + 6.5);
    rgb(22, 22, 40); font("bold", 8.5);
    const nameLines = doc.splitTextToSize(item.productName || "—", 78);
    text(nameLines[0], M + 12, y + 6.5);
    rgb(100, 100, 120); font("normal", 8);
    text(item.categoryName || "—", M + 95, y + 6.5);
    text(String(item.quantity || 1), M + 130, y + 6.5);
    text(fmt(item.price), M + 142, y + 6.5);
    rgb(22, 22, 40); font("bold", 9); text(fmt(item.subtotal), W - M - 2, y + 6.5, { align: "right" });
    draw(235, 230, 220); lw(0.2); doc.line(M, y + rowH, W - M, y + rowH);
    y += rowH;
  });

  y += 6;

  // TOTALS
  const totX = W / 2 + 20;
  const totRows = [
    ["Subtotal", fmt(order.subtotal)],
    ["Delivery", Number(order.deliveryCharge || 0) === 0 ? "FREE" : fmt(order.deliveryCharge)],
  ];
  if (Number(order.discount || 0) > 0) totRows.push(["Discount", "- " + fmt(order.discount)]);
  if (Number(order.tax || 0) > 0) totRows.push(["Tax / GST", fmt(order.tax)]);

  totRows.forEach(([label, value]) => {
    rgb(100, 100, 120); font("normal", 9); text(label, totX, y);
    rgb(22, 22, 40); font("normal", 9); text(value, W - M, y, { align: "right" });
    draw(220, 215, 205); lw(0.2); doc.line(totX, y + 2, W - M, y + 2);
    y += 8;
  });

  y += 2;
  fill(22, 22, 40); doc.roundedRect(totX - 4, y - 2, W - M - totX + 8, 13, 3, 3, "F");
  fill(212, 175, 55); doc.roundedRect(totX - 4, y - 2, 4, 13, 2, 2, "F");
  rgb(180, 180, 200); font("bold", 9); text("GRAND TOTAL", totX + 4, y + 7);
  rgb(212, 175, 55); font("bold", 14); text(fmt(order.grandTotal), W - M, y + 7.5, { align: "right" });
  y += 20;

  // PAYMENT STATUS
  const isPaid = order.paymentStatus === "COMPLETED" || order.paymentStatus === "VERIFIED" || order.paymentMethod === "RAZORPAY";
  if (isPaid) {
    fill(235, 255, 242); draw(100, 200, 130); lw(0.4);
    doc.roundedRect(M, y, W - M * 2, 14, 3, 3, "FD");
    fill(34, 160, 80); doc.circle(M + 8, y + 7, 4, "F");
    rgb(255, 255, 255); font("bold", 9); text("v", M + 8, y + 9.5, { align: "center" });
    rgb(20, 100, 50); font("bold", 10); text("Payment Confirmed", M + 16, y + 6.5);
    rgb(80, 130, 100); font("normal", 8);
    text(`${order.paymentMethod || "Razorpay"} - ${order.paymentStatus || "COMPLETED"}`, M + 16, y + 11.5);
    if (order.razorpayPaymentId) {
      rgb(100, 140, 110); font("normal", 7.5);
      text(`Payment ID: ${order.razorpayPaymentId}`, W - M, y + 9, { align: "right" });
    }
    y += 20;
  } else if (order.paymentMethod === "COD") {
    fill(255, 248, 235); draw(200, 150, 50); lw(0.4);
    doc.roundedRect(M, y, W - M * 2, 14, 3, 3, "FD");
    rgb(160, 100, 20); font("bold", 9);
    text("Cash on Delivery - Pay when order arrives", M + 8, y + 9);
    y += 20;
  }

  // NOTES
  if (order.customerNotes) {
    fill(250, 248, 242); draw(200, 190, 170); lw(0.3);
    doc.roundedRect(M, y, W - M * 2, 18, 3, 3, "FD");
    rgb(128, 0, 0); font("bold", 7.5); text("CUSTOMER NOTES", M + 6, y + 6);
    rgb(60, 60, 80); font("normal", 8.5);
    const noteLines = doc.splitTextToSize(order.customerNotes, W - M * 2 - 12);
    text(noteLines, M + 6, y + 12);
    y += 24;
  }

  // FOOTER
  const footY = 272;
  draw(128, 0, 0); lw(0.5); doc.line(M, footY - 4, W - M, footY - 4);
  fill(22, 22, 40); doc.rect(0, footY, W, 25, "F");
  fill(180, 140, 40); doc.rect(0, footY, 4, 25, "F");

  rgb(212, 175, 55); font("bold", 10); text("Sri Aboorva Silks", M + 4, footY + 8);
  rgb(160, 160, 180); font("normal", 7.5);
  text("aboorvasilks.vercel.app", M + 4, footY + 19);

  rgb(200, 200, 220); font("bold", 8); text("Thank you for your purchase!", W / 2, footY + 10, { align: "center" });
  rgb(140, 140, 160); font("normal", 7);
  text("This is a computer-generated invoice. No signature required.", W / 2, footY + 16, { align: "center" });
  text("Prices are inclusive of all applicable taxes.", W / 2, footY + 21, { align: "center" });

  rgb(100, 100, 120); font("normal", 7.5);
  text(`Invoice: ${order.orderNumber || "—"}`, W - M, footY + 10, { align: "right" });
  text(`Generated: ${new Date().toLocaleDateString("en-IN")}`, W - M, footY + 16, { align: "right" });

  doc.save(`Invoice_${order.orderNumber || "order"}.pdf`);
}