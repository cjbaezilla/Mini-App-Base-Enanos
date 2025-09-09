/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for shared hosting
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
