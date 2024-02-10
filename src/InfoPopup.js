import React from 'react'

export default function InfoPopup({data,exit}) {
    console.log(data?.data?.details?.errors        )
  return (
    <div
    class="w-[500px] overflow-hidden z-50  bg-orange-400  shadow-sm rounded-md shadow-gray-400 px-6 py-4"
    role="alert">
        <div className='w-full h-[40px]  flex-row  justify-between flex items-center'>
        <p className='text-white'>{data?.data?.successCount
} SucessFull Rows and {data?.data?.errorCount} Failed Rows</p>
        <p onClick={exit} className='text-white bg-zinc-600 cursor-pointer h-4 flex items-center justify-center p-3  w-4 rounded-full'>X</p></div>
       
{data?.data?.details?.errors?.map((error)=>{
      return<p className='w-full h-[50px] bg-red-400  bg-opacity-50 my-[10px] flex flex-row'>
        <p className=' w-full h-full overflow-hidden'>ID:{error._id} :
        {error.message}</p>
      </p> 
})}
{data?.data?.details?.sucess?.map((error)=>{
      return<p className='w-full h-[50px] bg-red-400  bg-opacity-50 my-[10px] flex flex-row'>
        <p className=' w-full h-full overflow-hidden'>ID:{error._id} :
        {error.message}</p>
      </p> 
})}
      
     
       
  </div>
  )
}
