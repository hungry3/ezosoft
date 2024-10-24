import  { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/Logo.svg'
import useAuth from '../hooks/useAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {auth} = useAuth()
  console.log(("auth", auth));
  AOS.init({
    duration: 1000, 
    delay: 200,     
  }); 
  
  return (
    <nav className="bg-none px-4 lg:px-[100px] xl:px-[100px] md:px-[10px] pt-12 relative z-[20] w-[100%] ">
      <div className=" flex items-center justify-between w-[100%]">
       
        <div className="flex-shrink-0">
          <NavLink to="/" className="text-2xl font-bold text-gray-800">
        <img src={logo} alt='logo' width={"100%"} height={"100%"} loading='lazy' />
          </NavLink>
        </div>

       
        <div className="hidden lg:flex justify-between items-center w-[60%] ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-cyanDark font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
           Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
               isActive ? "text-cyanDark  font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
          About Us
          </NavLink>
          <NavLink
            to="/resources"
            className={({ isActive }) =>
               isActive ? "text-cyanDark  font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Resources
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
               isActive ? "text-cyanDark  font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Blogs
          </NavLink>
        

          <NavLink
            to="/pricing"
            className={({ isActive }) =>
                isActive ? "text-cyanDark  font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
               isActive ? "text-cyanDark  font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Contact Sales
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
               isActive ? "text-cyanDark  font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
           Login
          </NavLink>
         
        </div>
        <NavLink to="/signup" >
        <div className="hidden lg:flex">
          <button className="bg-grey  hover:bg-gradient hover:border border-white text-white px-4 py-2 font-[600] rounded-md hover:bg- font-[Poppins]">
          Start Free Trial
          </button>
        </div>
        </NavLink>
        

        

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className='text-white'>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={!isOpen ? 'M4 6h16M4 12h16m-7 6h7' : 'M6 18L18 6M6 6l12 12'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
  className={`absolute z-10 top-18 left-0 flex flex-col w-full p-4 space-y-3 pl-[50px] rounded-md shadow-2xl lg:hidden bg-gradient transform   ${isOpen ? 'animate-slideIn' : 'hidden'}`}
      data-aos="fade-down-left" data-aos-delay="10"
         >
          <NavLink
            to="/"
            className={({ isActive }) =>
             isActive ? "text-cyanDark , font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
             isActive ? "text-cyanDark , font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            About Us
          </NavLink>
         
          <NavLink
            to="/resources"
            className={({ isActive }) =>
              isActive ? "text-cyanDark , font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Resources
          </NavLink>
        
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? "text-cyanDark , font-[Poppins] font-[600]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) =>
              isActive ? "text-cyanDark , font-[Poppins]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Pricing
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-cyanDark , font-[Poppins]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Contact Sales
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-cyanDark , font-[Poppins]" : "text-white hover:text-cyanDark , font-[Poppins]"
            }
          >
            Login
          </NavLink>
          <NavLink to="/signup">
        <div className=" sm:flex-shrink-0">
          <button className="bg-grey  hover:bg-gradient hover:border border-white text-white px-4 py-2 font-[600] rounded-md hover:bg- font-[Poppins]">
          Start Free Trial
          </button>
        </div>
        </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
