import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/context/RoleContext";
import { ToastProvider } from "@/components/Toast";
import { DemoStateProvider } from "@/context/DemoStateContext";
import { PresentationProvider } from "@/context/PresentationContext";
import RoleSwitcher from "@/components/RoleSwitcher";
import Navigation from "@/components/Navigation";
import PresentationOverlay from "@/components/presentation/PresentationOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Capacious - Journal Management",
  description: "Journal management mockup",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <RoleProvider>
          <ToastProvider>
            <DemoStateProvider>
              <PresentationProvider>
                <RoleSwitcher />
                <Navigation />
                <PresentationOverlay />
                <main className="pt-16">{children}</main>
              </PresentationProvider>
            </DemoStateProvider>
          </ToastProvider>
        </RoleProvider>
      </body>
    </html>
  );
}
