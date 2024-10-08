import Logo from '/src/assets/images/ES-logo-login.svg'
import Google from '/src/assets/images/google.svg'
import { useForm } from 'react-hook-form';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { NavLink } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { axiosConfig } from '../../../utils/axiosConfig';
import useAuth from '../../../hooks/useAuth';
import useGoogleLoginHandler from '../../../hooks/useGoogleLogin';




const LoginPage = () => {
  AOS.init({
    duration: 1000, 
    delay: 300,     
  });

 const navigate = useNavigate()
//  const axiosPrivate = useAxiosPrivate()
  const login = useGoogleLoginHandler();
const {setAuth} = useAuth()
const {register,handleSubmit,formState:{errors},reset} = useForm()
const onSubmit = async(data)=>{
 
try {
  
  const response = await axiosConfig.post("/auth/login",data)
  

  const accessToken = response?.data
  // const user = response?.data?.user
  setAuth({ accessToken });
  toast.success("Login Successful");
  reset()
  navigate('/dashboard')
  
  
} catch (error) {
  toast.error(error?.response?.data?.message );
  
  console.log("error.message>>>>>>>>>>>>>",error?.response?.data?.message); 
  
}
  
  
}

  return (
    <>
      <ToastContainer />
      <div
        className="relative w-full -mt-[200px] bg-cover h-[136vh] bg-[url('/src/assets/images/mainBg.svg')] bg-no-repeat bg-center"
      >
      </div>
      <div className='items-center justify-center -mt-[600px] mb-[100px]'   data-aos="zoom-out" data-aos-delay="400">
    <div className='flex items-center justify-center'>
      {/* Login Card */}
      <div className="relative z-10 bg-white  rounded-lg p-8   max-w-[550px] w-[100%] shadow-custom ">
        {/* Logo */}
        <div className="mt-[71px] text-center flex flex-col justify-center items-center">
          <img src={Logo} alt="Logo" className="mx-auto" />
          <h2 className="text-[24px] leading-[26px] font-[Poppins] font-[600] mt-[20px]">Welcome</h2>
          <p className="mt-2 text-[16px]  leading-[24px] font-[Poppins] font-[400] max-w-[370px] flex justify-center items-center">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint
          </p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4 mt-[24px]">
          <input
          id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full px-4 py-3 font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue"
          />
          <div className='text-red-500 '>{errors.email && <p>{errors.email.message}</p>}</div>
          <input
            type="password"
            placeholder="Enter your password"
            {
              ...register("password",{
                required:"Password is required",
                minLength:{
                  value:6,
                  message:"Password must be at least 6 characters"
                }
              })
            }
            className="w-full px-4 py-3 font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue"
          />
           <div className='text-red-500 '>{errors.password && <p>{errors.password.message}</p>}</div> 
          <div className="flex justify-end">
            <NavLink to="/forgot" className="text-sm text-[#6F7187]">Forgot Password</NavLink>
          </div>
          <button type='submit'  className="w-full py-3 text-white transition rounded-md bg-blue hover:bg-gradient">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center justify-between my-4">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <p className="text-sm text-[14px] leading-[20px] font-[Poppins] font-[400]">Or sign in with</p>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>
          </div>
          </form>
          {/* Google Sign-in */}
          <button className="flex items-center justify-center w-full py-2 transition border border-gray-300 rounded-md hover:bg-gray-100 cursor " onClick={login}>
            <img src={Google} alt="Google" loading='lazy' className="w-5 h-5 mr-2" />
            <span className='text-[16px] leading-[20px] font-[Poppins] font-[500]'> Google</span>
          </button>

          {/* Signup */}
          <p className="mt-4 text-center text-[14px] leading-[20px] font-[Poppins]">
            Don’t have an account? <NavLink to="/signup"  className='font-[600]'> Sign Up </NavLink>
          </p>
       
      </div>
    </div>
    

  </div>

    </>
  );
};

export default LoginPage;




