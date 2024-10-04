import React, { useState } from "react";
import Arrow from "/src/assets/images/dashboard-back-arrow.svg";
import DocumentIcon from "/src/assets/images/dashboard-doc-icon-body.svg";
import Saved from "/src/assets/images/dash-body-save-icon.svg";
import MenuIcon from "/src/assets/images/dash-body-menu-icon.svg";
import Initiation from "/src/assets/images/Dashboard-project-initiataion.svg";
import Planing from "/src/assets/images/planing-icon.svg";
import Execution from "/src/assets/images/execution-icon.svg";
import Tracking from "/src/assets/images/tracking-icon.svg";
import Comunication from "/src/assets/images/comunication-icon.svg";
import Management from "/src/assets/images/change-managment.svg";
import Risk from "/src/assets/images/risk-icon.svg";
import Procurement from "/src/assets/images/procurment.svg";
import Costing from "/src/assets/images/costing-icon.svg";
import Essentials from "/src/assets/images/essentials.svg";
import TaskManagement from "/src/assets/images/taskManagment-icon.svg";
import Qualitymanagement from "/src/assets/images/quality-management.svg";
import SatffManagement from "/src/assets/images/staff managment-icon.svg";
import Stakeholder from "/src/assets/images/stakeholder.svg";
import Wbs from "/src/assets/images/wbs.svg";
import Scheduling from "/src/assets/images/scheduling.svg";
import Timeline from "/src/assets/images/timeline.svg";
import Wordfile from "/src/assets/images/word-file-img.svg";
import WordIcon from "/src/assets/images/word-icon.svg";
import ExitIcon from "/src/assets/images/Exit Top Right.svg";
import { axiosConfig } from "../../utils/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

const fetchTemplates = async () => {
  const response = await axiosConfig.get("/user/templates-with-auth");
  console.log(response?.data);
  console.log("templates>>>>>>>>>>>>>>..", response?.data);
  return response?.data?.data.templates || [];
};

const BodyContent = ({ activeContent }) => {
  const [activeTab, setActiveTab] = useState(1);

  const {
    data: templates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["templates"],
    queryFn: fetchTemplates,
  });

  if (isLoading) return <div>Loading...</div>;

  console.log("templates>>>>>>>>>>>>lkjshdf", templates);
  if (error) {
    console.error(error);
    return <div>Error fetching templates :{error.message}</div>;
  }
  console.log("active content>>>>>>>kkjhk", activeContent);

  const filteredTemplates = templates?.filter(
    (template) => template.category === activeContent
  );
  console.log(">>>>>>>>>>>kjgiuiuyuyyiy", filteredTemplates);

  // const Data = [
  //   { id: 1, icon: Initiation, alt: 'Dashboard', text: 'Project Initiation' },
  //   { id: 2, icon: Planing, alt: 'planing-icon', text: 'Project planning' },
  //   { id: 3, icon: Execution, alt: 'Execution', text: 'Project Execution' },
  //   { id: 4, icon: Tracking, alt: 'Tracking', text: 'Project Tracking' },
  //   { id: 5, icon: Comunication, alt: 'Comunication', text: 'Project Communication' },
  //   { id: 6, icon: Management, alt: 'Management', text: 'Change Management' },
  //   { id: 7, icon: Risk, alt: 'Risk', text: 'Risk & Issue Management' },
  //   { id: 8, icon: Procurement, alt: 'Procurement', text: 'Project Procurement' },
  //   { id: 9, icon: Costing, alt: 'Costing', text: 'Project Costing' },
  //   { id: 10, icon: Essentials, alt: 'Essentials', text: 'PM Essentials' },
  //   { id: 11, icon: TaskManagement, alt: 'TaskManagement', text: 'Task Management' },
  //   { id: 12, icon: Qualitymanagement, alt: 'Qualitymanagement', text: 'Quality Management' },
  //   { id: 13, icon: SatffManagement, alt: 'SatffManagement', text: 'Staff Management' },
  //   { id: 14, icon: Stakeholder, alt: 'Stakeholder', text: 'Stakeholder Management' },
  //   { id: 15, icon: Wbs, alt: 'Wbs', text: 'WBS Management' },
  //   { id: 16, icon: Scheduling, alt: 'Scheduling', text: 'Project Scheduling' },
  //   { id: 17, icon: Timeline, alt: 'Timeline', text: 'Project Timeline' },
  // ];

  // const CardData = [
  //   { id: 1, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 2, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 3, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 4, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 5, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 6, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 7, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 8, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 9, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 10, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 11, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 12, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 13, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 14, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 15, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 16, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  //   { id: 17, img: Wordfile, alt: 'abc', icon: WordIcon, text: 'Lorem Ipsum', icon2: ExitIcon },
  // ];

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
              <select className="border-none outline-none mt-[13px]">
                <option selected>Categories</option>
              </select>

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
