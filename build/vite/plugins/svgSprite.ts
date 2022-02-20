/**
 * 用于快速创建 SVG 精灵的 Vite 插件。
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import path from 'path';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/svg')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}
