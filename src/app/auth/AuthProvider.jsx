"use client";

import { MemberstackProvider } from "@memberstack/react";
import MemberstackLoader from "../MemberstackLoader";

export default function AuthProvider({ children }) {
  const publicKey = process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY;

  if (!publicKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("Missing environment variable: NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY");
      return <h1>Application Error. Please try again later.</h1>;
    }

    throw new Error("Missing environment variable: NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY");
  }

  return (
    <>
      <MemberstackLoader />
      <MemberstackProvider
        config={{
          publicKey,
        }}
      >
        {children}
      </MemberstackProvider>
    </>
  );
}
