import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import windi from 'vite-plugin-windicss';
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from 'vite-plugin-stylelint';

const variablePath = normalizePath(
  path.resolve(__dirname, './src/variable.scss'),
);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    windi(),
    viteEslint(),
    viteStylelint({
      // 对某些文件排除检查
      fix: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${variablePath}";`,
      },
    },
  },
});
