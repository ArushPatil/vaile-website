import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';

function spaStaticRoutesPlugin(outDirPath) {
  return {
    name: 'spa-static-routes',
    closeBundle() {
      const routes = ['about', 'deep-dive', 'terms', 'privacy'];
      const indexPath = path.resolve(outDirPath, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const indexHtml = fs.readFileSync(indexPath, 'utf-8');

      // One canonical asset per route: directory entry points only.
      // Do NOT emit duplicate route.html twins - under Cloudflare's asset
      // routing both candidates normalize against each other and extensionless
      // /route requests degenerate into 308s. Directory form serves natively.
      routes.forEach((route) => {
        const routeDir = path.resolve(outDirPath, route);
        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.resolve(routeDir, 'index.html'), indexHtml);
      });

      // Write 404.html as SPA entrypoint so unknown paths render the branded
      // Not Found view while correctly returning HTTP 404. No _redirects file:
      // the 200-rewrite rules are ignored by Cloudflare's asset routing and
      // only add ambiguity on top of the per-route directories.
      fs.writeFileSync(path.resolve(outDirPath, '404.html'), indexHtml);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    spaStaticRoutesPlugin(path.resolve(__dirname, 'dist')),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'vaile-storefront-drop-001/client/src'),
      '@shared': path.resolve(__dirname, 'vaile-storefront-drop-001/shared'),
    },
  },
  root: path.resolve(__dirname, 'vaile-storefront-drop-001/client'),
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: false,
    host: true,
    allowedHosts: ['3000-iw6u698cmxgr70hcyj66z-43493a91.sg1.manus.computer'],
  },
});
