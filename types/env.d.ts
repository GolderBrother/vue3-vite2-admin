declare interface ImportMeta {
  env: ImportMetaEnv;
}

declare interface ImportMetaEnv {
  VITE_APP_TITLE?: string;
  VITE_NODE_ENV: string;
  VITE_GLOB_API_URL: string;
  // more env variables...
}
