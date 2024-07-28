// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],
  colorMode: {
    preference: 'dark',
    classSuffix: ''
  },
  tailwindcss: {
    config: {
      theme: {
        extend: {
          colors: {
            'primary-dark': { DEFAULT: '#0D1117',  50: '#4F688C',  100: '#485E7F',  200: '#394B65',  300: '#2A384B',  400: '#1C2431',  500: '#0D1117',  600: '#000000',  700: '#000000',  800: '#000000',  900: '#000000',  950: '#000000' },
            'secondary': { DEFAULT: '#161B22',  50: '#5E7491',  100: '#566A85',  200: '#46566C',  300: '#364254',  400: '#262F3B',  500: '#161B22',  600: '#000000',  700: '#000000',  800: '#000000',  900: '#000000',  950: '#000000' },
            'primary-ui': { DEFAULT: '#0D1117', 400: '#ffffff' },
            'jwt-header': '#ef4444',
            'jwt-payload': '#d946ef',
            'jwt-sign': '#38bdf8',
            'error': '#dc2626'
          }
        }
      }
    }
  },
})