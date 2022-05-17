import {CompatibilityEvent} from 'h3';
import {useUserState} from '~/server/userState';

export default defineEventHandler((event: CompatibilityEvent) => {
  const {remove} = useUserState()
  const userIndex = +event.context.params.id
  const isRemoved = remove(userIndex);
  if(isRemoved) {
    event.res.end();
  } else {
    event.res.statusCode = 404;
    event.res.statusMessage = 'User not found';
    event.res.end();
  }
});
