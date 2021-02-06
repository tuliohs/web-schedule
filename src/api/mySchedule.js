import { URL } from 'constants/config/url'
import api from './api'
import { stateToHTML } from 'draft-js-export-html';

export const newRevision = async ({ curr, revisonNote, revisionDate }) => {

    let note = stateToHTML(revisonNote.getCurrentContent())
    return await api.put(URL.REVIEW, {
        filter: {
            categoryId: curr.categoryId,
            itemId: curr.itemId
        },
        content: {
            note: note,
            revisionDate: revisionDate
        }
    })
}
export const obterRevisionsId = async (location) => { return await api.get(`${URL.REVIEW}/${location?.categoryId}/${location?.itemId}`) }

export const obterScheduleItems = async () => { return await api.get(URL.MYSCHEDULE) }

export const obterTemas = async () => { return await api.get(URL.TOPIC) }

export const addItem = async ({ filter, content }) => {
    return await api.post(URL.ITEM, {
        filter: {
            categoryId: filter.categoryId,
            //itemId: curr.itemId
        },
        content: content
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

export const newCategory = async ({ item, image, topicId }) => {

    return await api.post(URL.MYSCHEDULE, {
        title: item?.title,
        description: item?.description,
        topicId: topicId,
        image: image
    })
}

export const removeCategoryId = async ({ categoryId }) => {
    return await api.delete(URL.MYSCHEDULE + '/' + categoryId)
}

export const editCategory = async ({ item, image }) => {
    return await api.put(URL.MYSCHEDULE, {
        element: item,
        image: image
    })
}

export const newTopic = async ({ item, image }) => {
    return await api.post(URL.TOPIC, {
        title: item.title,
        description: item.description,
        image: image
    })
}

export const removeTopicId = async ({ topicId }) => {
    return await api.delete(URL.TOPIC + '/' + topicId)
}

export const editTopic = async ({ item, image }) => {
    return await api.put(URL.TOPIC, {
        _id: item._id,
        title: item.title,
        description: item.description,
        image: image
    })
}

export const obterAllRevision = async () => { return await api.get(URL.REVIEW) }

export const obterEmpty = async () => { return await api.get(URL.EMPTY) }