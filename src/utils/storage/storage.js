import localforage from 'localforage'


// Indexed Db
export const setIndexed = (key, value) => {
    return localforage.setItem(key, value)
}

export const getIndexed = async (key) => {
    return localforage.getItem(key)
}

export const clearIndexed = () => {
    localforage.clear()
}


// Session
export const setSession = (key, value) => {
    sessionStorage.setItem(key, value)
}
// Retrieve
export const getSession = (key) => {
    return sessionStorage.getItem(key)
}

export const getSessionUser = () => {
    return {
        name: getSession('name'),
        email: getSession('email'),
        phone: getSession('phone'),
        
    }
}

// Logged Out
export const clearSession = () => {
    sessionStorage.clear()
}