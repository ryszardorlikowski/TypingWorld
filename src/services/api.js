import axios from 'axios'
import tokenManager from '@/services/token'
import router from "@/router";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_ADDRESS,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
})

api.interceptors.request.use(
    request => {
        const accessToken = tokenManager.getAccessToken()
        if (accessToken) {
            request.headers.Authorization = "Bearer " + accessToken;
        }
        return request;
    },
    error => {
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        if (error.response.status === 401 &&
            error.response.code === 'token_not_valid' &&
            originalRequest.url !== 'accounts/login/refresh') {
            const refreshToken = tokenManager.getRefreshToken();
            if (refreshToken) {
                return api
                    .post('accounts/login/refresh', {refresh: refreshToken})
                    .then(({data}) => {
                        tokenManager.setTokens(data.access, data.refresh);
                        return api(originalRequest);
                    })
                    .catch(() => {
                        router.push({name: 'Login'});
                    });
            } else {
                router.push({name: 'Login'});
            }
        }
        return Promise.reject(error);
    }
)


export default {
    login(username, password) {
        return api.post('accounts/login', {
            password,
            username,
        })
    },
    getUserProfile() {
        return api.get('accounts/profile')
    },
    register(username, email, password) {
        return api.post('accounts/register', {
            username,
            email,
            password
        })
    }
}