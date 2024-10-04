

const BlogLoader = () => {
    return (
        <div className='flex flex-col mt-[31px] max-w-[396px] w-full border border-[#EBEBEB] rounded-xl animate-pulse'>
            <div className='h-[200px] w-full bg-gray-300 rounded-tr-md rounded-tl-md'></div>
            <div className='absolute ml-[22px] mt-[20px] py-[2px] px-[12px] rounded-full bg-gray-400 text-center text-transparent'>Loading</div>

            <div className='ml-[31px] pb-[20px]'>
                <div className='flex gap-[10px] mt-[24px] items-center'>
                    <div className='w-[60px] h-[14px] bg-gray-400 rounded'></div>
                    <div className='w-[100px] h-[14px] bg-gray-400 rounded'></div>
                    <div className='w-[3px] h-[3px] rounded-full bg-blue'></div>
                    <div className='w-[60px] h-[14px] bg-gray-400 rounded'></div>
                </div>
                <div className='mt-[16px] max-w-[293px] w-full h-[28px] bg-gray-400 rounded'></div>
                <div className='mt-[16px] max-w-[293px] w-full h-[24px] bg-gray-300 rounded'></div>
            </div>
        </div>
    );
};

export default BlogLoader;
