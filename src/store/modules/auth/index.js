import { USER } from '../../../api/user/user-service'
import { setSession, setIndexed, clearIndexed, clearSession } from '../../../utils/storage/storage'

import {errorHandler} from '../../../utils/handler'
import {setAxiosAuthToken} from '../../../utils/auth/auth'


export default {
    state: {
        userResponse: {}
    },
    actions: {
        async onLogin({ commit }, authData) {


            await USER.login(authData).then(async response => {

                let responseBody = response.data
                console.log(responseBody);
                
                if (responseBody['status'] == 'success' && responseBody['token']) {
                    // Updating Root Store
                    commit('authenticated', true)
                    commit('setAuthData', responseBody['payload'])
                    commit('setAuthToken', responseBody['token'])
                    commit('LOGIN_SUCCESS', responseBody['payload'])

                    // Set Axios Token
                    setAxiosAuthToken(responseBody['token'])


                    // Save To Browser Storage
                     if (authData.autoLogin) {
                        await setIndexed("authData", responseBody['payload']).then(value => {
                            console.log("Successfully Store in Database: ", value)
                        
                        }).catch(err => {
                            console.log("Failed To Save In Database: ", err)
                            commit('LOGIN_FAILED', { status: 'IndexedDbError', errorMessage: 'Failed to Save' + err })
                        })

                    } else {
                        // Save On Session
                        setSession("isUserLoggedIn", true)
                        setSession("token", responseBody['token'])
                        setSession("status", responseBody['status'])
                        setSession("name", responseBody['payload']['name'])
                        setSession("email", responseBody['payload']['email'])
                        setSession("user_type", responseBody['payload']['user_type'])
                    }

                } else {
                    console.log("Invalid Credentials: ", response.data);
                    commit('LOGIN_FAILED', errorHandler(response.data))

                }

            }).catch(error => {
                console.log(error);
                commit('LOGIN_FAILED', errorHandler(error))
            })

        },
        onLoggedOut({commit}) {
            commit('authenticated', false)
            commit('setAuthData', null)
            commit('setAuthToken', null)
            commit('LOGGED_OUT')

            clearSession()
            clearIndexed()

        }

    },
    mutations: {
        LOGGED_OUT(state) {
            state.userResponse = null
        },
        LOGIN_SUCCESS(state, payload) {

            state.userResponse.user = payload
        },
        LOGIN_FAILED(state, { status, errorMessage }) {
            console.log(status, errorMessage);
            state.userResponse.error = { status, errorMessage }

        }
    },
    getters: {
        userResponse(state) {
            return state.userResponse
        }
    }
}