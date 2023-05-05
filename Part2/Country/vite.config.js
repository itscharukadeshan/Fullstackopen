/** @format */

import { defineConfig } from "vite";

export default defineConfig({
  // Define your environment variables here
  define: {
    "process.env": {
      OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    },
  },
  // ...other configuration options
});
