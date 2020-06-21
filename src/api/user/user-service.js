import axios from 'axios'
import { AuthAPI } from '../endpoint'


const login = ({ username, password }) => {
    console.log("Username: ", username, "Password: ", password);
    
    return axios({
        url: AuthAPI.LOGIN_URL,
        method: 'get'

    })
}


export const USER = {
    login
}