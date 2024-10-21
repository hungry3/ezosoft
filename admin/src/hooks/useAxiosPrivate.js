// import { useNavigate } from "react-router-dom";
// import { axiosConfig } from "../utils/axiosConfig";
// import useAuth from "./useAuth";
// import useRefreshToken from "./useRefreshToken";
// import { useEffect } from "react";

// const useAxiosPrivate = () => {


//      const navigate = useNavigate()
//     const refresh = useRefreshToken();
//     const { auth } = useAuth();
//     console.log(auth,"auth is jsdo cnvp ");
    
//     useEffect(() => {
     

//         // const requestIntercept = axiosConfig.interceptors.request.use(
//         //     (config) => {
              
//         //         if (!config.headers['Authorization']) {
//         //             config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
//         //             console.log("Using Access Token:", auth.accessToken?.accessToken);
//         //         }
//         //         return config;
//         //     },
//         //     (error) => {
//         //         console.error("Request Interceptor Error:", error);
//         //         navigate('/login')
//         //         return Promise.reject(error);
//         //     }
//         // );
              

//         const requestIntercept = axiosConfig.interceptors.request.use(
//             (config) => {
//                 if (auth?.accessToken) { // Add a null check here
//                     if (!config.headers['Authorization']) {
//                         config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
//                         console.log("Using Access Token:", auth.accessToken);
//                     }
//                 } else {
//                     console.warn("Access token is not available");
//                 }
//                 return config;
//             },
//             (error) => {
//                 console.error("Request Interceptor Error:", error);
//                 navigate('/login');
//                 return Promise.reject(error);
//             }
//         );



//         const responseIntercept = axiosConfig.interceptors.response.use(
//             (response) => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 console.log("Response Interceptor Error: ", error?.response);
                
//                 // Handle token refresh on 403 errors
//                 if (error?.response?.status === 401 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     console.log("Attempting to Refresh Token...");

//                     try {
//                         const newAccessToken= await refresh(); 
//                         console.log("New Access Token:", newAccessToken);
//                         const token = newAccessToken.accessToken

//                         prevRequest.headers['Authorization'] = `Bearer ${token}`;
//                         return axiosConfig(prevRequest);
//                     } catch (refreshError) {
//                         console.error("Failed to Refresh Token: ", refreshError);
//                         navigate('/login')
//                         return Promise.reject(refreshError);
//                     }
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axiosConfig.interceptors.request.eject(requestIntercept);
//             axiosConfig.interceptors.response.eject(responseIntercept);
//         };
//     }, [auth?.accessToken, refresh,navigate]);

//     return axiosConfig;
// };

// export default useAxiosPrivate;
import { useNavigate } from 'react-router-dom';
import { axiosConfig } from '../utils/axiosConfig';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';
import { useEffect } from 'react';

const useAxiosPrivate = () => {
    const navigate = useNavigate();
    const refresh = useRefreshToken();  
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const requestIntercept = axiosConfig.interceptors.request.use(
            async (config) => {
                if (!config.headers['Authorization']) {
                    try {
                   
                        if (!auth?.accessToken) {
                            const newAccessToken = await refresh();  
                            setAuth((prev) => ({
                                ...prev,
                                accessToken: newAccessToken
                            }));
                        }
                        config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                    } catch (err) {
                        console.error("Error getting access token:", err);
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosConfig.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    try {
                        const newAccessToken = await refresh();
                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosConfig(prevRequest);
                    } catch (refreshError) {
                        console.error("Token refresh failed, redirecting to login:", refreshError);
                        setAuth(null);
                        navigate('/login');
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosConfig.interceptors.request.eject(requestIntercept);
            axiosConfig.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh, navigate]);

    return axiosConfig;
};

export default useAxiosPrivate;


