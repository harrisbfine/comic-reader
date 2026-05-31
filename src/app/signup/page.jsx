"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    try {
      const ms = window.Memberstack;
      if (!ms || typeof ms.signup !== "function") {
        throw new Error("Memberstack is not loaded yet.");
      }

      await ms.signup({ email, password });
      router.replace("/login");
    } catch (err) {
      setError(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Sign up</h1>
      <form onSubmit={handleSignup} style={{ display: "grid", gap: 8 }}>
        <input name="email" placeholder="Email" type="email" required />
        <input
          name="password"
          placeholder="Password"
          type="password"
          minLength={8}
          required
        />
        <button disabled={loading} type="submit">
          {loading ? "Signing up…" : "Create account"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <Link href="/login">Log in</Link>.
      </p>
    </div>
  );
}
