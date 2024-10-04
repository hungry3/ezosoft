import { axiosConfig } from "../utils/axiosConfig";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    console.log("useAuth returned:", auth);

    useEffect(() => {
        // If auth is null, do nothing and skip axios setup
        if (auth === null) {
            refresh()
            console.log("No auth found, skipping axios setup.");
            return;
        }

        // If access token is not valid, refresh the token
        if (!auth?.accessToken) {
            console.log("No valid access token, attempting to refresh...");
            refresh()
                .then((newToken) => {
                    console.log("Token refreshed successfully:", newToken);
                })
                .catch((err) => {
                    console.error("Token refresh failed:", err);
                });
            return;
        }

        const requestIntercept = axiosConfig.interceptors.request.use(
            (config) => {
                // Attach Authorization header if not already present
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                    console.log("Using Access Token:", auth.accessToken);
                }
                return config;
            },
            (error) => {
                console.error("Request Interceptor Error:", error);
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
                        const newAccessToken = await refresh(); 
                        console.log("New Access Token:", newAccessToken);

                        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosConfig(prevRequest);
                    } catch (refreshError) {
                        console.error("Failed to Refresh Token: ", refreshError);
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
