import Axios from 'axios'
import { URL } from 'constants/config/url'
export const getLineReview = async (location) => { return await Axios.get(URL.CHART + '/linereview') }
