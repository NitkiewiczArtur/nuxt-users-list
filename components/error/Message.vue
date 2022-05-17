<template>
  <Teleport to="body">
    <div v-if="!!error" class="modal__mask">
      <div class="modal__wrapper">
        <v-container>
          <v-card>
            <v-card-title>Error</v-card-title>
            <v-card-content>
              {{ message }}
            </v-card-content>
            <v-card-actions>
              <v-btn color="primary" @click="dismissError" data-test="closeWindowBtn">ZAMKNIJ OKNO</v-btn>
            </v-card-actions>
          </v-card>
        </v-container>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {useStore} from "vuex";

const store = useStore()
const error = computed(() => store.state.error)
const message = computed(() => `${unref(error).message}: ${unref(error).response.statusText}`)
const dismissError = () => store.dispatch("SET_ERROR", null)
</script>

<style lang="scss" scoped>
@use "assets/scss/components/modal";

.v-container {
  max-width: 40rem
}
</style>
