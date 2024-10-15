import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { axiosConfig } from '../../utils/axiosConfig'; 

const EditSingleUser = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    phone: '',
    role: '',
    subscription: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosConfig.get(`/admin/user/${id}`);
        setUserData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user details');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosConfig.put(`/admin/update-user/${id}`, userData);
      console.log('User updated:', response.data);
      navigate('/user'); 
    } catch (error) {
      setError('Error updating user');
      console.error(error);
    }
  };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

  return (
    <div className='flex flex-col w-full bg-[#F9F9F9]'>
      <div className='lg:m-[40px] xl:m-[40px] md:m-[20px] bg-white border rounded-md px-[10px] py-[30px] lg:px-[40px] xl:px-[40px] md:px-[40px]'>
        <h2 className='text-[20px] leading-[30px] font-[500] font-[Poppins]'>Edit User</h2>

        <form className='mt-[30px]' onSubmit={handleSubmit}>
          <div className='flex flex-col mb-[20px]'>
            <label className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>First Name</label>
            <input
              type='text'
              name='firstName'
              value={userData.firstName}
              onChange={handleInputChange}
              className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'
              required
            />
          </div>

          <div className='flex flex-col mb-[20px]'>
            <label className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Last Name</label>
            <input
              type='text'
              name='lastName'
              value={userData.lastName}
              onChange={handleInputChange}
              className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'
              required
            />
          </div>

          <div className='flex flex-col mb-[20px]'>
            <label className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Email</label>
            <input
              type='email'
              name='email'
              value={userData.email}
              onChange={handleInputChange}
              className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'
              required
            />
          </div>

          <div className='flex flex-col mb-[20px]'>
            <label className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Company Name</label>
            <input
              type='text'
              name='companyName'
              value={userData.companyName}
              onChange={handleInputChange}
              className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'
            />
          </div>

          <div className='flex flex-col mb-[20px]'>
            <label className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Phone</label>
            <input
              type='text'
              name='phone'
              value={userData.phone}
              onChange={handleInputChange}
              className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'
            />
          </div>

          <div className='flex flex-col mb-[20px]'>
            <label className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Role</label>
            <select
              name='role'
              value={userData.role}
              onChange={handleInputChange}
              className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>

          <div className='flex flex-col mb-[20px]'>
            <label className='text-[14px] leading-[21px] font-[Poppins] font-[400]'>Subscription</label>
            <select
              name='subscription'
              value={userData.subscription}
              onChange={handleInputChange}
              className='mt-[4px] px-[10px] py-[10px] rounded-md bg-[#F9F9F9] outline-none border border-[#D9D9D9] text-[14px] font-[Poppins]'
            >
              <option value='free'>Free</option>
              <option value='basic'>Basic</option>
              <option value='premium'>Premium</option>
              <option value='custom'>Custom</option>
            </select>
          </div>

          <button type='submit' className='mt-[20px] px-[20px] py-[10px] bg-[#293950] text-white rounded-md'>
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSingleUser;
