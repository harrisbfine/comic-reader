"use client";

import { useEffect } from "react";
import { useActionState } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupUserAction } from "@/app/signup/actions";
import { DEFAULT_LOGIN_URL } from "@/app/auth/utils/enums";

export default function SignupPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(signupUserAction, {
    errorMessage: "",
    success: false,
  });

  useEffect(() => {
    if (state?.success) {
      router.replace(DEFAULT_LOGIN_URL);
    }
  }, [state?.success, router]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Sign up</h1>
      <form action={formAction} method="post" style={{ display: "grid", gap: 8 }}>
        <input
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          minLength={8}
          required
        />
        <button disabled={pending} type="submit">
          {pending ? "Signing up…" : "Create account"}
        </button>
        {state?.errorMessage && <p style={{ color: "red" }}>{state.errorMessage}</p>}
      </form>
      <p style={{ marginTop: 16 }}>
        Already have an account? <Link href="/login">Log in</Link>.
      </p>
    </div>
  );
}
