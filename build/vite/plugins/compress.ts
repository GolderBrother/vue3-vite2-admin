/**
 * 用于打包输出gzip
 * https://github.com/anncwb/vite-plugin-compression
 */

import type { Plugin } from 'vite';
import compressPlugin from 'vite-plugin-compression';

export function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none' = 'none',
  deleteOriginFile = false,
): Plugin | Plugin[] {
  const compressList = compress.split(',');

  const plugins: Plugin[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(compressPlugin({
      ext: '.gz',
      deleteOriginFile,
    }));
  }
  if (compressList.includes('brotli')) {
    plugins.push(compressPlugin({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile,
    }));
  }
  return plugins;
}
