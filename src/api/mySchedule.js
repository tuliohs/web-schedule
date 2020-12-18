import Axios from 'axios'
import { url } from 'constants/config/url'
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
    await Axios.put(url.REVIEW, {
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
export const obterRevisionsId = async (location) => { return await Axios.get(`${url.REVIEW}/${location.state?.categoryId}/${location.state?.item._id}`) }

export const obterScheduleItems = async () => { return await Axios.get(url.MYSCHEDULE) }