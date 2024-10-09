import { useGoogleLogin } from '@react-oauth/google';

import { axiosConfig } from '../utils/axiosConfig';

const useGoogleLoginHandler = () => {
  const login = useGoogleLogin({
    scope: 'openid email profile', 
    onSuccess: async (tokenResponse) => {

      console.log('Token Response:', tokenResponse); 
      console.log("id_token:", tokenResponse.id_token);
      try {
        const res = await axiosConfig.post('/auth/google', {
          token: tokenResponse.access_token,
        });
        console.log('Login successful:', res.data);
       
      } catch (error) {
        console.error('Error during Google login:', error);
      }
    },
    onError: () => {
      console.log('Google Login Failed');
    }
  });

  return login;
};

export default useGoogleLoginHandler;
