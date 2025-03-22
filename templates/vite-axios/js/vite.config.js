import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: false, 
    minify: 'esbuild', 
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; 
          }
        },
      },
    },
  },
  resolve: {
    //추가
    alias: [
      {
        find: '@src',
        replacement: path.resolve(__dirname, 'src'),
      },
    ],
  },
});
