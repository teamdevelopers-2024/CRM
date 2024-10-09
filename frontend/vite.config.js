import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    // Remove the external configuration for Font Awesome
    rollupOptions: {
      // No need for external here
    },
  },
});
