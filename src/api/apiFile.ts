import api from './api'
import { URL } from 'constants/config/url'

//(data: (form?: HTMLFormElement | undefined) => FormData) 
export const uploadTCI = (data: any) => {
    console.log(data)
    return api.post(URL.UPLOAD_TCI, data, {
        //headers: {
        //    "content-type": "multipart/form-data"
        //}
    })
}