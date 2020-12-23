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

export const newRevision = async ({ curr, revisonNote }) => {
    //console.log('cursor', curr)
    await Axios.put(URL.REVIEW, {
        filter: {
            categoryId: curr.categoryId,
            itemId: curr.itemId
        },
        content: {
            note: revisonNote,
            revisionDate: "01-01-2021"
        }
    })
        .then(c => { console.log(c.data) })
        .catch(e => console.log("err", e))
}
export const obterRevisionsId = async (location) => { return await Axios.get(`${URL.REVIEW}/${location.state?.categoryId}/${location.state?.item._id}`) }

export const obterScheduleItems = async () => { return await Axios.get(URL.MYSCHEDULE) }

export const obterTemas = async () => { return await Axios.get(URL.TOPIC) }

export const addItem = async ({ filter, content }) => {
    //console.log('cursor', curr)
    await Axios.post(URL.ITEM, {
        filter: {
            categoryId: filter.categoryId,
            //itemId: curr.itemId
        },
        content: {
            title: content.title,
            description: content.description
        }
    })
        .then(c => { console.log(c.data) })
        .catch(e => console.log("err", e))
}
export const removeItem = async ({ categoryId, itemId }) => {
    //console.log('cursor', curr)
    await Axios.delete(`${URL.ITEM}/${categoryId}/${itemId}`)
        .then(c => { console.log(c.data) })
        .catch(e => console.log("err", e))
}