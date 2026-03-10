import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMermaid from 'remark-mermaid';

export default defineConfig({
  site: 'https://hanyajun.com',
  base: '/openclaw-blog',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMermaid],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
});
