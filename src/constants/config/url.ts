let base = ""
if (process.env.NODE_ENV === "development") {
    base = "http://localhost:9090"
    //base = 'http://45.90.108.173:9090'
}
else
    base = 'http://45.90.108.173:9090'

export const URL = {
    BASE: base,
    MYSCHEDULE: `${base}/v1/categorySchedule`,
    REVIEW: `${base}/v1/revision`,
    TOPIC: `${base}/v1/topic`,
    ITEM: `${base}/v1/categorySchedule/item`,
    SCHEDULE: `${base}/v1/schedule`,
    CHART: `${base}/v1/chart`,
    REGISTER: `${base}/v1/auth/register`,
    LOGIN: `${base}/v1/auth/authenticate`,
    USER: `${base}/v1/auth/user`,
    RECPASS: `${base}/v1/auth/recpass`,
    EMPTY: `${base}/v1/schedule/empty`,
}

