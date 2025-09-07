import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: path.join(__dirname, "..", ".."),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lumiere-a.akamaihd.net",
        port: "",
        pathname: "/v1/images/**",
      },
    ],
  },
};

export default nextConfig;
