import {store} from "~/store";

export default function useFetchUsers() {
    const {data: users, pending, error, refresh: refreshUsers} = useFetch('/api/user')
    watch(pending, async newPending => {
        if (newPending) {
            await store.dispatch("START_LOADING")
        } else {
            await store.dispatch("FINISH_LOADING")
        }
    })
    watch(error, async newError => {
        if (error) {
            await store.dispatch("SET_ERROR", newError)
        } else {
            await store.dispatch("SET_ERROR", null)
        }
    })
    return {
        users,
        refreshUsers
    }
}
