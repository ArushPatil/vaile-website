import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
import { defineConfig } from "vite";

function spaStaticRoutesPlugin(outDirPath: string) {
  return {
    name: "spa-static-routes",
    closeBundle() {
      const routes = ["about", "deep-dive", "terms", "privacy", "404"];
      const indexPath = path.resolve(outDirPath, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const indexHtml = fs.readFileSync(indexPath, "utf-8");

      // Create static directory entry points for direct CDN resolution
      routes.forEach((route) => {
        const routeDir = path.resolve(outDirPath, route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        fs.writeFileSync(path.resolve(routeDir, "index.html"), indexHtml);
        fs.writeFileSync(path.resolve(outDirPath, `${route}.html`), indexHtml);
      });

      // Write 404.html as SPA entrypoint so Cloudflare fallback always serves the React app
      fs.writeFileSync(path.resolve(outDirPath, "404.html"), indexHtml);

      // Write Cloudflare _redirects
      const redirects = [
        "/about /index.html 200",
        "/deep-dive /index.html 200",
        "/terms /index.html 200",
        "/privacy /index.html 200",
        "/* /index.html 200",
      ].join("\n");
      fs.writeFileSync(path.resolve(outDirPath, "_redirects"), redirects + "\n");
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    spaStaticRoutesPlugin(path.resolve(import.meta.dirname, "dist/public")),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "../public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "wouter"],
          "vendor-motion": ["framer-motion"],
          "vendor-ui": ["lucide-react", "sonner"],
        },
      },
    },
  },
});
