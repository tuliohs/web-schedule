import Axios from 'axios'
import { URL } from 'constants/config/url'

export const register = async (values) => {
    return await Axios.post(URL.REGISTER, values)
}

export const login = async (values) => {
    return await Axios.post(URL.LOGIN, values)
}
