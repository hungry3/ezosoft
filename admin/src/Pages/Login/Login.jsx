
import { useForm } from 'react-hook-form';
import logo from '/src/assets/images/ES-logo-login.svg'
import { ToastContainer, toast } from 'react-toastify';
import { axiosConfig } from '../../utils/axiosConfig';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useLoginMutation } from '../../Redux/Auth/authApi';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { isLoading,error }] = useLoginMutation();
const navigate = useNavigate()
  const {setAuth,auth} =  useAuth()
  console.log(auth);
  

  const onSubmit = async (data) => {
    try {
      const result = await login(data).unwrap(); 

      const { accessToken, user } = result;
      console.log("result",result)
      if (user && user.role === 'admin') {
        setAuth({  accessToken, user  });
        toast.success("Login Successful");
        navigate('/');
      } else {
        toast.error("Access denied: Admins only");
      }
    } catch (error) {
      //  console.log("error is ",error?.data?.message)
      if (error.data) {
        const errorMessage = error.data.message || "Login failed. Please try again.";
        toast.error(errorMessage); 
      } else {
        // console.log(error);
        toast.error("An error occurred. Please try again."); 
      }
    }
  };
  return (
    <>
        <ToastContainer />
    
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-lg max-w-[500px] w-full"
      >
      <div className='flex items-center justify-center m-3'>

      <img src={logo} alt="logo" className=''/>
      </div>
    
        <h2 className="mb-6 text-2xl text-center">Login</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Enter a valid email address',
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
            })}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          {errors.password && (
            <p className="text-xs italic text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white rounded bg-blue hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
           {isLoading ? "Logging in..." : "Login"}
            {/* Login */}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default Login;
