/* eslint-disable */
import { resolve } from 'path';
import { ConfigEnv, defineConfig, loadEnv, UserConfigExport } from 'vite';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { OUTPUT_DIR } from './build/constant';
import { createVitePlugins } from './build/vite/plugins/index';

// 详细配置：https://cn.vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // 从 env 读取的boolean会被转换为string，重新转为boolean类型
  const viteEnv = wrapperEnv(env);

  const {
    VITE_PORT: port = 3000,
    VITE_PUBLIC_PATH: base = './',
    VITE_PROXY,
    VITE_DROP_CONSOLE,
  } = viteEnv;
  const isBuild = command === 'build';

  const rollupOptions = {};
  // 配置 Vite 依赖预编译，缩短项目冷启动时间
  const optimizeDeps = {
    include: [
      'vue'
    ],
  };

  const alias = {
    '@': resolve(__dirname, 'src'),
    '@types': resolve(__dirname, 'types'),
    vue$: 'vue/dist/vue.runtime.esm-bundler.js',
    // https://github.com/vitejs/vite/issues/3413
    '@antv/x6': '@antv/x6/dist/x6.js',
    '@antv/x6-vue-shape': '@antv/x6-vue-shape/lib',
  };

  const proxy = createProxy(VITE_PROXY);

  const esbuild = {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  };

  // 具体的的配置选项：https://vitejs.dev/config/#config-file
  return defineConfig({
    base, // index.html文件所在位置
    root, // js导入的资源路径，src
    resolve: {
      alias,
    },
    define: {
      'process.env.APP_IS_LOCAL': '"true"',
    },
    server: {
      // 监听所有本地 IP
      host: true,
      // 是否开启 https
      https: false,
      // 端口
      port,
      // 代理
      proxy,
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: OUTPUT_DIR || 'dist', // 产出目录
      rollupOptions,
      terserOptions: {
        compress: {
          keep_infinity: true,
          // Used to delete console in production environment
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      // 关闭 brotliSize 显示可以稍微减少打包时间
      brotliSize: false,
      // 限制最大包的大小
      chunkSizeWarningLimit: 2000,
    },
    esbuild,
    optimizeDeps,
    // vite 工程相关的插件. 数量多，抽离出去单独管理
    plugins: createVitePlugins(viteEnv, isBuild),
    // @ts-ignore
    compilerOptions: {
      types: ['node', 'jest', 'vite/client'],
    },
  });
};
