import { URL } from 'constants/config/url'
import { EPagePath } from 'routes'
import api from './api'

export const forkTopic = async (topicId: string) => {
    if (!topicId) return
    return await api.post(URL.TOPICFORK, {
        topicId: topicId
    })
}

export const inputStreamRouter = async (route: EPagePath) => {
    return await api.post(URL.INPUT_STREAM, {
        route: route
    }).catch(e => console.log(e))
}

//MANAGE USERS
export const inputStreamGetAll = async () => {
    return await api.get(URL.INPUT_STREAM)
}


//MANAGE USERS
export const managerUserGetAll = async () => {
    return await api.get(URL.MANAGERUSER)
}

