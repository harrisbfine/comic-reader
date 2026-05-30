"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { waitForMemberstack } from "../../lib/memberstack";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [msReady, setMsReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    waitForMemberstack(10000)
      .then(() => {
        if (mounted) setMsReady(true);
      })
      .catch(() => {
        if (mounted) setMsReady(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let ms;
    try {
      ms = await waitForMemberstack();
    } catch (err) {
      setError("Memberstack not available");
      setLoading(false);
      return;
    }

    try {
      await ms.login({ email, password });
      router.push("/library");
    } catch (err) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Login</h1>
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
            <button disabled={loading || !msReady} type="submit">
              {loading ? "Signing in…" : msReady ? "Sign in" : "Waiting for Memberstack…"}
            </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
