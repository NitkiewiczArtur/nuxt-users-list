import { defineNuxtConfig } from 'nuxt';
import vuetify from '@vuetify/vite-plugin';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "vuetify/styles",
  ],
  vite: {
    plugins: [
      vuetify(),
      // @ts-ignore
      {
        // https://github.com/nuxt/framework/issues/2798
        // Poniższy kod zmienia kolejność ładowanych pluginów, tak by plugin vuetify ładował sie po pluginie do vue
        configResolved(config) {
          const idx = config.plugins.findIndex(plugin => plugin.name === "vuetify:import");
          const vueIdx = config.plugins.findIndex(plugin => plugin.name === "vite:vue");
          if (~idx && idx < vueIdx) {
            const plugin = config.plugins[idx];
            // @ts-ignore
            config.plugins.splice(idx, 1);
            // @ts-ignore
            config.plugins.splice(vueIdx, 0, plugin);
          }
        },
      },
    ],
    define: {
      "process.env.DEBUG": "false",
    },
    // @ts-ignore
    ssr: {
      noExternal: [
        "vuetify",
      ],
    },
  }
});
