"use client"

import React from "react";
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import localFont from "next/font/local";
import "./globals.scss";
import Container from "@/ui/Container/Container";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <TonConnectUIProvider manifestUrl="http://localhost:3000/tonconnect-manifest.json">
      <Container>
        {children}
      </Container>
        </TonConnectUIProvider>
      </body>
    </html>
  );
}