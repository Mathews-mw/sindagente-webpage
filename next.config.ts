import type { NextConfig } from 'next';
import { version } from './package.json';

const nextConfig: NextConfig = {
	env: {
		APP_VERSION: version,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	reactStrictMode: false,
	compress: true,
	poweredByHeader: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'img.freepik.com',
			},
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
			},
		],
	},
	experimental: {
		optimizeCss: true,
	},
};

export default nextConfig;
