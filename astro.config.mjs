// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Defaults are for the real site. A temporary copy (e.g. GitHub Pages) can
// override them with environment variables at build time:
//   SITE       full origin, e.g. https://ajbarrows.github.io
//   BASE_PATH  subfolder the site lives in, e.g. /jitm-website
//   NOINDEX    "true" to ask search engines not to index the copy
const site = process.env.SITE || 'https://www.jazzinthemountains.com';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  build: { format: 'directory' },
});
