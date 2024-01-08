import React from 'react'

export default function InfoPopup({data,exit}) {
    console.log(data?.data?.details?.errors        )
  return (
    <div
    class="w-[500px] overflow-hidden z-50  bg-white shadow-sm rounded-md shadow-gray-400 px-6 py-4"
    role="alert">
        <div className='w-full h-[40px]  flex-row  justify-between flex items-center'>
        <p>{data?.data?.successCount
} SucessFull files and {data?.data?.errorCount} Failed Files</p>
        <p onClick={exit}>X</p></div>
       
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
