import axios from 'axios'
import cookies from 'js-cookie'

import store from '../../store/index'
import router from '../../router/index'

import { getSessionUser, getSession, getIndexed, clearIndexed, clearSession } from '../storage/storage'

export const setAxiosAuthToken = (token) => {
    cookies.set('access-token', token)
    axios.defaults.headers.common['access-token'] = token
}
export const removeAxiosAuthToken = () => {
    cookies.remove('access-token')
    delete axios.defaults.headers.common['access-token']
}

/// Handle Router Authentication
export const autoAuthenticate = () => {
    // For Defining Global Routing Controll
    console.log("State: Auto Authenticated");

    router.beforeEach(async (to, from, next) => {
        if (to.fullPath == '/login') {
            if (await isAuthenticated()) {
                next('/home')
            } else {
                next()
            }

        } else {
            if (to.meta.requiresAuth) {
                // Authenticated Route
                console.log("It is also protected Route")
                if (await isAuthenticated()) {
                    // If User Is Logged IN
                    console.log("Authenticated")

                    next()
                } else {
                    // If User Is not Logged In
                    next('/login')
                }

            } else {
                // Un Authenticated Routes
                // You may redirect to login page
                console.log("Un Authenticated Routes");
                
                next()
            }
        }
    })
}

async function isAuthenticated() {
    let auto = false
    // Check authData on Vue Store
    if (store.getters.authenticated && store.getters.authenticatedToken != null) return true

    // Check On Indexed Db
    console.log("Reading Data in BROWSER")
    await getIndexed('authData').then(res => {

        const token = cookies.get('access-token')
        const isUserOnSession = getSession('isUserLoggedIn')

        console.log("Reading Response: ", res);
        console.log("Cookies Access Token: ", token);
        
        

        if (res == null || token == null) {
            // User is not logged in currently
            console.log("User is not logged in currently")
            auto = false
            reset()

        } else if (res != null && token != null) {
            // User is Logged In
            console.log("User is logged In")

            // Updating Data to Store
            store.dispatch("authenticated", true)
            store.dispatch("authenticatedToken", token)
            store.dispatch("authenticatedData", res)

            // setting Axios Token
            setAxiosAuthToken(token)
            auto = true
        } else if (isUserOnSession) {

            console.log("User is On Session")
            // Updating Data to Store
            store.dispatch("authenticated", true)
            store.dispatch("authenticatedToken", token)
            store.dispatch("authenticatedData", getSessionUser())

            // setting Axios Token
            setAxiosAuthToken(token)
            auto = true
        }
    }).catch(e => {
        console.log("Errro caught in Authenticating: ", e)
        reset()

        auto = false
    })
    auto ? console.log(`%cAuthenticated User`,
        "font-weight: bold; color: white; background: green; padding: 35px;"
    ) : console.log(`%cUnAuthenticated User`,
        "font-weight: bold; color: white; background: red; padding: 35px;"
    )

    return auto
}

const reset = () => {
    removeAxiosAuthToken()
    clearSession()
    clearIndexed()
}