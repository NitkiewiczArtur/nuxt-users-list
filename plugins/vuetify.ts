import { createVuetify } from 'vuetify';
import {defineNuxtPlugin} from '#app';

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify();
  nuxtApp.vueApp.use(vuetify);
});
