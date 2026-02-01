"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/submit", label: "Submit" },
  ];

  return (
    <nav className="h-16 bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="max-w-[1200px] mx-auto h-full px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl italic font-serif text-black">
          Capacious
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-normal hover:text-black transition-colors ${
                  isActive
                    ? "text-black border-b-2 border-gray-600 pb-0.5"
                    : "text-gray-500"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* User Name */}
        <span className="text-sm text-gray-500">(User: Greg S.)</span>
      </div>
    </nav>
  );
}
