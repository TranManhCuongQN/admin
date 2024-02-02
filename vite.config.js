import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    // vite config
    plugins: [react()],
    define: {
      __APP_ENV__: env.APP_ENV,
      global: {},
    },
  };
});
