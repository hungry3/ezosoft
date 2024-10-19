import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig'; 
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const SingleUser = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosPrivate.get(`/admin/user/${id}`);
        console.log("Response>>>>>>>>>", response);
        setUser(response?.data?.data); 
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/allUsers'); 
      }
    };

    fetchUser();
  }, [id, navigate]);

  return (
    <div className='flex flex-col w-full bg-[#F9F9F9]'>
      <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px]'>
        <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>User Details</h2>

        <div className='flex flex-col md:flex-row lg:flex-row xl:flex-row w-[100%] gap-[20px] mt-[30px]'>
          <div className='flex flex-col lg:w-[30%] xl:w-[30%] md:w-[40%] w-[90%]'>
            <div className='h-[263px] border-2 border-[#293950] border-dashed rounded-lg bg-[#E7E8F1] flex items-center justify-center'>
              {user?.avatar ? (
                <img src={user.avatar} alt='User Avatar' className='object-cover w-full h-full rounded-lg' />
              ) : (
                <p>No avatar available</p>
              )}
            </div>
          </div>

          <div className='flex flex-col w-full lg:w-[60%]'>
            {/* First Name */}
            <div className='flex flex-col'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>First Name</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.firstName || 'N/A'}
              </p>
            </div>

            {/* Last Name */}
            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Last Name</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.lastName || 'N/A'}
              </p>
            </div>

            {/* Email */}
            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Email</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.email}
              </p>
            </div>

            {/* Company Name */}
            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Company Name</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.companyName || 'N/A'}
              </p>
            </div>

            {/* Phone */}
            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Phone</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.phone || 'N/A'}
              </p>
            </div>

            {/* Role */}
            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Role</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.role}
              </p>
            </div>

            {/* Subscription Status */}
            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Subscription Status</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.subscriptionStatus || 'N/A'}
              </p>
            </div>

            {/* Subscription Plan */}
            <div className='flex flex-col mt-[20px]'>
              <p className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Subscription Plan</p>
              <p className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'>
                {user?.subscriptionPlan?.name || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
