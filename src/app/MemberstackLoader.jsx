"use client";

import Script from "next/script";

export default function MemberstackLoader() {
  const publicKey = process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY;

  if (!publicKey) {
    return null;
  }

  return (
    <Script
      id="memberstack-loader"
      src="https://static.memberstack.com/scripts/v2/memberstack.js"
      data-memberstack-id={publicKey}
      strategy="beforeInteractive"
    />
  );
}
