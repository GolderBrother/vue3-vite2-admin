/**
 * 在 index.html 中最小化和使用 ejs 模板语法的插件。
 * https://github.com/anncwb/vite-plugin-html
 */

import type { Plugin, PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

import pkg from '../../../package.json';
import { GLOB_CONFIG_FILE_NAME } from '../../constant';

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE: appTitle, VITE_PUBLIC_PATH: publicPath = './' } = env || {};

  const path = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;

  const getAppConfigSrc = () => `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;

  const htmlPlugin: PluginOption[] = createHtmlPlugin({
    minify: isBuild,
    // Inject data into ejs template
    inject: {
      data: {
        title: appTitle,
        // Embed the generated app.config.js file
        injectScript: `<script src="${getAppConfigSrc()}"></script>`,
      },
    },
    
  });
  return htmlPlugin;
}
