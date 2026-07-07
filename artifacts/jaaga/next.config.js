/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist/public',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
