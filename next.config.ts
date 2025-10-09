import dotenv from "dotenv";
import type { NextConfig } from 'next';
import { version } from './package.json';

dotenv.config({ path: ".env.production" });

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
			{
				protocol: 'https',
				hostname: 'sindagente-site.s3.us-east-2.amazonaws.com',
			}
		],
	},
};

export default nextConfig;
