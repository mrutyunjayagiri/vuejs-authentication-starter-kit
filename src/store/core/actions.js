export const actions = {
    authenticated({commit}, payload) {
        commit('authenticated', payload)
    },
    authenticatedData({commit}, user) {
        commit('setAuthData', user)
    },
    authenticatedToken({commit}, token) {
        commit('setAuthToken', token)
    }
}