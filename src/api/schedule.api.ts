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
    })
}

