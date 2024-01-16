import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function Loading({name}) {
  return (
    <div className=" w-full   flex-col   backdrop-brightness-10 z-[100] flex items-center justify-center  h-full  absolute top-0 left-0">
        
        <div className=' flex bg-white shadow-sm shadow-gray-300 flex-col items-center justify-center h-[100px] w-[100px]'>
        <TailSpin
                  height={50}
                  width={50}
                  radius={1}
                  color="green"
                  className="bg-black"
                  ariaLabel="ball-triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
                  <p className=' font-bold'>{name}</p></div> 
              
    </div>
  )
}
