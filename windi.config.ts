import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
  preflight: false, // 是否重置css样式
  attributify: true,
  shortcuts: {
    'flex-c': 'flex justify-center items-center',
  },
});
