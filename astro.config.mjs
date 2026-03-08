import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://Han-Ya-Jun.github.io',
  base: '/openclaw-blog',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
