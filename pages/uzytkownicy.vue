<template>
  <v-container>
    <v-row>
      <v-col>
        <v-btn @click="openAddUserForm"
               color="primary"
               data-test="addUserBtn">DODAJ</v-btn>
      </v-col>
    </v-row>
    <UserTable :users="users" @openEditUserForm="onOpenEditUserForm" @openDeleteUserForm="onOpenDeleteUserForm"/>
  </v-container>
  <UserCRUDModal :show="showUserForm" :isDelete="isDeleteUser" :userToEdit="userToCRUD"
                 @closeModal="onCloseModal"
                 @saveUser="onSaveUser"
                 @deleteUser="onDeleteUser"
                 data-test="userModal"/>
</template>

<script lang="ts" setup>
import {User, WithId} from "~/models/user";
import {createUser, deleteUser, updateUser} from "~/services/userService";
import useFetchUsers from "~/composable/useFetchUsers";

const showUserForm = ref(false)
const {users, refreshUsers} = useFetchUsers()
const userToCRUD = ref(undefined)
const isDeleteUser = ref(false)

const openAddUserForm = () => {
  isDeleteUser.value = false
  userToCRUD.value = undefined
  showUserForm.value = true
}
const onOpenEditUserForm = (index: number) => {
  isDeleteUser.value = false
  userToCRUD.value = readonly(users.value[index])
  showUserForm.value = true
}
const onOpenDeleteUserForm = (index: number) => {
  isDeleteUser.value = true
  userToCRUD.value = readonly(users.value[index])
  showUserForm.value = true
}
const onCloseModal = () => {
  showUserForm.value = false
}
const onSaveUser = async (userToSave: WithId<User>) => {
  if (userToSave.id) {
    await updateUser(userToSave)
  } else {
    await createUser(userToSave)
  }
  await refreshUsers()
  showUserForm.value = false
}
const onDeleteUser = async (id: number) => {
  await deleteUser(id)
  await refreshUsers()
  showUserForm.value = false
}
</script>

<style scoped>

</style>
