"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function getMS() {
  return typeof window !== "undefined" ? window.ms : null;
}

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const ms = getMS();
    if (!ms || typeof ms.signup !== "function") {
      setError("Memberstack not available");
      setLoading(false);
      return;
    }

    try {
      await ms.signup({ email, password });
      router.push("/library");
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <button disabled={loading} type="submit">
          {loading ? "Creating…" : "Create account"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
