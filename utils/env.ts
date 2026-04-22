import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().describe('Base URL for the API server'),
  NEXT_PUBLIC_DEPLOY_URL: z
    .string()
    .url()
    .describe('Base URL of this Next.js app (for client calls to /api, etc.)'),
});

/** Used when `NEXT_PUBLIC_DEPLOY_URL` is unset (e.g. forgot to add to CI `env:`). */
function resolvePublicDeployUrl(): string {
  const v = process.env.NEXT_PUBLIC_DEPLOY_URL?.trim();
  if (v) return v;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`.replace(/\/$/, '');
  }
  return 'http://localhost:3000';
}

const _env = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_DEPLOY_URL: resolvePublicDeployUrl(),
};
const parseEnv = envSchema.safeParse(_env);

if (!parseEnv.success) {
  console.error('❌ Invalid environment variables:', parseEnv.error);
  throw new Error('Invalid environment variables');
}

const env = {
  apiBaseUrl: parseEnv.data.NEXT_PUBLIC_API_URL,
  deployUrl: parseEnv.data.NEXT_PUBLIC_DEPLOY_URL,
};

export default env;
