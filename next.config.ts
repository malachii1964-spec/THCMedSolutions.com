import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the pg driver unbundled so its native/dynamic requires resolve.
  serverExternalPackages: ["pg"],
};

export default nextConfig;
