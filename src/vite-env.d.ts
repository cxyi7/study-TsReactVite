/// <reference types="./vite-env-override.d.ts" />
/// <reference types="vite/client" />
// 添加ts代码提示

interface ImportMetaEnv {
  readonly VITE_BASE: string
  readonly VITE_WEB_TITLE: string
  readonly VITE_IMG_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
