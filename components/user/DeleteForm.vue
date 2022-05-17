<template>
  <v-form
      v-model="valid"
      lazy-validation>
    <v-card-content>
      <h3>Jesteś pewny, że chcesz <b>usunąć</b> użytkownika <b>{{ userFullName }}</b>?<br> Jeśli tak, wpisz
        jego imię i nazwisko i naciśnij przycisk DELETE</h3>
      <v-text-field
          v-model="userFullNameInput"
          :rules="[fullNameValidationRule]"
          variant="underlined"
          required
          data-test="fullNameInput"
      ></v-text-field>
    </v-card-content>
    <v-card-actions>
      <v-btn @click="submit" color="error" data-test="submitBtn">USUŃ</v-btn>
      <v-btn @click="cancel" data-test="cancelBtn">ANULUJ</v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts" setup>

const props = defineProps({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['cancel', 'submit'])
const userFullName = computed(() => `${props.firstName} ${props.lastName}`)
const valid = ref(false)
const userFullNameInput = ref('')
const fullNameValidationRule = v => v === unref(userFullName) || 'Imię musi być identyczne'
const cancel = () => emit('cancel')
const submit = () => {
  if (unref(valid)) {
    emit('submit')
  }
}
</script>

<style scoped>
</style>
