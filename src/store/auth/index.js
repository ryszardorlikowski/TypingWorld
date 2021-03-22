import authActionsType from '@/store/auth/actions.type'
import authMutationsType from '@/store/auth/mutations.type'
import api from '@/services/api'
import tokenManager from '@/services/token'

export default {
    namespaced: false,
    state: {
        user: null,
        isUserLoggedIn: false,
    },
    actions: {
        [authActionsType.LOGIN]({dispatch}, credential) {
            return new Promise(((resolve, reject) => {
                api.login(credential.username, credential.password)
                    .then(({data}) => {
                        tokenManager.setTokens(data.access, data.refresh)
                        dispatch(authActionsType.GET_USER_PROFILE);
                        resolve()
                    })
                    .catch(error => {
                        reject(error)
                    })
            }))
        },
        [authActionsType.GET_USER_PROFILE]({commit}) {
            return new Promise((((resolve, reject) => {
                api.getUserProfile()
                    .then(({data}) => {
                        commit(authMutationsType.SET_USER, data)
                        resolve()
                    }).catch(error => {
                        reject(error)
                })

            })))
        }

    },
    mutations: {
        [authMutationsType.SET_USER](state, userData){
            state.user = userData;
            state.isUserLoggedIn = true;
        }
    }
}