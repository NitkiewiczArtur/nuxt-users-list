import {CompatibilityEvent} from 'h3';
import {useUserState} from '~/server/userState';
import {User, WithId} from '~/models/user';
import {validateModel} from '~/server/validateModel';

export default defineEventHandler(async(event: CompatibilityEvent) => {
  const body = await useBody<Partial<WithId<User>>>(event)
  const bodyValidation = await validateModel(body);
  if(bodyValidation === true) {
    const {put} = useUserState()
    put(body as WithId<User>)
  } else {
    event.res.statusCode = bodyValidation.statusCode
    event.res.statusMessage = bodyValidation.statusMessage
  }
  return body;
});
