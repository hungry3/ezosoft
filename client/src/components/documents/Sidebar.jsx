import React, { useState } from 'react'
import Logo from '/src/assets/images/sidebar-logo-ezosoft.svg'
import DashboardIcon from '/src/assets/images/dashboard-icon.svg'
import TemplateIcon from '/src/assets/images/template-icon.svg'
import DocumentIcon from '/src/assets/images/document-icon.svg'
import PresentationIcon from '/src/assets/images/presentation-icon.svg'
import SettingIcon from '/src/assets/images/setting-icon.svg'

function Sidebar() {
  const [active, setActive] = useState('Documents');
  const handleClick = (tab) => {
    setActive(tab);
  };

  return (
    <>
      <div className='border-r h-[100vh] flex flex-col gap-[50px] transition-all duration-300 ease-in-out 
        lg:max-w-[250px] xl:max-w-[250px] md:max-w-[150px] max-w-[60px]'>
        
        {/* Logo Section */}
        <div className='flex items-center justify-center'>
          <img src={Logo} alt='Ezosoft' loading='lazy' className='mt-[24px] w-[40px] lg:w-auto' />
        </div>

        {/* Menu Items */}
        <div className='flex flex-col items-start gap-2'>
          
          {/* Dashboard Item */}
          <div className={`flex items-center gap-2 py-[14px] px-[20px] lg:px-[30px] rounded-md 
            ${active === 'Dashboard' ? "bg-lightBlue" : ""}`} onClick={() => handleClick('Dashboard')}>
            <img src={DashboardIcon} alt='dashboard' className='w-[20px] h-[20px]' />
            <h2 className='text-[16px] font-bold hidden lg:block'>Dashboard</h2>
          </div>

          {/* Templates Item */}
          <div className={`flex items-center gap-2 py-[14px] px-[20px] lg:px-[30px] rounded-md 
            ${active === 'Templates' ? "bg-lightBlue" : ""}`} onClick={() => handleClick('Templates')}>
            <img src={TemplateIcon} alt='templates' className='w-[20px] h-[20px]' />
            <h2 className='text-[16px] font-bold hidden lg:block'>Templates</h2>
          </div>

          {/* Documents Item */}
          <div className={`flex items-center gap-2 py-[14px] px-[20px] lg:px-[30px] rounded-md 
            ${active === 'Documents' ? "bg-lightBlue" : ""}`} onClick={() => handleClick('Documents')}>
            <img src={DocumentIcon} alt='documents' className='w-[20px] h-[20px]' />
            <h2 className='text-[16px] font-bold hidden lg:block'>Documents</h2>
          </div>

          {/* Presentation Item */}
          <div className={`flex items-center gap-2 py-[14px] px-[20px] lg:px-[30px] rounded-md 
            ${active === 'Presentation' ? "bg-lightBlue" : ""}`} onClick={() => handleClick('Presentation')}>
            <img src={PresentationIcon} alt='presentation' className='w-[20px] h-[20px]' />
            <h2 className='text-[16px] font-bold hidden lg:block'>Presentation</h2>
          </div>

          {/* Settings Item */}
          <div className={`flex items-center gap-2 py-[14px] px-[20px] lg:px-[30px] rounded-md 
            ${active === 'Settings' ? "bg-lightBlue" : ""}`} onClick={() => handleClick('Settings')}>
            <img src={SettingIcon} alt='settings' className='w-[20px] h-[20px]' />
            <h2 className='text-[16px] font-bold hidden lg:block'>Settings</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar;
