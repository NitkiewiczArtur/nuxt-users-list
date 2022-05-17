import {CompatibilityEvent} from 'h3';
import {useUserState} from '~/server/userState';
import {User} from '~/models/user';
import {validateModel} from '~/server/validateModel';

export default defineEventHandler(async (event: CompatibilityEvent) => {
    const body = await useBody<Partial<User>>(event)
    const bodyValidation = await validateModel(body);
    if (bodyValidation === true) {
        const {post} = useUserState()
        return post(body as User)
    } else {
        event.res.statusCode = bodyValidation.statusCode
        event.res.statusMessage = bodyValidation.statusMessage
        event.res.end();
    }
});
