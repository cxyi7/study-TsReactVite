import { defineConfig, loadEnv, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import path, { resolve } from 'path';
import windi from 'vite-plugin-windicss';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';
import svgr from 'vite-plugin-svgr';

// 媒体类文件，包括mp4、webm、ogg、mp3、wav、flac和aac。
// 字体类文件。包括woff、woff2、eot、ttf 和 otf。
// 文本类。包括webmanifest、pdf和txt。

// ?url: 表示获取资源的路径，这在只想获取文件路径而不是内容的场景将会很有用。
// ?raw: 表示获取资源的字符串内容，如果你只想拿到资源的原始内容，可以使用这个后缀。
// ?inline: 表示资源强制内联，而不是打包成单独的文件。

const variablePath = normalizePath(
  path.resolve(__dirname, './src/variable.scss'),
);
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载当前模式下的环境变量，对应关系为：
  // dev -> (.env,.env.development)
  // build -> (.env,.env.production)
  const viteEnv = loadEnv(mode, process.cwd());
  const { VITE_BASE } = viteEnv;

  return {
    base: VITE_BASE,
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
    ],
    assetsInclude: ['.gltf'], // 配置其它格式的静态资源
    resolve: {
      // 别名设置，如果需要在编辑器能更好的识别别名，需要配置jsconfig.json文件
      alias: {
        '@': resolve(__dirname, './src'), // 把 @ 指向到 src 目录去
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "${variablePath}";`,
        },
      },
    },
  };
});
