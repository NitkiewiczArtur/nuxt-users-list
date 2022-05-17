<template>
  <Teleport to="body">
    <Transition name="modal">
    <div v-if="show" class="modal__mask" >
      <div class="modal__wrapper">
        <v-container :class="modalContainerClassObject">
          <v-card>
            <v-card-title>{{ modalTitle }}</v-card-title>
            <template v-if="isDelete">
              <UserDeleteForm
                  :firstName="user.firstName"
                  :lastName="user.lastName"
                  @submit="onSubmitDeleteForm"
                  @cancel="onCancelForm"/>
            </template>
            <template v-else>
              <UserForm
                  :firstName="user.firstName"
                  :lastName="user.lastName"
                  :email="user.email"
                  :phone="user.phone"
                  @submit="onSubmitCreateUpdateForm"
                  @cancel="onCancelForm"/>
            </template>
          </v-card>
        </v-container>
      </div>
    </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import {User, WithId} from "~/models/user";
import {PropType} from "@vue/runtime-core";

const DELETE_TITLE = 'Usuwanie użytkownika'
const CREATE_TITLE = 'Dodawanie użytkownika'
const UPDATE_TITLE = 'Edycja użytkownika'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  userToEdit: {
    type: Object as PropType<WithId<User>>,
    default: undefined
  },
  isDelete: {
    type: Boolean
  }
})
const emit = defineEmits<{
  (e: 'closeModal')
  (e: 'saveUser', user: WithId<User>)
  (e: 'deleteUser', id: number)
}>()

const user = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  id: null
} as WithId<User>)

const modalTitle = computed(() => {
  if (props.isDelete) {
    return DELETE_TITLE
  }
  if (user.id) {
    return UPDATE_TITLE
  }
  return CREATE_TITLE
})

const modalContainerClassObject = computed(() => ({
  'modal--small': !props.isDelete,
  'modal--medium':props.isDelete,
}))

const onCancelForm = () => emit('closeModal')
const onSubmitCreateUpdateForm = (userToSave: User) =>
    emit('saveUser', {...userToSave, id: user.id})
const onSubmitDeleteForm = () => emit('deleteUser', user.id)

watch(() => props.userToEdit, (newUserToEdit) => {
  user.firstName = newUserToEdit?.firstName ?? ''
  user.lastName = newUserToEdit?.lastName ?? ''
  user.phone = newUserToEdit?.phone ?? ''
  user.email = newUserToEdit?.email ?? ''
  user.id = newUserToEdit?.id ?? null
})

</script>

<style lang="scss" scoped>
@use "assets/scss/components/modal";
</style>
