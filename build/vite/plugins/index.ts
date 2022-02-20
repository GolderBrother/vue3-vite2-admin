
import legacyPlugin from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type { Plugin } from 'vite';

// import purgeIcons from 'vite-plugin-purge-icons';
import { svgBuilder } from '../../svgBuilder';
import { configCompressPlugin } from './compress';
import { configHmrPlugin } from './hmr';
import { configHtmlPlugin } from './html';
// import { configImageminPlugin } from './imagemin';
import { configMockPlugin } from './mock';
import { configPwaConfig } from './pwa';
import { configStyleImportPlugin } from './styleImport';
import { configSvgIconsPlugin } from './svgSprite';
import { configVisualizerConfig } from './visualizer';
// import { configThemePlugin } from './theme';

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN: shouldUseImagemin,
    VITE_USE_MOCK: shouldUseMock,
    VITE_BUILD_COMPRESS: compressType,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: shouldBuildCompressDeleteFile,
  } = viteEnv;
  const vitePlugins: (Plugin | Plugin[])[] = [
    // 必须
    vue(),
    // 必须
    vueJsx(),
    legacyPlugin({
      targets: [
        'Android > 39',
        'Chrome >= 60',
        'Safari >= 10.1',
        'iOS >= 10.3',
        'Firefox >= 54',
        'Edge >= 15',
      ],
    }),
    svgBuilder('./src/assets/svg/'),
  ];

  // 配置 HMR 插件
  !isBuild && vitePlugins.push(configHmrPlugin());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  shouldUseMock && vitePlugins.push(configMockPlugin(isBuild));

  // vite-plugin-purge-icons
  // vitePlugins.push(purgeIcons());

  // vite-plugin-style-import
  vitePlugins.push(configStyleImportPlugin(isBuild));

  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // vite-plugin-theme
  // vitePlugins.push(configThemePlugin(isBuild));

  // 生产环境使用插件
  if (isBuild) {
    // vite-plugin-imagemin
    // shouldUseImagemin && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(compressType, shouldBuildCompressDeleteFile));

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
