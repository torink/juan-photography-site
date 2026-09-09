// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

if (!projectId) {
  console.warn('[config] PUBLIC_SANITY_PROJECT_ID is not set. Copy .env.example to .env after `sanity init`.');
}

export default defineConfig({
  site: 'https://galleriaguzman.studio',
  output: 'static',
  integrations: [
    sanity({
      projectId: projectId || 'placeholder',
      dataset,
      useCdn: false,
      apiVersion: '2026-01-01',
      studioBasePath: '/studio',
    }),
    react(),
  ],
});
