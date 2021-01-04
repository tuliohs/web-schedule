import api from './api'
import { URL } from 'constants/config/url'

export const register = async (values) => {
    return await api.post(URL.REGISTER, values)
}

export const login = async (values) => {
    return await api.post(URL.LOGIN, values)
}

export const getUser = async () => {
    return await api.get(URL.USER)
}

export const changeUser = async (values) => {
    return await api.put(URL.USER, values)
}