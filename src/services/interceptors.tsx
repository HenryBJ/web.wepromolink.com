'use client'
import { getAuth, User } from "firebase/auth";
import axios from "axios";

const isBrowser = typeof window !== "undefined";

export default function AddInterceptors(axiosInstance: any) {

    axiosInstance.interceptors.request.use(
        async (config: any) => {
            if(isBrowser){
                let rawToken = localStorage.getItem("user_wepromolink_idToken")!;
                let idToken: string | null = rawToken ? JSON.parse(rawToken) : null;
                const user: User | null = JSON.parse(localStorage.getItem("user_wepromolink")!);
    
                if (user) {
                    config.headers["X-Wepromolink-UserId"] = user.uid;
                }
    
                if (!idToken || idToken === "null") return config;
                config.headers.Authorization = `Bearer ${idToken}`;
            }
            return config;
            
        },
        (error: any) => {
            console.log("error ============> ", error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response: any) => {
            return response;
        },
        async (error: any) => {
            if (error?.response?.status === 401) {
                try {

                    const auth = getAuth(); // Obtén la instancia de autenticación de Firebase                    
                    const newAccessToken = await auth.currentUser?.getIdToken(true);
                    newAccessToken && localStorage.setItem("user_wepromolink_idToken", JSON.stringify(newAccessToken));
                    console.log(`token refresh: ${newAccessToken}`);

                    // Repetir la solicitud original con el nuevo token
                    const originalRequest = error.config;
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axios(originalRequest);
                } catch (refreshError) {
                    console.log("Error al refrescar el token: ", refreshError);
                    localStorage.clear();
                    window.location.href = "/";
                }
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
}
