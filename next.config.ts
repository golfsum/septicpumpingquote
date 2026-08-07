import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Keep tracing/bundling rooted on this site folder (monorepo-adjacent parent noise).
  outputFileTracingRoot: path.join(__dirname),
  turbopack: {
    root: path.join(__dirname),
  },
  // Next.js blocks /_next/* from non-localhost hosts in dev (403). Allow LAN access.
  allowedDevOrigins: [
    "10.5.0.2",
    "127.0.0.1",
    "localhost",
  ],
};

export default nextConfig;
