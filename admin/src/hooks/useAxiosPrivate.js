import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../utils/axiosConfig";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

const useAxiosPrivate = () => {


     const navigate = useNavigate()
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    console.log(auth,"auth is jsdo cnvp ");
    
    useEffect(() => {
      
        if (!auth) {
            console.log("No valid access token, attempting to refresh...");
            refresh()
                .then((newToken) => {
                    console.log("Token refreshed successfully:", newToken);
                })
                .catch((err) => {
                    console.error("Token refresh failed:", err);
                    navigate('/login')
                });
            return;
        }

        const requestIntercept = axiosConfig.interceptors.request.use(
            (config) => {
              
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                    console.log("Using Access Token:", auth.accessToken?.accessToken);
                }
                return config;
            },
            (error) => {
                console.error("Request Interceptor Error:", error);
                navigate('/login')
                return Promise.reject(error);
            }
        );

        const responseIntercept = axiosConfig.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log("Response Interceptor Error: ", error?.response);
                
                // Handle token refresh on 403 errors
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    console.log("Attempting to Refresh Token...");

                    try {
                        const newAccessToken= await refresh(); 
                        console.log("New Access Token:", newAccessToken);
                        const token = newAccessToken.accessToken

                        prevRequest.headers['Authorization'] = `Bearer ${token}`;
                        return axiosConfig(prevRequest);
                    } catch (refreshError) {
                        console.error("Failed to Refresh Token: ", refreshError);
                        navigate('/login')
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosConfig.interceptors.request.eject(requestIntercept);
            axiosConfig.interceptors.response.eject(responseIntercept);
        };
    }, [auth?.accessToken, refresh]);

    return axiosConfig;
};

export default useAxiosPrivate;
