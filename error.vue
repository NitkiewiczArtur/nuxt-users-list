<template>
  <v-app>
    <v-container class="d-flex flex-column justify-center">
      <h1>{{ `${error.statusCode} ${error.statusMessage}` }}</h1>
      <div class="d-flex flex-row justify-center">
        <v-btn color="primary" @click="handleError">Wróć do strony startowej</v-btn>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({redirect: '/'})
</script>

<style scoped>
h1 {
  text-align: center
}

.v-container {
  /*  directive fill-height doesnt work :(*/
  height: 100%;
}
</style>
