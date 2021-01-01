import { URL } from 'constants/config/url'
import api from './api'

export const getLineReview = async (location) => { return await api.get(URL.CHART + '/linereview') }
