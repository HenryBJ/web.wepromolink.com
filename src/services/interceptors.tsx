import { User } from "firebase/auth";

export default function AddInterceptors(axiosInstance: any) {

    axiosInstance.interceptors.request.use((config: any) => {
        
        let idToken:string|null = localStorage.getItem('user_wepromolink_idToken');
        let user:User|null = JSON.parse(localStorage.getItem('user_wepromolink')!);
        
        if(user){
            config.headers['X-Wepromolink-UserId'] = user.uid;
        }

        if( !idToken || idToken === "null") return config;
        config.headers.Authorization = `Bearer ${JSON.parse(idToken)}`
        
        return config;
    }, (error: any) => console.log("error ============> ", error));

    axiosInstance.interceptors.response.use((response: any) => {
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