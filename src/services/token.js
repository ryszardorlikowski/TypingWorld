//check if token is valid
function isValid(token) {
    if (token === undefined || token === null) {
        return false
    }
    const tokenParts = JSON.parse(atob(token.split('.')[1]));
    const now = Math.ceil(Date.now() / 1000);
    return tokenParts.exp > now;
}

export default {
    setTokens(accessToken, refreshToken) {
        if (accessToken && refreshToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        }
    },

    getAccessToken() {
        const accessToken = localStorage.getItem('accessToken')
        if (!isValid(accessToken)) {
            localStorage.removeItem('accessToken')
            return null;
        }
        return accessToken;
    },
    getRefreshToken() {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!isValid(refreshToken)) {
            localStorage.removeItem('refreshToken')
            return null;
        }
        return refreshToken;
    }

}