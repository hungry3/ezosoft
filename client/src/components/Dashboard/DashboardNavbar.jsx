import  { useState } from 'react';
import MenuIcon from '/src/assets/images/dashboard-menu-icon.svg';
import Help from '/src/assets/images/dashboard-help-icon.svg';
import Bell from '/src/assets/images/dashbaoard-bell-icon.svg';
import Search from '/src/assets/images/dashboard-search-icon.svg';
import Flag from '/src/assets/images/yahodi-flag.svg';
import Profile from '/src/assets/images/dashbaord-profile-image-navbar.svg';
import useAuth from '../../hooks/useAuth';

const DashboardNavbar = ({ toggleSidebar }) => {
  // State for showing dropdown and selected category
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

 const {auth} =  useAuth();
 const user =  auth?.accessToken?.user
  
  // Handle category selection
  const handleCategorySelect = (event) => {
    const selected = event.target.value;
    setSelectedCategory(selected);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='w-full h-[72px] border-b border-[#D9D9D9] flex items-center justify-between'>
      {/* first div */}
      <div className='flex items-center justify-between'>
        <div className='w-[34px] h-[34px] rounded-full bg-blue flex -ml-[18px] absolute items-center justify-center cursor-pointer' onClick={toggleSidebar}>
          <img src={MenuIcon} alt='menu' className='h-[14px] w-[14px]' />
        </div>

        <div className='flex ml-[90px] gap-4'>
          <img src={Help} alt='help' className='w-[24px] h-[24px]' />
          <img src={Bell} alt='bell' className='w-[24px] h-[24px]' />
        </div>
      </div>

      {/* second div */}
      <div className='flex items-center justify-center '>
        <div className='flex shadow-lg'>
          {/* Categories with select */}
          <div className='flex items-center border-r border-black'>
            <select
              className='px-2 outline-none brder-none'
              onChange={handleCategorySelect}
              value={selectedCategory}
            >
              <option value='' >Categories</option>
              <option value='Documents'>Documents</option>
              <option value='Templates'>Templates</option>
              <option value='Free Templates'>Free Templates</option>
              <option value='Presentation'>Presentation</option>
            </select>
          </div>
          {/* Search bar */}
          <div className='flex items-center h-full'>
            <input
              type='text'
              placeholder='Search By Keywords'
              className='w-[200px] p-2 border-none outline-none'
              value={searchQuery}
              onChange={handleSearchChange} // Update search query
            />
            <div className='w-[40px] h-[40px] bg-blue flex items-center justify-center cursor-pointer'>
              <img src={Search} alt='search' className='w-[30px] h-[30px]' />
            </div>
          </div>
        </div>

        {/* Language and Profile */}
        <div className='ml-[34px] flex items-center justify-center'>
          <p className='font-[Poppins] text-[14px] leading-[21px] font-[500]'>Select Language</p>
          <img src={Flag} alt='flag' className='ml-[7px]' />
          <img src={user? user.avatar || Profile : Profile} alt='profile' className='mx-[17px]' />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;