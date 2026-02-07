import type { NextConfig } from "next";

const version = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12); // YYYYMMDDHHmm

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: version,
  },
};

export default nextConfig;
