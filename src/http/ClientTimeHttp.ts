import axios, { AxiosInstance } from "axios"

const clientHtttp: AxiosInstance = axios.create({
    baseURL: "http://api.openweathermap.org"
})

export default clientHtttp;
