import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {CAMPAIGN_2026_CONSTANTS} from './src/data/growthSeason2026Data';

// LINT.IfChange(aistudio_media_plugin)
function aistudioMediaPlugin(): Plugin {
  return {
    name: 'vite-plugin-aistudio-media',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/assets/aistudio/')) {
          const rawPath = req.url.split('?')[0].split('#')[0];
          try {
            const decodedPath = decodeURIComponent(rawPath);
            const relativePath = decodedPath.replace(/^\//, '');
            const aistudioDir = path.resolve(
              __dirname,
              'public',
              'assets',
              'aistudio',
            );
            const filePath = path.resolve(__dirname, 'public', relativePath);
            if (
              filePath.startsWith(aistudioDir + path.sep) &&
              fs.existsSync(filePath) &&
              fs.statSync(filePath).isFile()
            ) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.bmp': 'image/bmp',
                '.ico': 'image/x-icon',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.ogv': 'video/ogg',
                '.mp3': 'audio/mpeg',
                '.wav': 'audio/wav',
                '.ogg': 'audio/ogg',
                '.pdf': 'application/pdf',
              };
              res.setHeader(
                'Content-Type',
                mimeMap[ext] || 'application/octet-stream',
              );
              res.setHeader('Cache-Control', 'no-cache');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
          } catch {
            // Fall through if URI decoding or file access fails
          }
        }
        next();
      });
    },
  };
}
// LINT.ThenChange(//depot/google3/java/com/google/alkali/boq/makersuite/applet_dev_service/templates/initializers/react_theme/vite.config.ts:aistudio_media_plugin)

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function campaignStaticHtmlPlugin(): Plugin {
  return {
    name: 'vite-plugin-campaign-static-html',
    apply: 'build',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const baseHtmlPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(baseHtmlPath)) {
        return;
      }

      const title = escapeHtmlAttr(CAMPAIGN_2026_CONSTANTS.seoTitle);
      const description = escapeHtmlAttr(CAMPAIGN_2026_CONSTANTS.seoDescription);
      const canonicalUrl = escapeHtmlAttr(CAMPAIGN_2026_CONSTANTS.canonicalUrl);
      const ogImage = escapeHtmlAttr(CAMPAIGN_2026_CONSTANTS.ogImage);
      const ogImageAlt = escapeHtmlAttr(CAMPAIGN_2026_CONSTANTS.ogImageAlt);

      let html = fs.readFileSync(baseHtmlPath, 'utf8');

      html = html
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
        .replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${description}" />`,
        )
        .replace(
          /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
          `<link rel="canonical" href="${canonicalUrl}" />`,
        )
        .replace(
          /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:type" content="website" />`,
        )
        .replace(
          /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:url" content="${canonicalUrl}" />`,
        )
        .replace(
          /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:title" content="${title}" />`,
        )
        .replace(
          /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:description" content="${description}" />\n    <meta property="og:image" content="${ogImage}" />\n    <meta property="og:image:alt" content="${ogImageAlt}" />`,
        )
        .replace(
          /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/,
          `<meta name="twitter:card" content="summary_large_image" />`,
        )
        .replace(
          /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
          `<meta name="twitter:title" content="${title}" />`,
        )
        .replace(
          /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="twitter:description" content="${description}" />\n    <meta name="twitter:image" content="${ogImage}" />`,
        );

      const requiredMarkers = [
        `<title>${title}</title>`,
        `<link rel="canonical" href="${canonicalUrl}" />`,
        `<meta property="og:title" content="${title}" />`,
        `<meta property="og:description" content="${description}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:url" content="${canonicalUrl}" />`,
        `<meta property="og:image" content="${ogImage}" />`,
        `<meta property="og:image:alt" content="${ogImageAlt}" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${title}" />`,
        `<meta name="twitter:description" content="${description}" />`,
        `<meta name="twitter:image" content="${ogImage}" />`,
      ];

      for (const marker of requiredMarkers) {
        if (!html.includes(marker)) {
          throw new Error(
            `campaignStaticHtmlPlugin failed to inject required tag: ${marker}`,
          );
        }
      }

      const campaignDir = path.join(distDir, 'business-growth-season-2026');
      fs.mkdirSync(campaignDir, {recursive: true});
      fs.writeFileSync(path.join(campaignDir, 'index.html'), html, 'utf8');
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      aistudioMediaPlugin(),
      campaignStaticHtmlPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
