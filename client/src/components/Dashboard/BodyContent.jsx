
import React, { useState, useEffect } from "react";
import Arrow from "/src/assets/images/dashboard-back-arrow.svg";
import DocumentIcon from "/src/assets/images/dashboard-doc-icon-body.svg";
import Saved from "/src/assets/images/dash-body-save-icon.svg";
import MenuIcon from "/src/assets/images/dash-body-menu-icon.svg";

import WordIcon from "/src/assets/images/word-icon.svg";
import ExitIcon from "/src/assets/images/Exit Top Right.svg";
import { axiosConfig } from "../../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const BodyContent = ({ activeContent }) => {
  const axiosPrivate = useAxiosPrivate();
  
  const [activeTab, setActiveTab] = useState(null); 

  const fetchTemplates = async () => {
    const response = await axiosPrivate.get("/user/templates-with-auth");
    console.log(response?.data);
    console.log("templates>>>>>>>>>>>>>>..", response?.data);
    return response?.data?.data.templates || [];
  };





  
  const {
    data: templates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
 
 
  });

  useEffect(()=>{

    if(templates){
      const filteredTemplates= templates.filter((template)=> template.category === activeContent)
   

    if(filteredTemplates.length >0){
        setActiveTab(filteredTemplates[0]._id)
    }
  }
  },[templates,activeContent]
)


  

  if (isLoading) return <div>Loading...</div>;

  console.log("templates>>>>>>>>>>>>lkjshdf", templates);
  if (error) {
    console.error(error);
    return <div>Error fetching templates: {error.message}</div>;
  }
  console.log("active content>>>>>>>kkjhk", activeContent);

  const filteredTemplates = templates?.filter(
    (template) => template.category === activeContent,
   
  );

 

  return (
    <div className="bg-[#F9F9F9] full">
      <div className="mx-[20px] mt-[34px] bg-white">
        <div className="flex flex-col w-full bg-white rounded-md ">
          <div className="pr-[30px] flex items-center justify-between w-full border-black">
            {/* Navbar */}
            <div className="mt-[33px] flex items-center justify-start pb-[17px] border-b">
              <img src={Arrow} alt="arrow" className="mx-[22px]" />
              <div className="ml-[10px] h-[45px] w-[45px] bg-navyblueLight rounded-full flex items-center justify-center">
                <img src={DocumentIcon} alt="icon" />
              </div>
              <div className="ml-[10px] flex flex-col">
                <p className="text-[16px] font-[Poppins] leading-[24px] font-[500]">
                  Template Library
                </p>
                <h2 className="text-[20px] font-[Poppins] leading-[30px] font-semibold capitalize">
                  {activeContent}
                </h2>
              </div>
            </div>

            <div className="flex items-center ">
              <div className="ml-[10px] h-[34px] w-[34px] bg-navyblueLight rounded-full flex items-center justify-center">
                <img src={Saved} alt="icon" />
              </div>
              <div className="ml-[10px] h-[34px] w-[34px] bg-navyblueLight rounded-full flex items-center justify-center">
                <img src={MenuIcon} alt="icon" />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="flex justify-between w-full h-full">
            <div className="flex flex-col mx-[24px] w-[30%]">
              <div className="mt-3 mb-3">Categories</div>

              {/* Category Items */}
              {filteredTemplates?.map((template) => (
                <div
                  key={template._id}
                  className={`p-2 rounded-md flex gap-2 cursor-pointer ${
                    activeTab === template._id ? "bg-navyblueLight" : "bg-white"
                  }`}
                  onClick={() => setActiveTab(template._id)}
                >
                  <img src={template.avatar} alt={template.name} />
                  <p className="text-[14px] font-[Poppins] leading-[21px] font-[400]">
                    {template.name}
                  </p>
                </div>
              ))}
            </div>

            {/* Second Div for Cards */}
            <div className="flex flex-wrap w-full gap-4">
              {activeTab &&
                filteredTemplates
                  .find((template) => template._id === activeTab)
                  ?.templates?.map((item) => (
                    <div
                      key={item._id}
                      className="max-w-[176px] w-full mt-[11px]"
                    >
                      <div className="flex flex-col border-2 rounded-md border-navyblueLight">
                        <div className="w-[173px] h-[115px]">
                          <img
                            src={item.templateImage}
                            alt={item.templateTitle}
                            className="object-cover w-full h-full "
                          />
                        </div>

                        <div className="flex bg-navyblueLight items-center justify-between px-[5px] py-[8px]">
                          <img src={WordIcon} alt={item.templateTitle} />
                          <p className="-ml-[40px] text-[12px] leading-[18px] font-[Poppins] font-[400]">
                            {item.templateTitle}
                          </p>
                          <NavLink
                            to={`/templates/${item._id}`}
                            state={{ someProp: activeContent }}
                          >
                            <img
                              src={ExitIcon}
                              alt="Download"
                              className="cursor-pointer"
                            />
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyContent;
