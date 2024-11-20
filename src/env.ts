import { z } from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		AWS_ACCESS_KEY: z.string(),
		AWS_SECRET_KEY: z.string(),
		AWS_REGION: z.string(),
		AWS_BUCKET_NAME: z.string(),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
		AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
		AWS_REGION: process.env.AWS_REGION,
		AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
	},
});
