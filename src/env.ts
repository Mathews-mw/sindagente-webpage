import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		APP_URL: z.string(),
		AWS_ACCESS_KEY_ID: z.string(),
		AWS_SECRET_ACCESS_KEY: z.string(),
		AWS_REGION: z.string(),
		AWS_BUCKET_NAME: z.string(),
		AWS_BUCKET_BASE_URL: z.string().url(),
		SECRET_TOKEN: z.string(),
		NEXTAUTH_URL: z.string(),
		NEXTAUTH_SECRET: z.string(),
	},
	client: {
		NEXT_PUBLIC_API_BASE_URL: z.string().url(),
		NEXT_PUBLIC_SECRET: z.string(),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		APP_URL: process.env.APP_URL,
		AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
		AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
		AWS_REGION: process.env.AWS_REGION,
		AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
		AWS_BUCKET_BASE_URL: process.env.AWS_BUCKET_BASE_URL,
		SECRET_TOKEN: process.env.SECRET_TOKEN,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXT_PUBLIC_SECRET: process.env.NEXT_PUBLIC_SECRET,
		NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
	},
});
