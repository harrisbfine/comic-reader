"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getMemberstack } from "../../lib/memberstack";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const ms = getMemberstack();
    if (!ms || typeof ms.logout !== "function") {
      router.replace("/login");
      return;
    }

    ms
      .logout()
      .catch(() => {})
      .finally(() => {
        router.replace("/login");
      });
  }, [router]);

  return (
    <div style={{ padding: 24 }}>
      <p>Logging out…</p>
    </div>
  );
}
