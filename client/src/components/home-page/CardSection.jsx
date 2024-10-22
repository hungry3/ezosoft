import SettingsIcon from "/src/assets/images/settingicon.svg";
import ReportingIcon from "/src/assets/images/reporting.svg";
import HelpIcon from "/src/assets/images/support.svg";
import AOS from 'aos';
import 'aos/dist/aos.css';
function CardSection() {
  AOS.init({
    duration: 1000, 
    delay: 300,     
  }); 
  return (
    <>
      <div className="w-full h-full lg:py-[100px] xl:py-[100px] md:py-[70px] py-[50px] flex-wrap flex items-center justify-center gap-[50px]">
        <div className="w-[272px] h-[323px] bg-gradient rounded-md flex flex-col items-center justify-center">
          {/* 1st card */}

          <div className=" py-[100px] flex-wrap flex items-center justify-center gap-[50px]"  >
            <div className="w-[272px] h-[323px] bg-gradient shadow-custom3 rounded-md flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer" data-aos="fade-up-right" data-aos-delay="400" >
              {/* 1st card */}
              <div className="text-white text-center text-[24px] leading-[28px] font-semibold mx-[20px]">
                A Perfect Grow on Fast Software For Your Business
              </div>
            </div>
          </div>
        </div>
        {/* second Card */}
        <div className="w-[272px] h-[323px] shadow-custom3 rounded-md flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient cursor-pointer group" data-aos="fade-up-left" data-aos-delay="400" >
          <div className="mx-[40px] mt-[40px]">
            <img
              src={SettingsIcon}
              
              alt="Settings"
              className="w-[65px] h-[65px] transition-transform transform hover:rotate-12"
            />
          </div>
          <p className="mx-[40px] mt-[20px] max-w-[200px] font-semibold text-[24px] leading-[26px] expo-medium text-gray-800 transition-colors group-hover:text-white">
            Easy To Manage
          </p>
          <p className="mx-[40px] mt-[15px] font-[Poppins] text-[14px] leading-[26px] font-[400] text-gray-600 transition-colors group-hover:text-gray-200">
            Lorem Ipsum is that it a more-or-less normal as distribution letters
            using opposed to using
          </p>
        </div>

        {/* thirs Card */}
        <div className="w-[272px] h-[323px] shadow-custom3 rounded-md flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient cursor-pointer group" data-aos="fade-down-right" data-aos-delay="400">
          <div className="mx-[40px] mt-[40px]">
            <img
              src={ReportingIcon}
              alt="Reporting"
              className="w-[65px] h-[65px] transition-transform transform hover:rotate-12"
              loading="lazy"
             
            />
          </div>
          <p className="mx-[40px] mt-[20px] max-w-[200px] font-semibold text-[24px] leading-[26px] expo-medium text-gray-800 transition-colors group-hover:text-white">
            Daily Reporting
          </p>
          <p className="mx-[40px] mt-[15px] font-[Poppins] text-[14px] leading-[26px] font-[400] text-gray-600 transition-colors group-hover:text-gray-200">
            Lorem Ipsum is that it a more-or-less normal as distribution letters
            using opposed to using
          </p>
        </div>

        {/* fourth Card */}
        <div className="w-[272px] h-[323px] shadow-custom3 rounded-md flex flex-col items-start transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient cursor-pointer group" data-aos="fade-down-left" data-aos-delay="400">
          <div className="mx-[40px] mt-[40px]">
            <img
              src={HelpIcon}
              alt=""
              className="w-[65px] h-[65px] transition-transform transform hover:rotate-12"
            />
          </div>
          <p className="mx-[40px] mt-[20px] max-w-[200px] font-semibold text-[24px] leading-[26px] expo-medium text-gray-800 transition-colors group-hover:text-white">
            24/7 Support
          </p>
          <p className="mx-[40px] mt-[15px] font-[Poppins] text-[14px] leading-[26px] font-[400] text-gray-600 transition-colors group-hover:text-gray-200">
            Lorem Ipsum is that it a more-or-less normal as distribution letters
            using opposed to using
          </p>
        </div>
      </div>
    </>
  );
}

export default CardSection;
