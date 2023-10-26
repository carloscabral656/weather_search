import axios, { AxiosInstance } from "axios"

const clientTimeHttp: AxiosInstance = axios.create({
    baseURL: "http://api.timezonedb.com"
})

export default clientTimeHttp;
