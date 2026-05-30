"use client";

export default function CheckoutButton({ sku = "XXXX", children }) {
  const url = `https://your-checkout-url.lemonsqueezy.com/buy/${sku}`;

  return (
    <button
      onClick={() => (window.location.href = url)}
      style={{ padding: "8px 12px", borderRadius: 6, cursor: "pointer" }}
    >
      {children || "Buy"}
    </button>
  );
}
