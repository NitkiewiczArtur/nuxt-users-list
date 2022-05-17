import {User, WithId} from "~/models/user";
import axios from "axios";
import {store} from "~/store";

const USER_ENDPOINT = '/api/user'

const axiosInstance = axios.create({
    baseURL: USER_ENDPOINT,
});

const handleError = async (error: Error) => {
    await store.dispatch('FINISH_LOADING')
    await store.dispatch('SET_ERROR', error)
}

axiosInstance.interceptors.request.use(async (config) => {
    await store.dispatch('START_LOADING')
    return config;
}, handleError);
axiosInstance.interceptors.response.use(async (response) => {
    await store.dispatch('FINISH_LOADING')
    return response;
}, handleError);

export const updateUser = async (user: WithId<User>) => {
    try {
        const updatedUser = await axiosInstance.put(String(user.id), user)
        return updatedUser
    } catch (e) {
        console.log(`Error when trying to update user:${e}`)
    }
}
export const createUser = async (user: User) => {
    try {
        const createdUser = await axiosInstance.post('', user)
        return createdUser
    } catch (e) {
        console.log(`Error when trying to create user:${e}`)
    }
}
export const deleteUser = async (userId: number) => {
    try {
        const response = await axiosInstance.delete(String(userId))
        return response.status == 200
    } catch (e) {
        console.log(`Error when trying to delete user:${e}`)
    }
}
