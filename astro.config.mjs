import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeMermaid from 'rehype-mermaid';

export default defineConfig({
  site: 'https://hanyajun.com',
  base: '/openclaw-blog',
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [
      [
        rehypeMermaid,
        {
          strategy: 'img-svg',
          dark: true,
        }
      ],
      [
        (await import('@astrojs/markdown-remark')).rehypeShiki,
        {
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        }
      ],
    ],
  },
});
