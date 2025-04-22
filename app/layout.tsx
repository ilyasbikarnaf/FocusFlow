import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Focus Flow",
  description: "Monitor your daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ClerkProvider>
        <body>
          <Toaster position="top-right" reverseOrder={false} />
          {children}
        </body>
        <Analytics />
      </ClerkProvider>
    </html>
  );
}
