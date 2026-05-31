"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msReady, setMsReady] = useState(false);

  useEffect(() => {
    function checkMemberstack() {
      if (typeof window !== "undefined" && window.Memberstack && typeof window.Memberstack.signup === "function") {
        setMsReady(true);
      }
    }

    checkMemberstack();

    const interval = setInterval(checkMemberstack, 100);

    return () => clearInterval(interval);
  }, []);

  async function handleSignup(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (!msReady || !window.Memberstack) {
      setError("Memberstack is not loaded yet. Please try again in a moment.");
      setLoading(false);
      return;
    }

    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    try {
      await window.Memberstack.signup({ email, password });
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
        <button disabled={loading || !msReady} type="submit">
          {!msReady ? "Waiting for Memberstack…" : loading ? "Signing up…" : "Create account"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <Link href="/login">Log in</Link>.
      </p>
    </div>
  );
}
