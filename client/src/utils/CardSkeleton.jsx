const CardSkeleton = () => {
    return (
      <div className='pb-[150px]'>
        <div className='relative w-[284px] h-[164px] bg-lightBlue rounded-md'>
          <div className='w-[248px] h-[260px] absolute bg-white m-[20px] shadow-lg rounded-md items-center justify-center flex flex-col'>
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-[150px] h-[20px] mt-[12px] bg-gray-300 animate-pulse"></div>
            <div className="w-[180px] h-[15px] mt-[12px] bg-gray-300 animate-pulse"></div>
            <div className="w-[120px] h-[15px] mt-[15px] bg-gray-300 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  };
export default CardSkeleton  