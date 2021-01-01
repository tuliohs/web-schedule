import { URL } from 'constants/config/url'
import api from './api'

export const newRevision = async ({ curr, revisonNote, revisionDate }) => {
    return await api.put(URL.REVIEW, {
        filter: {
            categoryId: curr.categoryId,
            itemId: curr.itemId
        },
        content: {
            note: revisonNote,
            revisionDate: revisionDate
        }
    })
}
export const obterRevisionsId = async (location) => { return await api.get(`${URL.REVIEW}/${location.state?.categoryId}/${location.state?.item._id}`) }

export const obterScheduleItems = async ({ userId }) => { return await api.get(URL.MYSCHEDULE + '/' + userId) }

export const obterTemas = async ({ userId }) => { return await api.get(URL.TOPIC + '/' + userId) }

export const addItem = async ({ filter, content }) => {
    return await api.post(URL.ITEM, {
        filter: {
            categoryId: filter.categoryId,
            //itemId: curr.itemId
        },
        content: {
            title: content.title,
            description: content.description
        }
    })
}
export const removeItem = async ({ categoryId, itemId }) => {
    return await api.delete(`${URL.ITEM}/${categoryId}/${itemId}`)
}
export const changeItem = async ({ filter, content }) => {
    return await api.put(URL.ITEM, {
        filter: filter,
        content: content
    })
}

export const obterNextSchedule = async () => { return await api.get(URL.SCHEDULE) }

export const newCategory = async ({ title, description, topicId }) => {
    return await api.post(URL.MYSCHEDULE, {
        title: title,
        description: description,
        topicId: topicId
    })
}

export const newTopic = async ({ item, image, userId }) => {
    return await api.post(URL.TOPIC, {
        title: item.title,
        description: item.description,
        image: image,
        userId: userId
    })
}

export const removeTopicId = async ({ topicId }) => {
    return await api.delete(URL.TOPIC + '/' + topicId)
}


export const obterAllRevision = async () => { return await api.get(URL.REVIEW) }