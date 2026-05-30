"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import CheckoutButton from "../../components/CheckoutButton";

export default function LibraryPage() {
  return (
    <ProtectedRoute>
      <div style={{ padding: 24 }}>
        <h1>Your Library</h1>
        <p>Welcome to your protected library. Add items here for members only.</p>
        <div style={{ marginTop: 16 }}>
          <CheckoutButton sku="XXXX">Purchase Access</CheckoutButton>
        </div>
      </div>
    </ProtectedRoute>
  );
}
