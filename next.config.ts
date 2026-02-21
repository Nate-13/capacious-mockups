import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is the default in Next.js 16. The canvas alias webpack workaround
  // is not needed here — Turbopack resolves browser modules correctly.
  turbopack: {},
};

export default nextConfig;
