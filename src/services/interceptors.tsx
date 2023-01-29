export default function AddInterceptors(axiosInstance: any) {

    axiosInstance.interceptors.request.use((config: any) => {
        const { token } = JSON.parse(localStorage.getItem('user') || "{}")
        let jwt = ""
        if (token) {
            jwt = token
        }
        config.headers.Authorization = `Bearer ${jwt}`
        return config;
    }, (error: any) => console.log("error ============> ", error));

    axiosInstance.interceptors.response.use((response: any) => {
        // console.log(response)
        return response;
    }, (error:any) => {
        console.log("error error ============> ", error)
        if (error?.response?.status === 401) {
            localStorage.clear()
            window.location.href = '/';
        }
        return Promise.reject(error);
    });

    return axiosInstance;
}