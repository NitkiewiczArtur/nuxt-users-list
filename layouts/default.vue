<template>
  <v-app>
    <v-app-bar color="primary" elevation="0">
      <v-btn to="/">Rekrutacja</v-btn>
      <v-btn to="/uzytkownicy">Użytkownicy</v-btn>
    </v-app-bar>

    <v-main class="pt-16">
      <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          height="6"
          v-show="isLoading"
          data-test="loader"
      />
      <v-container>
        <slot/>
      </v-container>
    </v-main>
    <ErrorMessage/>
  </v-app>
</template>
<script setup lang="ts">
import {useStore} from "vuex";

const store = useStore()
const isLoading = computed(() => store.getters['isLoading'])
</script>
