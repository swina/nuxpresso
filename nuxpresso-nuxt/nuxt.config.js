import dotenv from 'dotenv'
import path from 'path'
dotenv.config()
console.log (  'connected to => ' , process.env.API_URL )
export default {
  
  target: 'static',
  /*
   ** Headers of the page
   */
  env: {
    strapiBaseUri: process.env.API_URL || "http://localhost:1338",
    //VUE_APP_HERE_APIKEY: process.env.VUE_APP_HERE_APIKEY,
    VERSION: "0.0.1"
  },

  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family="+process.env.FONT_FAMILIES//Work+Sans"//Staatliches"
      },
      { 
        rel: "stylesheet" ,
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }

    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loadingIndicator: {
    name: 'circle',
    color: '#c3c3c3',
    background: 'white',
    continuous: true
  },
  /*
   ** Global CSS
   */
  css: [
    "~/assets/css/tailwind.css"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ["~/plugins/utils.js" , "~/plugins/moka.js" , { src: "~/plugins/animations.js" , ssr: false } , { src: "~/plugins/gsap.js" , ssr: false }],//"~/plugins/axios.js"
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/recaptcha',
    '@nuxtjs/google-analytics'
  ],
  tailwindcss: {
      exposeConfig: true
  },
  recaptcha : {
    siteKey: process.env.RECAPTCHA,
    version: 3,
    size: 'invisible',
    hideBadge: true
  },
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      'postcss-nested': {}
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/apollo", 
    "@nuxtjs/markdownit",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/axios"
  ],
  markdownit: {
    preset: "default",
    linkify: true,
    breaks: true,
    injected: true,
    html: true
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: (process.env.API_URL ) + "graphql",
        fetchPolicy: 'cache-and-network'
      }
    }
  },
  axios: {
    baseUrl: process.env.API_URL 
  },
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS || 'UA-XXX-X'
  },
  /*
   ** Build configuration
   */
 
  build: {
    /*
     ** You can extend webpack config here
     */
    srcDir: 'src',
    buildDir: 'dist',
    extend(config, ctx) {},
    transpile: [
      "gsap"
    ],
    babel: {
      presets({ isServer }) {
        return [  
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
              useBuiltIns: "entry"
            }
          ]
        ]
      }
    }
  }
};
