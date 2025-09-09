/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true, // ✅ required for logos in static export
  },
};

module.exports = nextConfig;
