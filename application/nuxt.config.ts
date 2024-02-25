// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  components: {
    dirs: [],
  },
  imports: {
    autoImport: false,
  },
  // css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['shadcn-nuxt'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui',
  },
  alias: {
    'lexical-vue-editor': path.resolve(__dirname, '../lexical-vue-editor/src'),
    'lexical-vue': path.resolve(__dirname, '../lexical-vue/src'),
  },
});
