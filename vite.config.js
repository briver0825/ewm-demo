import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  server: {
    host: '0.0.0.0',
    https: true
  },
  plugins: [
    mkcert()
  ]
})