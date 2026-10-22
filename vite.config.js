import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/** Pages publiques indexables. */
const PAGES_PUBLIQUES = [
  '/',
  '/fonctionnalites',
  '/comment-ca-marche',
  '/inscription',
  '/connexion',
  '/mentions-legales',
  '/confidentialite',
  '/conditions-utilisation',
];

/**
 * Génère robots.txt et sitemap.xml au build à partir de VITE_SITE_URL.
 * Sans URL de site, seul robots.txt est produit (sans ligne Sitemap) :
 * on ne devine pas le domaine de production.
 */
function seoFiles(siteUrl) {
  return {
    name: 'pro2link-seo-files',
    apply: 'build',
    generateBundle() {
      const base = (siteUrl || '').replace(/\/$/, '');
      const robots = ['User-agent: *', 'Allow: /', ''];
      if (base) robots.push(`Sitemap: ${base}/sitemap.xml`, '');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') });
      if (!base) return;
      const urls = PAGES_PUBLIQUES.map((p) => `  <url><loc>${base}${p === '/' ? '/' : p}</loc></url>`).join('\n');
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_API_PROXY_TARGET || 'http://localhost:3000';

  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL)],
    server: {
      port: 5173,
      // Le navigateur ne parle qu'à Vite : l'API est servie sous la même origine,
      // le cookie httpOnly du refresh token (SameSite=Strict) circule sans CORS.
      proxy: {
        '/api': { target: proxyTarget, changeOrigin: true },
        '/health': { target: proxyTarget, changeOrigin: true },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/react-hook-form') || id.includes('node_modules/zod') || id.includes('node_modules/@hookform')) return 'forms';
            return undefined;
          },
        },
      },
    },
    test: {
      environment: 'node',
      include: ['src/**/*.test.js'],
    },
  };
});
