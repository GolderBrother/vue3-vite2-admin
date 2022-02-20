/**
 * 开发环境 mock 插件
 * https://github.com/anncwb/vite-plugin-mock
 */

import { viteMockServe } from 'vite-plugin-mock';

/**
 * 配置 mock 插件
 * @param command 当前执行的命令参数
 * @returns
 */
export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    // eslint-disable-next-line no-useless-escape
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createMockServer';

      setupProdMockServer();
      `,
  });
}
