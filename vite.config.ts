import { defineConfig, loadEnv, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import windi from 'vite-plugin-windicss';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

// 媒体类文件，包括mp4、webm、ogg、mp3、wav、flac和aac。
// 字体类文件。包括woff、woff2、eot、ttf 和 otf。
// 文本类。包括webmanifest、pdf和txt。

// ?url: 表示获取资源的路径，这在只想获取文件路径而不是内容的场景将会很有用。
// ?raw: 表示获取资源的字符串内容，如果你只想拿到资源的原始内容，可以使用这个后缀。
// ?inline: 表示资源强制内联，而不是打包成单独的文件。

// 如果静态资源体积 >= 4KB，则提取成单独的文件
// 如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联

const variablePath = normalizePath(
  path.resolve(__dirname, './src/variable.scss'),
);
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载当前模式下的环境变量，对应关系为：
  // dev -> (.env,.env.development)
  // build -> (.env,.env.production)
  const viteEnv = loadEnv(mode, process.cwd());
  const { VITE_BASE, VITE_API_BASEURL, VITE_API_TARGET } = viteEnv;

  return {
    base: VITE_BASE,
    resolve: {
      // 别名设置，如果需要在编辑器能更好的识别别名，需要配置jsconfig.json文件
      alias: {
        '@': resolve(__dirname, './src'), // 把 @ 指向到 src 目录去
      },
    },
    plugins: [
      react(),
      windi(),
      svgr({
        include: 'src/**/*.svg', // 只包含src下的svg
      }),
      viteEslint(),
      viteStylelint({
        // 对某些文件排除检查
        fix: true,
      }),
      createSvgIconsPlugin({
        customDomId: '__svg__icons__',
        iconDirs: [path.resolve(process.cwd(), 'src/assets/svgs')], // 指定需要缓存的图标文件夹
        symbolId: 'icon-[dir]-[name]', // 指定symbolId格式
      }),
    ],
    assetsInclude: ['.gltf'], // 配置其它格式的静态资源
    // 服务设置
    server: {
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      port: 8080, // 端口号
      open: true, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: false, // 如果端口已占用直接退出
      proxy: {
        // 接口代理
        [VITE_API_BASEURL]: {
          changeOrigin: true, // 允许跨域
          target: VITE_API_TARGET, // 本地 8000 前端代码的接口 代理到 8888 的服务端口
          rewrite: (path) => path.replace(VITE_API_BASEURL, '/'), // 配置请求时替换 VITE_API_BASEURL -> /
        },
      },
    },
    build: {
      outDir: `dist/${VITE_BASE}`,
      minify: 'terser',
      brotliSize: false, // 是否显示打包后文件压缩结果，由于vite不支持打包压缩，关闭此功能可以加快打包速度
      chunkSizeWarningLimit: 1000, // 配置打包大于2000KB会发出警告，默认为500KB
      assetsInlineLimit: 8 * 1024, // 静态资源体积 4kb
      terserOptions: {
        // 在生产环境移除console.log 和 debugger
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      assetsDir: 'static/assets',
      rollupOptions: {
        input: {
          entry: resolve(__dirname, 'index.html'),
          // download: resolve(__dirname, 'download.html'),
        },
        output: {
          // 静态资源打包到dist下的不同目录
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    css: {
      modules: {
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${variablePath}";`,
        },
      },
    },
  };
});
