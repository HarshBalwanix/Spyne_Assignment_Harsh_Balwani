import React from 'react';

export const Logoutmodal = ({ data }) => {
  return (
    <div className='fixed inset-0 bg-indigo-200 bg-opacity-40 backdrop-blur-sm grid place-items-center z-20'>
      <div className='flex flex-col border border-[#3a527a] bg-indigo-900 p-8 rounded-md'>
        <div className='flex flex-col gap-3'>
          <p className='text-white text-2xl'>{data.text1}</p>
          <p className='text-[#c7c8cb]'>{data.text2}</p>
        </div>
        <div className='flex flex-row gap-3 text-lg font-bold'>
          <button
            className='mt-6 bg-[#F1C40F] p-2 text-[15px] rounded-lg text-black pt-3 pb-3 pl-4 pr-4 hover:bg-[#e2b208]'
            onClick={data.onclick1}
          >
            {data.btn1}
          </button>
          <button
            className='mt-6 bg-[#6E727F] p-2 text-[15px] rounded-lg text-black pt-3 pb-3 pl-4 pr-4 hover:bg-[#5C5F6A]'
            onClick={data.onclick2}
          >
            {data.btn2}
          </button>
        </div>
      </div>
    </div>
  );
};
