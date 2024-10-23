// import React, { useState } from 'react'
import Logo from '/src/assets/images/Dashboard-Ezosoft-Logo.svg'
import Profile from '/src/assets/images/dashboard-profile.svg'
import ComputerIcon from '/src/assets/images/dashboard-computer-icon.svg'
import DocumentIcon from '/src/assets/images/dashboard-document-icon.svg'
import Icon from '/src/assets/images/dashboard-forward-arrow.svg'
import PresentaionIcon from '/src/assets/images/dashboard-presentation-icon.svg'
import TemplateIcon from '/src/assets/images/dashboard-template-icon.svg'
import FreeTemplate from '/src/assets/images/dashboard-free-template-icon.svg'
import RecentlyAdded  from '/src/assets/images/dashboard-recenety-added-icon.svg'
import sun from '/src/assets/images/light-on-sun-black-outline-21617.svg'
import moon from '/src/assets/images/moon-6686.svg'
import useAuth from '../../hooks/useAuth'
function Sidebar2({setActiveContent,toggleDarkMode,isDarkMode}) {
  // const [activeTab, setActiveTab] = useState(null)
    const Data =[
        {id:1 ,icon: ComputerIcon, alt: 'Dashboard' ,text: 'Lorem Ipsum' },
        { id:2 ,icon: ComputerIcon, alt: 'Dashboard' ,text: 'Lorem Ipsum' },
        {id:3 ,icon: ComputerIcon, alt: 'Dashboard' ,text: 'Lorem Ipsum' },
        {id:4 ,icon: ComputerIcon, alt: 'Dashboard' ,text: 'Lorem Ipsum' },
        {id:5 ,icon: ComputerIcon, alt: 'Dashboard' ,text: 'Lorem Ipsum' },
        {id:6 ,icon: ComputerIcon, alt: 'Dashboard' ,text: 'Lorem Ipsum' },
       
    ]


    const {auth} =useAuth()

    // console.log("console auth>>>>>>>>>>>", auth.accessToken.user);

     const user =  auth?.accessToken?.user
    

    const handleToggleDarkMode = () => {
      toggleDarkMode();
    };  
  return (
    <>
      <div className='relative max-w-[281px] w-full  min-h-screen bg-grey flex flex-col justify-between'>
            <div className='mx-[22px] flex flex-col'>
            <img src={ user? user?.avatar ||Logo : Logo} alt='EZOSOFT' className='mt-[26px] w-[157px] h-[30px]'/>
            <div className='mt-[16px] w-full border border-[#A3A3A3] '></div>
            <div className='flex mt-[21px] gap-[13px]'>
                    <div className='w-[56px] h-[56px] border-[4px] border-[white] rounded-full '>
                   <img src={Profile} alt='profile' className='h-[50px] w-[50px] object-cover'/>
                    </div>
                    <div className='flex flex-col'>
                        <h2 className='font-[Poppins] text-[16px] leading-[24px] font-normal text-white'>Welcome!</h2>
                        <h2 className='font-[Poppins] text-[16px] leading-[24px] font-normal text-white'>{`${user? user?.firstName :"Jhon"}`|| "Sarah Alley"}</h2>
                    </div>

            </div>
            <div className='mt-[18px] w-full border border-[#A3A3A3] '></div>
            <div className='mt-[14px] font-[Poppins] text-[20px] leading-[30px] font-semibold text-white'>Dashboard</div>
            <div className='mt-[13px] w-full border border-[#A3A3A3] '></div>

         
           <div className='mx-[4px] mt-[16px] flex flex-col gap-[11px]'>
           {Data.map((Items) => 
           <div key={Items.id} className='flex justify-start items-center gap-[28px]'>
           <img src={Items.icon} alt={Items.alt}/>
           <h2 className='font-[Poppins] text-[16px] leading-[24px] font-[500] text-white'>{Items.text}</h2>
        
           </div>

           )}
           </div>



            <div className='mt-[25px] font-[Poppins] text-[20px] leading-[30px] font-semibold text-white'>Resources</div>
            <div className='mt-[13px] w-full border border-[#A3A3A3] '></div>

         <div className='flex flex-col  gap-[11px]'>
         <div className='flex  mt-[16px] items-center justify-start cursor-pointer' onClick={()=>setActiveContent('documents')}>
            <img src={ DocumentIcon } alt='document' className='w-[18px] h-[18px]'/>
            <h2 className='ml-[28px] font-[Poppins] text-[16px] leading-[24px] font-[500] text-white'>Documents</h2>
            <img src={Icon} alt='forward icon' className='ml-[46px]'/>
            <div className='ml-[15px] px-2 py-1 rounded bg-[#FF3B30] text-white text-center font-[Poppins]  text-[9px]'>New</div>
         </div>

         <div className='flex  mt-[11px] items-center justify-start cursor-pointer' onClick={()=>setActiveContent('presentation')}>
            <img src={ PresentaionIcon } alt='document'/>
            <h2 className='ml-[28px] font-[Poppins] text-[16px] leading-[24px] font-[500] text-white'>Presentation</h2>
            <img src={Icon} alt='forward icon' className='ml-[37px]'/>
           
         </div>


         <div className='flex mt-[11px] items-center justify-start cursor-pointer' onClick={()=>setActiveContent('Templates')}>
            <img src={ TemplateIcon } alt='document'/>
            <h2 className=' ml-[28px] font-[Poppins] text-[16px] leading-[24px] font-[500] text-white'>Templates</h2>
            <img src={Icon} alt='forward icon' className='ml-[53px]'/>
            
         </div>
         <div className='flex  mt-[11px] items-center justify-start cursor-pointer' onClick={()=>setActiveContent('free')}>
            <img src={ FreeTemplate} alt='document'/>
            <h2 className='ml-[28px] font-[Poppins] text-[16px] leading-[24px] font-[500] text-white text-nowrap'>Free Templates</h2>
            <img src={Icon} alt='forward icon' className='ml-[20px]'/>
            <div className='ml-[15px] px-2 py-1 rounded bg-[#34C759] text-white text-center font-[Poppins]  text-[9px]'>New</div>
         </div>
         <div className='flex mt-[16px] items-center justify-start cursor-pointer'>
            <img src={ RecentlyAdded} alt='document'/>
            <h2 className='ml-[28px] font-[Poppins] text-[16px] leading-[24px] font-[500] text-white text-nowrap'>Recently Added</h2>
            <img src={Icon} alt='forward icon' className='ml-[13px]'/>
            <div className='ml-[15px] py-1 px-2 rounded bg-[#FF3B30] text-white text-center font-[Poppins] text-[9px]'>New</div>
         </div>

         </div>
            </div>

            {/* light and Dark mode */}
            <div className='flex justify-center my-[43px]'>
                <div className='relative w-[81px] h-[31px] bg-darkGrey rounded-2xl cursor-pointer' onClick={handleToggleDarkMode}>
                    <div className={`absolute w-[30px] h-[30px] rounded-full transition-all duration-300 ${isDarkMode ? 'right-0 bg-[#FFE86E]' : 'left-0 bg-[#FFFAE0]'}`}></div>
                    {isDarkMode ? (
                        <img src={sun} alt="Sun" className='absolute w-6 h-6 transform -translate-y-1/2 left-1 top-1/2' />
                    ) : (
                        <img src={moon} alt="Moon" className='absolute w-6 h-6 transform -translate-y-1/2 right-1 top-1/2' />
                    )}
                </div>
            </div>







      </div>
    </>
  )
}

export default Sidebar2
