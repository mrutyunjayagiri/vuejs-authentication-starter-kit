export const mutations = {
    authenticated(state, data) {
        state.authenticated = data
    },
    setAuthData(state, user) {
        state.authenticatedData = user
    },
    setAuthToken(state, token) {
        state.authenticatedToken = token
    }
}