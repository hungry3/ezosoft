
import Logo from '/src/assets/images/footer-logo.svg'
import Location from '/src/assets/images/footer-location-icon.svg'
import Email from '/src/assets/images/footer-email-icon.svg'
import Phone from '/src/assets/images/footer-phone-icon.svg'
import FacebookIcon from '/src/assets/images/footer-f-icon.svg'
import TwitterIcon from '/src/assets/images/footer-twiter-icon.svg'
import BeIcon from '/src/assets/images/footer-Be-icon.svg'
import YoutubeIcon from '/src/assets/images/footer-youtube-icon.svg'
import { NavLink } from 'react-router-dom'

function Footer() {
  const handleAdressClick= () => {
    const googleAdress = 'https://www.google.com/maps/dir//53,+Hamza+Heights,+Quaid+Block+Commercial+Bahria+Town,+Lahore,+Punjab+53720/@31.3571671,74.0957588,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3918556553908173:0xdb5d673cc5dc9441!2m2!1d74.1781601!2d31.3571934?entry=ttu&g_ep=EgoyMDI0MDkxOC4xIKXMDSoASAFQAw%3D%3D'

    window.open(googleAdress,'blank')
  }
  
  return (
    <>
      <div className='w-full bg-grey pb-[100px] pt-[46px]'>
        <div className='mx-[20px] md:mx-[50px] lg:mx-[100px] xl:[150px]  flex flex-wrap flex-row justify-between gap-[50px]'>
        <div className='flex flex-col '>
            <img src={Logo} alt='f-logo' className='w-[180px] h-[50px]' loading='lazy'/>
            <p className='mt-[58px] text-white max-w-[386px] text-[16px] leading-[26px] font-[400] pb-[30px] font-[Poppins]'>Contrary to popular belief, Lorem Ipsum is simply random text. It has roots in a piece classical Latin literature from 45 BC, makingit over 2000 years old.Contrary to popular belief.</p>
         
         {/* Icons */}

            <div className='flex flex-wrap items-center justify-start gap-[14px]'>
         {/* 1st iconn */}
              <div className='relative h-[50px] w-[50px] shadow-2xl flex items-center justify-center  bg-[#FFFFFF1A] cursor-pointer'>
                <img src={FacebookIcon} alt='facebook' loading='lazy' />
              </div>

              {/* twitter icon */}
              <div className='relative h-[50px] w-[50px] shadow-2xl flex items-center justify-center  bg-[#FFFFFF1A] cursor-pointer'>
                <img src={TwitterIcon} alt='facebook' loading='lazy'/>
              </div>
              {/* DE icon */}
              <div className='relative h-[50px] w-[50px] shadow-2xl flex items-center justify-center  bg-[#FFFFFF1A] cursor-pointer'>
                <img src={BeIcon} alt='facebook' loading='lazy'/>
              </div>
              {/* Youtube icon */}
              <div className='relative h-[50px] w-[50px] shadow-2xl flex items-center justify-center  bg-[#FFFFFF1A] cursor-pointer'>
                <img src={YoutubeIcon} alt='facebook' loading='lazy' />
              </div>
           
           
            </div>



        </div>

          {/* second div */}
          <div className='flex flex-col'>
        <p className=' text-white text-[20px] leading-[20px] font-[600] font-[Poppins]'>Quick Links</p>
        <div className='flex flex-col mt-[23px] gap-[11px]'>
            <NavLink to="/"
             className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>
             Home</NavLink>
            <NavLink to="/about" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>About Us</NavLink>
            <NavLink to="/template" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>Templates</NavLink>
            <NavLink to="/pricing" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>Pricing</NavLink>
            <NavLink to="/contact" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>Contact Sales</NavLink>
        </div>
        </div>

  {/* 3rd div */}
  <div className='flex flex-col'>
        <NavLink to="#" className=' text-white text-[20px] leading-[20px] font-[600] font-[Poppins]'>Helps & Support</NavLink>
        <div className='flex flex-col mt-[23px] gap-[11px]'>
            <NavLink to="/contactsupport" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>Contact Support</NavLink>
            <NavLink to="/contact" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>Contact Sales</NavLink>
            <NavLink to="/privacy" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>Privacy</NavLink>
            <NavLink to="/Knowledge" className='text-[16px] leading-[28px] font-[Poppins] font-[400] text-white hover:text-cyan'>Knowledge Base</NavLink>

        </div>
        </div>


  {/* 4th div */}
  <div className='flex flex-col'>
        <p className=' text-white text-[20px] leading-[20px] font-[600] font-[Poppins]'>Get in touch</p>
        <div className='flex flex-col mt-[23px] gap-[11px]'>
            <div className='flex items-center justify-center gap-3 cursor-pointer' onClick={handleAdressClick}>
                <img src={Location} alt='location' loading='lazy'/>
                <p className='max-w-[227px] text-[16px] leading-[26px] font-[Poppins] font-[400] text-white'>Flat 20, Reynolds Neck, North
                Helenaville, FV77 8WS</p>
            </div>

            <div className='flex items-center justify-start gap-3'>
                <img src={Email} alt='email' loading='lazy'/>
                
                <a href={`mailto:${"themexriver@gmail.com"}`} className='max-w-[227px] text-[16px] leading-[26px] font-[Poppins] font-[400] text-white'>themexriver@gmail.com</a>
            </div>

            <div className='flex items-center justify-start gap-3'>
        <img src={Phone} alt='phone' loading='lazy' />
         {/* Clickable Phone Number */}
        <a href='tel:+23055873407' className='max-w-[227px] text-[16px] leading-[26px] font-[Poppins] font-[400] text-white'>
                     +2(305) 587-3407
          </a>
       </div>

           
        </div>
        </div>

        </div>
        
      </div>
    </>
  )
}

export default Footer
