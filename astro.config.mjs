import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://carterogunsola.com',
  srcDir: './app',
  publicDir: './app/public',
  outDir: './dist',
  devToolbar: {
    enabled: false,
  },
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      allowedHosts: true,
    },
  },
});
