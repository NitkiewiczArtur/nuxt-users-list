import {createLogger, createStore} from 'vuex'

const debug = process.env.NODE_ENV !== "production";

export const store = createStore({
    state: {
        error: null,
        loading: 0
    },
    getters: {
        isLoading: (state) => state.loading > 0
    },
    mutations: {
        SET_ERROR(state, error) {
            state.error = error
        },
        START_LOADING: state => state.loading++,
        FINISH_LOADING: state => state.loading--,
    },
    actions: {
        SET_ERROR({commit}, error) {
            commit('SET_ERROR', error)
        },
        START_LOADING({commit}) {
            commit('START_LOADING')
        },
        FINISH_LOADING({commit}) {
            commit('FINISH_LOADING')
        }
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})
