import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@fontsource/inter'],
    },
  },
  server: {
    host: true,
    port : 5000,
    proxy: {
      '/api': {
          target: env.VITE_DEV_SERVER_PROXY || 'https://mern-chat-app-backend-9zdi.onrender.com',
          changeOrigin: true,
          secure: false,
      }
    },
    watch: {
      usePolling: true,
    },
  },
}
})
