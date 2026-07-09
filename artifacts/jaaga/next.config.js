/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? 'dist/public' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
