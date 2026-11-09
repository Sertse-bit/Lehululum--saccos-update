import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind CSS v4 is compiled through the Turbopack loader that the
  // Next.js scaffold configured. Do not remove this block.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  // `npm run dev` blocks its own scripts (and so React never hydrates, which
  // leaves the menus and the language button dead) when the site is opened
  // from any hostname other than localhost, for example a phone or another
  // computer using http://192.168.x.x:3000. Allow the private network ranges.
  // This only affects `next dev`; production builds are not restricted.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*", "*.local"],
};

export default nextConfig;
