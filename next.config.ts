import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // Keep firebase-admin external so Node can load it; auth verification uses jose directly.
  serverExternalPackages: ["firebase-admin", "@google-cloud/firestore"],
  allowedDevOrigins: ["10.5.0.2", "127.0.0.1", "localhost"],
};

export default nextConfig;
