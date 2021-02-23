import axios from 'axios'
import storage from 'utils/storage'

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


const api = axios.create({
  //baseURL: 'http://localhost:9090',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  timeout: process.env.NODE_ENV !== "development" ? 10 * 1000 : null
})

api.interceptors.response.use(
  response => {
    // Do something with response data

    return response
  },
  error => {
    //console.log('error', error)

    // Do something with response error

    // You can even test for a response code
    // and try a new request before rejecting the promise
    //if (error?.toString()?.includes('timeout')) {
    //  return Promise.reject("O tempo da solicitação foi esgotado, tente novamente")
    //}
    if (error?.toString()?.includes('Network') ||
      (error.request._hasError === true &&
        error.request._response.includes('connect'))
    ) {
      return Promise.reject('Não foi possível conectar aos nossos servidores, sem conexão a internet')
    }

    if (error.response?.status === 401) {
      //const requestConfig = error.config

      // O token JWT expirou
      storage.remove('token')
      window.location.href = "/auth/login"

      return Promise.reject("Sessão expirada, faça login novamente")

      //return axios(requestConfig)
    }
    //Reject para que caa no bloco catch
    return Promise.reject(error.response.data.message)
  },
)

api.interceptors.request.use(
  config => {
    const token = storage.get('token')
    config.headers.Authorization = `Bearer ${token}`
    config.headers.language = storage.get('lng')
    return Promise.resolve(config)
  },
  error => {
    return Promise.reject(error)
  },
)

export default api