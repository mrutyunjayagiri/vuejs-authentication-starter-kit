import axios from 'axios'
import cookies from 'js-cookie'

import {hostname} from '../config/config'
import {removeAxiosAuthToken, setAxiosAuthToken} from '../utils/auth/auth'



axios.defaults.baseURL = hostname

const token = cookies.get('access-token')

if (token != null) {
    setAxiosAuthToken(token)
} else {
    removeAxiosAuthToken()
}