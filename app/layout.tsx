"use client";

import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import CyberspaceCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import SkippyAssistant from "@/components/main/SkippyAssistant";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-cyber" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [skippyEnabled, setSkippyEnabled] = useState(true);

  return (
    <html lang="en">
      <body className={`${inter.className} ${orbitron.variable} bg-black overflow-y-scroll overflow-x-hidden`}>
        <CyberspaceCanvas />
        <Navbar onSkippyToggle={setSkippyEnabled} />
        {children}
        <Footer />
        <SkippyAssistant enabled={skippyEnabled} />
      </body>
    </html>
  );
}
