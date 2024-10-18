import  {  useState } from 'react';
// import SettingImage from '/src/assets/images/items-settings.svg';
import Search from '/src/assets/images/search.svg';
import { useQuery } from '@tanstack/react-query';
import { axiosConfig } from '../../utils/axiosConfig';
import CardSkeleton from '../../utils/CardSkeleton';
import { useCallback } from 'react';
import { NavLink } from 'react-router-dom';




function Items() {



  
const fetchCards = useCallback(async (currentPage, searchQuery) => {
  const response = await axiosConfig.get(`/user/templates`, {
    params: {
      page: currentPage,
      limit: 20,
      search: searchQuery || '',
    },
  });
  return response.data;
}, [axiosConfig]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  

  const { data, isLoading, isError, error } = useQuery(
    {
      queryKey: ['cards', currentPage, searchQuery],
      queryFn: () => fetchCards(currentPage, searchQuery),
      keepPreviousData: true,
    }
  );

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  

  // Safeguard: Ensure data exists before accessing properties
  const cardsData = data?.data?.templates || [];
  const pagination = data?.data?.pagination || { currentPage: 1, totalPages: 1 };

 
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); 
  };

  return (
    <>
      <div className="lg:mx-[100px] xl:mx-[100px] mx-[50px]">
    
        <div className="py-[50px] flex items-center justify-center w-full">
          <div className="flex pl-[10px] bg-lightBlue gap-2 rounded-lg w-full lg:w-1/2">
            <img src={Search} alt="search" />
            <input
              type="text"
              placeholder="Search"
              className="bg-lightBlue max-w-[519px] w-full  h-[54px] outline-none rounded-md"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Cards Section */}
       
        <div className="flex-wrap flex pb-[24px]">
          <div className="flex flex-wrap justify-center gap-4 sm:justify-center lg:justify-start">
           
            {isLoading
              ? 
              Array(10).fill(0).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
                
              :
               cardsData.length === 0 
               ? (
      <div className="w-full py-10 text-center">
        <p className="text-xl font-semibold text-gray-600">
          {searchQuery ? `No templates found for "${searchQuery}"` : "No templates available"}
        </p>
      </div>
    ) : ( cardsData.map((card, index) => (
                  <div key={index} className="pb-[150px]">
                    <div className="relative w-[284px] h-[164px] bg-lightBlue rounded-md">
                      <div className="w-[248px] h-[260px] absolute bg-white m-[20px] shadow-lg rounded-md items-center justify-center flex flex-col">
                        <img src={card.avatar} alt="Card Image" />
                        <p className="font-[Poppins] text-[18px] leading-[23px] font-[500] text-center text-[#19191B] mt-[12px]">
                          {card.name}
                        </p>
                        <p className="max-w-[180px] font-[Poppins] text-[16px] leading-[26px] font-[400] text-center mt-[12px]">
                          {card.description}
                        </p>
                        <NavLink to={''}>
                        <p className="font-[Poppins] text-[16px] leading-[26px] font-[400] text-center mt-[15px] text-[#6DC2ED] underline">
                          Learn More
                        </p>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                )))}
          </div>
        </div>


        {/* Pagination */}
        <div className="flex items-center justify-end my-8 space-x-2">
          <button
            className="px-4 py-2 font-bold text-white rounded cursor-pointer bg-lightBlue hover:bg-blue"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            className="px-4 py-2 font-bold text-white rounded bg-lightBlue hover:bg-blue"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.totalPages))}
            disabled={currentPage === pagination.totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Items;
