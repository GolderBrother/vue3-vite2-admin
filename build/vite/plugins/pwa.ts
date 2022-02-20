/**
 * vite pwa 0 配置插件
 * https://github.com/antfu/vite-plugin-pwa
 */

import { VitePWA } from 'vite-plugin-pwa';

export function configPwaConfig(env: ViteEnv) {
  const { VITE_USE_PWA: shouldUsePwa, VITE_GLOB_APP_TITLE: appTitle, VITE_GLOB_APP_SHORT_NAME: shortName } = env;

  if (shouldUsePwa) {
    // vite-plugin-pwa
    const pwaPlugin = VitePWA({
      manifest: {
        name: appTitle,
        short_name: shortName,
        icons: [
          {
            src: './resource/img/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './resource/img/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    });
    return pwaPlugin;
  }
  return [];
}
