import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MemberstackLoader from "./MemberstackLoader";
import { MemberstackProvider } from "@memberstack/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MemberstackLoader />

        <MemberstackProvider
          config={{
            publicKey: process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY,
          }}
        >
          {children}
        </MemberstackProvider>
      </body>
    </html>
  );
}
