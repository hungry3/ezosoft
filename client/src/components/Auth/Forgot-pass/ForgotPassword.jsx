import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosConfig } from '../../../utils/axiosConfig';
import { useState } from 'react';
import { SyncLoader } from 'react-spinners';

function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  AOS.init({
    duration: 1000,
    delay: 300,
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosConfig.post('/auth/forgot-password', data);
      toast.success("Password reset link sent to your email.");
      reset(); 
      
      console.log(response);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset link. Please try again.");
      console.log(error);
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <ToastContainer />
      <div className="relative w-full -mt-[200px] xs:-mt-[400px] bg-cover h-[136vh] bg-[url('/src/assets/images/mainBg.svg')] bg-no-repeat bg-center">
      </div>

      <div className='relative flex items-center justify-center -mt-[600px] mb-[100px] mx-[30px]' data-aos="zoom-out" data-aos-delay="500">
        <div className='bg-white rounded-md shadow-lg max-w-[700px] w-full'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='lg:m-[60px] xl:m-[60px] m-[30px] flex flex-col gap-6'>

              <h2 className="text-[24px] font-bold text-center">Forgot Password</h2>

              <input 
                type='email' 
                placeholder='Email Address*'
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
                className='pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'
              />
              <div className='text-red-500'> {errors.email?.message}</div>

              <button type='submit' className="w-full py-[15px] text-white bg-blue transition rounded-md hover:bg-gradient text-[18px] font-[500] font-[Poppins] text-center leading-[20px]">
              {isSubmitting ?<SyncLoader color='#BFE4FE'/> : ' Send Reset Link'}     
              </button>

              <p className='text-[16px] font-[400] font-[Poppins] text-center'>{"We'll send a password reset link to your email."}</p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
