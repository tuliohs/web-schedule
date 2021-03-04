let base = ""
if (process.env.NODE_ENV === "development") {
    base = "http://localhost:9090/api"
    //base = 'https://forgetion.com/api'
    //base = 'http://45.90.108.173:9090/api'
    //base = 'http://45.90.108.173:9096/api'
}
else
    base = 'https://forgetion.com/api'
//base = "http://localhost:9090"

export const URL = {
    BASE: base,
    MYSCHEDULE: `${base}/v1/categorySchedule`,
    PUBLICITEMS: `${base}/v1/schedule/public`,
    REVIEW: `${base}/v1/revision`,
    TOPIC: `${base}/v1/topic`,
    TOPICFORK: `${base}/v1/topic/fork`,
    ITEM: `${base}/v1/categorySchedule/item`,
    SCHEDULE: `${base}/v1/schedule`,
    CHART: `${base}/v1/chart`,
    REGISTER: `${base}/v1/auth/register`,
    LOGIN: `${base}/v1/auth/authenticate`,
    USER: `${base}/v1/auth/user`,
    RECPASS: `${base}/v1/auth/recpass`,
    EMPTY: `${base}/v1/schedule/empty`,
    UPLOAD_TCI: `${base}/v1/file/imptci`,
    INPUT_STREAM: `${base}/v1/schedule/inpstream`,
    FACEBOOK: `${base}/v1/auth/facebook`,
}

