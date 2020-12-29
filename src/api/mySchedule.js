import Axios from 'axios'
import { URL } from 'constants/config/url'
//import https from 'https'
//const axRejUnauth = Axios.create({
//    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
//    //baseURL: "https://jsonplaceholder.typicode.com/",
//    withCredentials: false,
//    headers: {
//        'Access-Control-Allow-Origin': '*',
//        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//    }
//});

export const newRevision = async ({ curr, revisonNote, revisionDate }) => {
    return await Axios.put(URL.REVIEW, {
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
export const obterRevisionsId = async (location) => { return await Axios.get(`${URL.REVIEW}/${location.state?.categoryId}/${location.state?.item._id}`) }

export const obterScheduleItems = async () => { return await Axios.get(URL.MYSCHEDULE) }

export const obterTemas = async () => { return await Axios.get(URL.TOPIC) }

export const addItem = async ({ filter, content }) => {
    return await Axios.post(URL.ITEM, {
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
    return await Axios.delete(`${URL.ITEM}/${categoryId}/${itemId}`)
}
export const changeItem = async ({ filter, content }) => {
    return await Axios.put(URL.ITEM, {
        filter: filter,
        content: content
    })
}

export const obterNextSchedule = async () => { return await Axios.get(URL.SCHEDULE) }

export const newCategory = async ({ title, description, topicId }) => {
    return await Axios.post(URL.MYSCHEDULE, {
        title: title,
        description: description,
        topicId: topicId
    })
}

export const newTopic = async ({ item, image }) => {
    return await Axios.post(URL.TOPIC, {
        title: item.title,
        description: item.description,
        image: image
    })
}

export const removeTopicId = async ({ topicId }) => {
    return await Axios.delete(URL.TOPIC + '/' + topicId)
}


export const obterAllRevision = async () => { return await Axios.get(URL.REVIEW) }