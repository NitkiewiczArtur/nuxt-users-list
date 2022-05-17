import {User, WithId} from '~/models/user';

let generateId = () => Math.round(Math.random() * 100_000);

//e2e tests must have empty users list to work properly.
const users: WithId<User>[] = [
  /*{
    id: generateId(),
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    phone: '794175123'
  },
  {
    id: generateId(),
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    phone: '794175123'
  },
  {
    id: generateId(),
    firstName: 'Adam',
    lastName: 'Nowak',
    email: 'adam.nowak@gmail.com',
    phone: '794123432'
  },
  {
    id: generateId(),
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    phone: '794175123'
  },
  {
    id: generateId(),
    firstName: 'Adam',
    lastName: 'Nowak',
    email: 'adam.nowak@gmail.com',
    phone: '794123432'
  },
  {
    id: generateId(),
    firstName: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    phone: '794175123'
  },*/
]

export const useUserState = () => {

  const get = (): WithId<User>[] => {
    return users
  }

  const post = (newUser: User): WithId<User> => {
    const userToAdd: WithId<User> = {
      ...newUser,
      id: generateId()
    }
    users.push(userToAdd)
    return userToAdd
  }

  const remove = (id: number): boolean => {
    const idToDelete = users.findIndex(x => x.id === id)
    if(idToDelete >= 0) {
      users.splice(idToDelete, 1)
      return true
    } else
      return false
  }

  const put = (newUser: WithId<User>): WithId<User> => {
    const idToDelete = users.findIndex(x => x.id === newUser.id)
    users[idToDelete] = newUser
    return newUser
  }

  return {
    get,
    post,
    remove,
    put
  }
}
