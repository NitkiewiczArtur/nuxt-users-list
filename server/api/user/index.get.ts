import {useUserState} from '~/server/userState';

export default defineEventHandler(() => {
  const {get} = useUserState()
  return get()
});
