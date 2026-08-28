import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";
import { defineConfig } from "vite";

const routeMetadata: Record<string, { title: string; description: string; url: string; image: string }> = {
  about: {
    title: "About VAILE — Our Story & Philosophy",
    description: "The story of VAILE: three years of sampling, single-garment focus, and the journey to Drop 001.",
    url: "https://vaile.co/about",
    image: "https://vaile.co/images/vaile-field-dossier-hero.webp",
  },
  "deep-dive": {
    title: "Deep Dive — VAILE Drop 001 Materials, Fit & Craft",
    description: "A detailed look at VAILE Drop 001: 12oz cotton duck canvas, relaxed straight cut, solid brass hardware, and real-world versatility.",
    url: "https://vaile.co/deep-dive",
    image: "https://vaile.co/images/vaile-canvas-double-knee-study.webp",
  },
  terms: {
    title: "Terms of Service — VAILE",
    description: "Terms governing the VAILE DROP 001 website and WhatsApp enquiry process.",
    url: "https://vaile.co/terms",
    image: "https://vaile.co/images/5.webp",
  },
  privacy: {
    title: "Privacy Policy — VAILE",
    description: "How VAILE handles information connected to the DROP 001 website and WhatsApp enquiries.",
    url: "https://vaile.co/privacy",
    image: "https://vaile.co/images/5.webp",
  },
};

function injectRouteMeta(html: string, meta?: { title: string; description: string; url: string; image: string }) {
  if (!meta) return html;
  return html
    .replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`)
    .replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i, `<link rel="canonical" href="${meta.url}" />`)
    .replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:url" content="${meta.url}" />`)
    .replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta property="og:image" content="${meta.image}" />`)
    .replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:description" content="${meta.description}" />`)
    .replace(/<meta\s+name=["']twitter:url["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:url" content="${meta.url}" />`)
    .replace(/<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i, `<meta name="twitter:image" content="${meta.image}" />`);
}

function spaStaticRoutesPlugin(outDirPath: string) {
  return {
    name: "spa-static-routes",
    closeBundle() {
      const routes = ["about", "deep-dive", "terms", "privacy"];
      const indexPath = path.resolve(outDirPath, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const indexHtml = fs.readFileSync(indexPath, "utf-8");

      // Generate per-route static entry points with page-specific OpenGraph metadata
      routes.forEach((route) => {
        const routeDir = path.resolve(outDirPath, route);
        fs.mkdirSync(routeDir, { recursive: true });
        const routeHtml = injectRouteMeta(indexHtml, routeMetadata[route]);
        fs.writeFileSync(path.resolve(routeDir, "index.html"), routeHtml);
      });

      // Write 404.html as SPA entrypoint
      fs.writeFileSync(path.resolve(outDirPath, "404.html"), indexHtml);
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
    sourcemap: false,
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
