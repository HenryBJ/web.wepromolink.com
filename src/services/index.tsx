import axios from "axios";

export const apiRequest = axios.create({
    baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
})

// export const apiRequest = AddInterceptors(axios.create({
//     baseURL: process.env.REACT_APP_API_URL_WEPROMOLINK
// }))