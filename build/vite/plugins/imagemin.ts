// /**
//  * 用于压缩生产环境输出的图片资源
//  * https://github.com/anncwb/vite-plugin-imagemin
//  */

// import viteImagemin from 'vite-plugin-imagemin';

// export function configImageminPlugin() {
//   const plugin = viteImagemin({
//     gifsicle: {
//       optimizationLevel: 7,
//       interlaced: false,
//     },
//     optipng: {
//       optimizationLevel: 7,
//     },
//     mozjpeg: {
//       quality: 8,
//     },
//     pngquant: {
//       quality: [0.8, 0.9],
//       speed: 4,
//     },
//     svgo: {
//       plugins: [
//         {
//           removeViewBox: false,
//         },
//         {
//           removeEmptyAttrs: false,
//         },
//       ],
//     },
//   });
//   return plugin;
// }
