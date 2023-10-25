import axios, { AxiosInstance } from "axios";

const clientCountryHttp: AxiosInstance = axios.create({
    baseURL: "https://restcountries.com/v3"
});

export default clientCountryHttp;