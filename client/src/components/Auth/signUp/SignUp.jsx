
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useForm } from 'react-hook-form';
import { axiosConfig } from '../../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  AOS.init({
    duration: 1000, 
    delay: 300,     
  });

  const onSubmit = async (data) =>{
    try{
      const  response =  await axiosConfig.post('/auth/register',data)
      toast.success("Registration successful!");
      console.log(response);
      reset(),
      navigate('/login')
      
    } catch(error){

      toast.error(error.response.data?.message || "Registration failed. Please try again.");
     console.log(error);
     
    }

    console.log(data);
  }
  return (
    <>
      <ToastContainer />
      <div  className="relative w-full -mt-[200px] xs:-mt-[400px] bg-cover h-[136vh] bg-[url('/src/assets/images/mainBg.svg')] bg-no-repeat bg-center"
    >
    </div>
     
     <div className='relative flex items-center justify-center -mt-[600px] mb-[100px] mx-[30px]' data-aos="zoom-out" data-aos-delay="500">
     <div className='bg-white rounded-md shadow-lg  max-w-[700px] w-full'>
     <form onSubmit={handleSubmit(onSubmit)} >
        <div className='lg:m-[60px] xl:m-[60px] m-[30px] flex flex-col gap-3'>
           
            <input type='text' placeholder=' First Name*'
            
            {...register("firstName",{
              required:"First Name is Required"
            })}
            
             className='pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
             <div className='text-red-500 '> {errors.firstName?.message}</div>


            <input type='text' placeholder=' Last Name*'
            
            {...register('lastName',{
              required:"Last Name is Required"
            })}
             className='pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
             <div className='text-red-500 '> {errors.lastName?.message}</div>
            <input type='text' placeholder=' Company Name*'
             className='pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
             <div></div>
             
            <input type='email' placeholder=' Email Address*'
            
            {...register("email",{
              required:"Email is Required"
            })}
             className='pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
             <div className='text-red-500'> {errors.email?.message}</div>
             <input type='password' placeholder='Password*'
            
            {...register("password",{
              required:"Password is Required"
            })}
             className='pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
             <div className='text-red-500'> {errors.password?.message}</div>
            <input type='tel' placeholder=' Phone*' className='pl-[24px] py-3 text-[16px] font-[400] font-[Poppins] outline-none border border-black rounded-md focus:border-lightBlue'/>
            <button type='submit' className="w-full py-[15px] text-white bg-blue transition rounded-md  hover:bg-gradient text-[18px] font-[500] font-[Poppins] text-center leading-[20px]">
            Start Your Free Trial
          </button>
          <p className='text-[16px] font-[400] font-[Poppins] max-w-[450px]'>We take security and privacy seriously. By taking a free trial, you agree to our <span className='font-[500]'>terms of use </span>and privacy policy</p>
        </div>
        </form>
      </div>
     </div>

      
    </>
  )
}

export default SignUp
