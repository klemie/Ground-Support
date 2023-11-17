import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from'vite-tsconfig-paths';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
            viteTsconfigPaths(),
            wasm(), 
            topLevelAwait()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    port: 3000,
  },
});