import  { useEffect, useState } from 'react';
import Sidebar1 from '../../components/Dashboard/Sidebar1';
import Sidebar2 from '../../components/Dashboard/Sidebar2';
import DashboardNavbar from '../../components/Dashboard/DashboardNavbar';
import BodyContent from '../../components/Dashboard/BodyContent';






function Dashboard() {
  const [isSidebarVisible, setSidebarVisible] = useState(true); 
  const [activeContent, setActiveContent] = useState('documents');
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {

    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };



  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); 

    
  };

  return (
    <>
     <div className={`flex w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <Sidebar1 />
        {isSidebarVisible && <Sidebar2  setActiveContent={setActiveContent} isDarkMode={isDarkMode}  toggleDarkMode={toggleDarkMode}/>}
        <div className='flex flex-col w-full'>
          <DashboardNavbar toggleSidebar={toggleSidebar} />
      <BodyContent   activeContent={activeContent} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
