
// Uses jsPDF (already available via CDN or install: npm install jspdf)

import { jsPDF } from "jspdf";

const fmt = (n) => Number(n || 0).toLocaleString("en-IN");

export function generateInvoicePDF(order) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210; // A4 width
  const margin = 20;
  let y = 0;

  // ── Colors ──
  const maroon = [128, 0, 0];
  const gold = [180, 140, 40];
  const dark = [26, 26, 46];
  const gray = [120, 120, 120];
  const lightGray = [240, 240, 240];
  const white = [255, 255, 255];

  // ── Helper functions ──
  const setColor = (rgb) => doc.setTextColor(...rgb);
  const setFont = (style = "normal", size = 10) => {
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
  };

  // ── HEADER BACKGROUND ──
  doc.setFillColor(...dark);
  doc.rect(0, 0, W, 45, "F");

  // ── Brand Name ──
  setColor(gold);
  setFont("bold", 22);
  doc.text("SRI ABOORVA SILKS", margin, 18);

  setColor([212, 175, 55]);
  setFont("normal", 9);
  doc.text("Premium Silk & Ethnic Wear", margin, 25);

  setColor([180, 180, 180]);
  setFont("normal", 8);
  doc.text("admin@aboorvasilks.com  |  aboorvasilks.vercel.app", margin, 31);

  // ── INVOICE label (top right) ──
  setColor(white);
  setFont("bold", 20);
  doc.text("INVOICE", W - margin, 18, { align: "right" });

  setColor([180, 180, 180]);
  setFont("normal", 9);
  doc.text(`#${order.orderNumber}`, W - margin, 26, { align: "right" });

  const orderDate = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "—";
  doc.text(`Date: ${orderDate}`, W - margin, 33, { align: "right" });

  y = 55;

  // ── INFO SECTION: Billed To + Order Info ──
  // Left: Billed To
  setColor(maroon);
  setFont("bold", 9);
  doc.text("BILLED TO", margin, y);

  y += 6;
  setColor(dark);
  setFont("bold", 11);
  doc.text(order.deliveryName || "Customer", margin, y);

  y += 5;
  setColor(gray);
  setFont("normal", 9);

  const address = [
    order.deliveryAddressLine1,
    order.deliveryAddressLine2,
    `${order.deliveryCity || ""}, ${order.deliveryState || ""} - ${order.deliveryPincode || ""}`,
  ].filter(Boolean);

  address.forEach((line) => {
    if (line.trim()) {
      doc.text(line, margin, y);
      y += 5;
    }
  });

  if (order.deliveryPhone) {
    doc.text(`Phone: ${order.deliveryPhone}`, margin, y);
    y += 5;
  }
  if (order.deliveryEmail) {
    doc.text(`Email: ${order.deliveryEmail}`, margin, y);
    y += 5;
  }

  // Right: Order Details box
  const boxX = W / 2 + 10;
  const boxW = W / 2 - margin - 10;
  const infoStartY = 55;

  doc.setFillColor(...lightGray);
  doc.roundedRect(boxX, infoStartY - 4, boxW, 48, 3, 3, "F");

  setColor(maroon);
  setFont("bold", 9);
  doc.text("ORDER DETAILS", boxX + 8, infoStartY + 2);

  const details = [
    ["Order No.", order.orderNumber],
    ["Date", orderDate],
    ["Payment", order.paymentMethod || "—"],
    ["Pay Status", order.paymentStatus || "—"],
    ["Status", order.status || "—"],
  ];

  let dy = infoStartY + 9;
  details.forEach(([label, value]) => {
    setColor(gray);
    setFont("normal", 8);
    doc.text(label, boxX + 8, dy);
    setColor(dark);
    setFont("bold", 8);
    doc.text(String(value), boxX + boxW - 8, dy, { align: "right" });
    dy += 6;
  });

  y = Math.max(y, infoStartY + 52) + 8;

  // ── DIVIDER ──
  doc.setDrawColor(...maroon);
  doc.setLineWidth(0.5);
  doc.line(margin, y, W - margin, y);
  y += 8;

  // ── ITEMS TABLE HEADER ──
  doc.setFillColor(...dark);
  doc.rect(margin, y, W - margin * 2, 8, "F");

  setColor(white);
  setFont("bold", 8);
  doc.text("#", margin + 3, y + 5.5);
  doc.text("PRODUCT", margin + 10, y + 5.5);
  doc.text("CATEGORY", margin + 90, y + 5.5);
  doc.text("QTY", margin + 125, y + 5.5);
  doc.text("UNIT PRICE", margin + 138, y + 5.5);
  doc.text("SUBTOTAL", W - margin - 3, y + 5.5, { align: "right" });

  y += 8;

  // ── ITEMS ROWS ──
  const items = order.items || [];
  items.forEach((item, idx) => {
    const rowBg = idx % 2 === 0 ? [255, 255, 255] : [250, 248, 245];
    doc.setFillColor(...rowBg);
    doc.rect(margin, y, W - margin * 2, 10, "F");

    setColor(gray);
    setFont("normal", 8);
    doc.text(String(idx + 1), margin + 3, y + 6.5);

    setColor(dark);
    setFont("bold", 9);
    const nameLines = doc.splitTextToSize(item.productName || "—", 75);
    doc.text(nameLines[0], margin + 10, y + 6.5);

    setColor(gray);
    setFont("normal", 8);
    doc.text(item.categoryName || "—", margin + 90, y + 6.5);
    doc.text(String(item.quantity || 1), margin + 128, y + 6.5);
    doc.text(`₹${fmt(item.price)}`, margin + 138, y + 6.5);

    setColor(dark);
    setFont("bold", 9);
    doc.text(`₹${fmt(item.subtotal)}`, W - margin - 3, y + 6.5, { align: "right" });

    y += 10;
  });

  // ── TABLE BOTTOM BORDER ──
  doc.setDrawColor(...lightGray);
  doc.setLineWidth(0.3);
  doc.line(margin, y, W - margin, y);
  y += 8;

  // ── TOTALS ──
  const totalsX = W / 2 + 20;
  const totalsW = W - margin - totalsX;

  const rows = [
    ["Subtotal", `₹${fmt(order.subtotal)}`],
    ["Delivery Charge", Number(order.deliveryCharge || 0) === 0 ? "FREE" : `₹${fmt(order.deliveryCharge)}`],
  ];

  if (Number(order.discount || 0) > 0) {
    rows.push(["Discount", `- ₹${fmt(order.discount)}`]);
  }
  if (Number(order.tax || 0) > 0) {
    rows.push(["Tax / GST", `₹${fmt(order.tax)}`]);
  }

  rows.forEach(([label, value]) => {
    setColor(gray);
    setFont("normal", 9);
    doc.text(label, totalsX, y);
    setColor(dark);
    setFont("normal", 9);
    doc.text(value, W - margin, y, { align: "right" });
    y += 7;
  });

  // Grand total box
  doc.setFillColor(...dark);
  doc.roundedRect(totalsX - 4, y - 2, totalsW + 4 + margin - totalsX + W - margin - totalsX + 4, 11, 2, 2, "F");

  setColor(gold);
  setFont("bold", 10);
  doc.text("GRAND TOTAL", totalsX, y + 6.5);

  setColor([212, 175, 55]);
  setFont("bold", 13);
  doc.text(`₹${fmt(order.grandTotal)}`, W - margin, y + 6.5, { align: "right" });

  y += 18;

  // ── PAYMENT INFO BOX ──
  if (order.paymentMethod === "RAZORPAY" || order.razorpayPaymentId) {
    doc.setFillColor(240, 255, 245);
    doc.setDrawColor(100, 180, 100);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, W - margin * 2, 16, 3, 3, "FD");

    setColor([20, 120, 60]);
    setFont("bold", 9);
    doc.text("✓ Payment Successful via Razorpay", margin + 6, y + 6);
    setColor(gray);
    setFont("normal", 8);
    if (order.razorpayPaymentId) {
      doc.text(`Payment ID: ${order.razorpayPaymentId}`, margin + 6, y + 12);
    }
    y += 22;
  }

  // ── NOTES ──
  if (order.customerNotes) {
    setColor(maroon);
    setFont("bold", 8);
    doc.text("CUSTOMER NOTES:", margin, y);
    y += 5;
    setColor(gray);
    setFont("normal", 8);
    const noteLines = doc.splitTextToSize(order.customerNotes, W - margin * 2);
    doc.text(noteLines, margin, y);
    y += noteLines.length * 5 + 5;
  }

  // ── FOOTER ──
  const footerY = 280;
  doc.setFillColor(...dark);
  doc.rect(0, footerY, W, 17, "F");

  setColor([212, 175, 55]);
  setFont("bold", 9);
  doc.text("Sri Aboorva Silks", margin, footerY + 6);

  setColor([160, 160, 160]);
  setFont("normal", 7.5);
  doc.text("Thank you for shopping with us!", W / 2, footerY + 6, { align: "center" });
  doc.text("aboorvasilks.vercel.app", W - margin, footerY + 6, { align: "right" });

  setColor([120, 120, 120]);
  setFont("normal", 7);
  doc.text("Prices are inclusive of all taxes. This is a computer-generated invoice.", W / 2, footerY + 12, { align: "center" });

  // ── SAVE ──
  doc.save(`Invoice_${order.orderNumber}.pdf`);
}