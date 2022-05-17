<template>
  <v-form
      ref="form"
      v-model="data.valid"
      lazy-validation
  >
    <v-card-content>
      <v-text-field
          v-model="data.firstName"
          :rules="data.firstNameRules"
          label="Imię"
          required
          variant="contained"
          data-test="firstNameInput"
      ></v-text-field>
      <v-text-field
          v-model="data.lastName"
          :rules="data.lastNameRules"
          label="Nazwisko"
          required
          variant="contained"
          data-test="lastNameInput"
      ></v-text-field>
      <v-text-field
          v-model="data.email"
          :rules="data.emailRules"
          label="E-mail"
          required
          variant="contained"
          data-test="emailInput"
      ></v-text-field>
      <v-text-field
          v-model="data.phone"
          :rules="data.phoneRules"
          label="Numer telefonu"
          required
          variant="contained"
          data-test="phoneInput"
      ></v-text-field>
    </v-card-content>
    <v-card-actions>
      <v-btn color="success" @click="submit" data-test="submitBtn">ZAPISZ
      </v-btn>
      <v-btn @click="cancel" color="error" data-test="cancelBtn">ANULUJ
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script lang="ts" setup>

import {User} from "~/models/user";
import {emailRules, firstNameRules, lastNameRules, phoneRules} from "~/utils/formValidationRules";

const props = defineProps({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})
const emit = defineEmits<{
  (e: 'update:firstName', firstName: string)
  (e: 'update:lastName', lastName: string)
  (e: 'update:phone', phone: string)
  (e: 'update:email', email: string)
  (e: 'submit', user: User)
  (e: 'cancel')
}>()

const data = reactive({
  valid: true,
  firstName: props.firstName,
  firstNameRules: firstNameRules,
  lastName: props.lastName,
  lastNameRules: lastNameRules,
  phone: props.phone,
  phoneRules: phoneRules,
  email: props.email,
  emailRules: emailRules,
})
const form = ref(null)
const submit = async () => {
  await form.value.validate()
  if (data.valid) {
    emit('submit', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    })
  }
}
const cancel = () => {
  emit('cancel')
}
</script>

<style scoped>
</style>
