"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemberstack } from "@memberstack/react";
import { DEFAULT_LOGIN_URL } from "@/app/auth/utils/enums";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginMemberEmailPassword } = useMemberstack();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await loginMemberEmailPassword({ email, password });
      router.replace(DEFAULT_LOGIN_URL);
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
          name="email"
          type="email"
          required
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          required
        />
        <button disabled={loading} type="submit">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p style={{ marginTop: 16 }}>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>.
      </p>
    </div>
  );
}
