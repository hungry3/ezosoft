import axios from 'axios';

const useFacebookLoginHandler = () => {
  const responseFacebook = async (response) => {
    try {
      if (response.accessToken) {
        const res = await axios.post('/api/auth/facebook', { accessToken: response.accessToken });
        console.log('Login successful:', res.data);
     
      } else {
        console.error('Facebook login failed: No access token.');
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  };

  return responseFacebook;
};

export default useFacebookLoginHandler;




// import useFacebookLoginHandler from './useFacebookLoginHandler';
// import FacebookLogin from 'react-facebook-login';

// const ButtonComponent = () => {
//   const login = useFacebookLoginHandler();

//   return (
//     <FacebookLogin
//       appId="YOUR_FACEBOOK_APP_ID"
//       fields="name,email,picture"
//       callback={login}
//     />
//   );
// };