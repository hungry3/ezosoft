import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SyncLoader } from 'react-spinners';
import { axiosConfig } from '../../../utils/axiosConfig';

function ResetPassword() {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize AOS only once when component mounts
  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 300,
    });
  }, []);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axiosConfig.post(`/auth/reset-password/${token}`, {
        password: data.password
      });

      toast.success("Password reset successfully!");
      console.log(response);
      navigate('/login'); 

    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password. Please try again.");
      console.log(error);
    }

    setIsSubmitting(false);
  };

  return (
    <>
       <ToastContainer />
      <div className="relative w-full -mt-[200px] xs:-mt-[400px] bg-cover h-[136vh] bg-[url('/src/assets/images/mainBg.svg')] bg-no-repeat bg-center">
      </div>
     

      <div className='relative flex items-center justify-center -mt-[600px] mb-[300px] mx-[30px]' data-aos="zoom-out" data-aos-delay="500">
        <div className='bg-white rounded-md shadow-lg max-w-[700px] w-full'>
          <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-[24px] pt-[20px] font-bold text-center">Reset Password</h2>
            <div className="lg:m-[60px] xl:m-[60px] m-[30px] flex flex-col gap-6">

              {/* Password field */}
              <input
                type="password"
                placeholder="New Password*"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                })}
                className="pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue"
              />
              <div className="text-red-500">{errors.password?.message}</div>

              {/* Confirm Password field */}
              <input
                type="password"
                placeholder="Confirm Password*"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                className="pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue"
              />
              <div className="text-red-500">{errors.confirmPassword?.message}</div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-[15px] text-white bg-blue transition rounded-md hover:bg-gradient text-[18px] font-[500] font-[Poppins] text-center leading-[20px]"
                disabled={isSubmitting}
              >
                {isSubmitting ? <SyncLoader color='#BFE4FE' /> : 'Reset Password'}
              </button>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
