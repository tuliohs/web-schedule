import { URL } from 'constants/config/url'
import api from './api'
import Types from 'mongodb'

type TCurrentId = {
    categoryId?: string,
    itemId?: string,
    topicId?: string,
}
type TItem = {
    _id: string,
    id: string,
    title: string,
    description: string,
}
type TImagem = {
    name: string,
    data: string,
}

export const newRevision = async function (curr: TCurrentId, revisonNote: string, revisionDate: string) {
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
export const obterRevisionsId = async (location: any) => {
    return await api.get(`${URL.REVIEW}/${location.state?.categoryId}/${location.state?.item._id}`)
}

export const obterScheduleItems = async () => { return await api.get(URL.MYSCHEDULE) }

export const obterTemas = async () => { return await api.get(URL.TOPIC) }

export const addItem = async (filter: TCurrentId, content: TItem) => {
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
export const removeItem = async (categoryId: string, itemId: string) => {
    return await api.delete(`${URL.ITEM}/${categoryId}/${itemId}`)
}
export const changeItem = async (filter: TCurrentId, content: TItem) => {
    return await api.put(URL.ITEM, {
        filter: filter,
        content: content
    })
}

export const obterNextSchedule = async () => { return await api.get(URL.SCHEDULE) }

export const newCategory = async (item: TItem, image: TImagem, topicId: string) => {

    return await api.post(URL.MYSCHEDULE, {
        title: item?.title,
        description: item?.description,
        topicId: topicId,
        image: image
    })
}

export const removeCategoryId = async (categoryId: string) => {
    return await api.delete(URL.MYSCHEDULE + '/' + categoryId)
}

export const editCategory = async (item: TItem, image: TImagem) => {
    return await api.put(URL.MYSCHEDULE, {
        _id: item._id,
        title: item.title,
        description: item.description,
        image: image
    })
}

export const newTopic = async (item: TItem, image: TImagem) => {
    return await api.post(URL.TOPIC, {
        title: item.title,
        description: item.description,
        image: image
    })
}

export const removeTopicId = async (topicId: string) => {
    return await api.delete(URL.TOPIC + '/' + topicId)
}

export const editTopic = async (item: TItem, image: TImagem) => {
    return await api.put(URL.TOPIC, {
        _id: item._id,
        title: item.title,
        description: item.description,
        image: image
    })
}

export const obterAllRevision = async () => { return await api.get(URL.REVIEW) }

export const obterEmpty = async () => { return await api.get(URL.EMPTY) }