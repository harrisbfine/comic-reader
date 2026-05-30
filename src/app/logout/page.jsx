"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { waitForMemberstack } from "../../lib/memberstack";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function logout() {
      let ms;
      try {
        ms = await waitForMemberstack();
      } catch (err) {
        if (mounted) router.replace("/login");
        return;
      }

      if (ms && typeof ms.logout === "function") {
        ms
          .logout()
          .catch(() => {})
          .finally(() => {
            if (mounted) router.replace("/login");
          });
      } else {
        if (mounted) router.replace("/login");
      }
    }

    logout();

    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <div style={{ padding: 24 }}>
      <p>Logging out…</p>
    </div>
  );
}
