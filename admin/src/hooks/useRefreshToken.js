// import { useNavigate } from 'react-router-dom';
// import { axiosConfig } from '../utils/axiosConfig';
// import useAuth from './useAuth';

// const useRefreshToken = () => {
//     const { setAuth } = useAuth();
//    const navigate = useNavigate()
//     const refresh = async () => {
//         try {
//             const response = await axiosConfig.post('/auth/refresh-token', {
//                 withCredentials: true
//             });

//             console.log("Refresh token response:", response.data);
//             if(response.status === 200){
//                 setAuth(prev => {
//                     return { 
//                         ...prev, 
//                         accessToken: response.data  
//                     };
//                 });
    
//                 return response.data.accessToken;
//             }
//             else{
//                 // throw new Error("Refresh token failed");
//                 navigate('/login')
//                 return null;
//             }
         
            
//         } catch (error) {
            
//             navigate('/login')
//             console.error("Failed to refresh token:", error);

          
//             if (error?.response?.status === 401) {
//                 navigate('/login')
//                 console.log("Refresh token invalid or expired, logging out...");
//                 setAuth(null);
//                 return null;
//             }
//         }
//     };

//     return refresh;
// };

// export default useRefreshToken;

import { useNavigate } from 'react-router-dom';
import { axiosConfig } from '../utils/axiosConfig';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            const response = await axiosConfig.post('/auth/refresh-token', { withCredentials: true });
            console.log("Refresh token response:", response.data);

            if (response.status === 200) {
                setAuth((prev) => ({
                    ...prev,
                    accessToken: response.data.accessToken,
                }));

                return response.data.accessToken;
            } else {
                throw new Error("No valid refresh token, redirecting to login.");
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);

            if (error?.response?.status === 401) {
                setAuth(null);
                navigate('/login');  
            }

            return null;
        }
    };

    return refresh;
};

export default useRefreshToken;
