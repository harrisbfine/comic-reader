"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

function getMS() {
  return typeof window !== "undefined" ? window.ms : null;
}

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const ms = getMS();
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
