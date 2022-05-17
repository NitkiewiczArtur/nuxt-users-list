<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Imię
      </th>
      <th class="text-left">
        Nazwisko
      </th>
      <th class="text-left">
        E-mail
      </th>
      <th class="text-left">
        Numer telefonu
      </th>
      <th>
        Akcja
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(user, index) in users"
        :key="index"
    >
      <td>{{ user.firstName }}</td>
      <td>{{ user.lastName }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.phone }}</td>
      <td>
        <v-btn @click="openEditUserForm(index)" class="mr-2" color="primary"
               data-test="editUserBtn">EDYTUJ
        </v-btn>
        <v-btn @click="openDeleteUserForm(index)" color="error"
               data-test="deleteUserBtn">USUŃ
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import {PropType} from "@vue/runtime-core";
import {User, WithId} from "~/models/user";

const props = defineProps({
  users: {
    type: Array as PropType<Array<WithId<User>>>,
    required: true
  }
})
const emit = defineEmits(['openDeleteUserForm', 'openEditUserForm'])

const openDeleteUserForm = (index) => emit('openDeleteUserForm', index)
const openEditUserForm = (index) => emit('openEditUserForm', index)
</script>

<style scoped>
</style>
