"use client";

import ProtectedRoute from "../../../components/ProtectedRoute";
import { useParams } from "next/navigation";

export default function ReaderPage() {
  const params = useParams();
  const id = params?.id || "unknown";

  return (
    <ProtectedRoute>
      <div style={{ padding: 24 }}>
        <h1>Reader</h1>
        <p>Comic ID: {id}</p>
        <div style={{ marginTop: 16, border: "1px solid #ddd", padding: 12 }}>
          <p>Placeholder content for comic / reader. Images will be added later.</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}
