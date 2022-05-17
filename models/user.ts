export type User = {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export type WithId<T> = T & {id: number}
