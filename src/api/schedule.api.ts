import { URL } from 'constants/config/url'
import api from './api'

export const forkTopic = async (topicId: string) => {
    console.log(topicId, 'topicId')
    if (!topicId) return
    return await api.post(URL.TOPICFORK, {
        topicId: topicId
    })
}

