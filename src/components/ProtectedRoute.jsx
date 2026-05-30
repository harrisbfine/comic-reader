"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function getMemberstack() {
  if (typeof window === "undefined") return null;
  return window.ms || null;
}

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    let intervalId = null;
    let timeoutId = null;

    const redirectToLogin = () => {
      if (!mounted) return;
      router.replace("/login");
    };

    const checkMember = () => {
      const ms = getMemberstack();
      if (!ms || typeof ms.getCurrentMember !== "function") {
        return;
      }

      clearInterval(intervalId);
      clearTimeout(timeoutId);

      ms
        .getCurrentMember()
        .then((member) => {
          if (!mounted) return;
          if (!member) {
            redirectToLogin();
          } else {
            setChecking(false);
          }
        })
        .catch(() => {
          if (!mounted) return;
          redirectToLogin();
        });
    };

    intervalId = setInterval(checkMember, 100);
    timeoutId = setTimeout(redirectToLogin, 5000);
    checkMember();

    return () => {
      mounted = false;
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [router]);

  if (checking) {
    return (
      <div style={{ padding: 24 }}>
        <p>Checking membership…</p>
      </div>
    );
  }

  return <>{children}</>;
}
