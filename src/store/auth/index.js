import authActionsType from '@/store/auth/actions.type'
import authMutationsType from '@/store/auth/mutations.type'
import apiClient from '@/services/api'
import tokenManager from '@/services/token'

export default {
    namespaced: true,
    state: {
        userData: null,
        isLoggedIn: false,
    },
    actions: {
        [authActionsType.LOGIN]({dispatch}, credential) {
            return new Promise((resolve, reject) => {
                apiClient.login(credential.username, credential.password)
                    .then(({data}) => {
                        tokenManager.setTokens(data.access, data.refresh);
                        dispatch(authActionsType.GET_USER_PROFILE);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        },
        [authActionsType.GET_USER_PROFILE]({commit}) {
            return new Promise((resolve, reject) => {
                apiClient.getUserProfile()
                    .then(({data}) => {
                        commit(authMutationsType.SET_USER, data);
                        resolve();
                    }).catch(error => {
                    reject(error);
                })
            })
        }

    },
    mutations: {
        [authMutationsType.SET_USER](state, userData) {
            state.userData = userData;
            state.isLoggedIn = true;
        }
    },
    getters: {
        getUserData(state) {
            return state.userData;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        }
    }
}