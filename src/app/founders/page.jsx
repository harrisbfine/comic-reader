"use client";

import ProtectedRoute from "../../components/ProtectedRoute";

export default function FoundersPage() {
  return (
    <ProtectedRoute>
      <div style={{ padding: 24 }}>
        <h1>Founders</h1>
        <p>Exclusive founders content — members only.</p>
      </div>
    </ProtectedRoute>
  );
}
