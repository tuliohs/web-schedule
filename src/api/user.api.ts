import api from './api'
import { URL } from 'constants/config/url'

export type TUser = {
    firstName?: string,
    lastName?: string,
    email?: string,
    emailRepeat?: string,
    password?: string,
    passwordRepeat?: string,
    phone?: string,
    address?: string,
    city?: string,
    country?: string,
    postalCode?: string,
    about?: string,
    education?: string,
    occupation?: string,
    imageData?: string,
    resetPass?: boolean
}

export const register = async (values: TUser) => {
    return await api.post(URL.REGISTER, values)
}

export const login = async (values: TUser) => {
    return await api.post(URL.LOGIN, values)
}

export const getUser = async () => {
    return await api.get(URL.USER)
}

export const changeUser = async (values: TUser) => {
    return await api.put(URL.USER, values)
}

export const recoveryPass = async (values: TUser) => {
    return await api.post(URL.RECPASS, values)
}