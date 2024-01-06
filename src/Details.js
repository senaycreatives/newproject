import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import UseFetchIndividualData from './hooks/UseFetchIndividualData';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export function Details() {
  const { data: searchData, refetch: refetchSearch, isLoading, isError: searchError } = UseFetchIndividualData(332);

  // State variables for input values
  const [zetacode, setZetacode] = useState('');
  const [location, setLocation] = useState('');
  const [room, setRoom] = useState('');
  const [helpDeskReference, setHelpDeskReference] = useState('');
  const [ips, setIPS] = useState(''); 
  
  // Update state variables when searchData changes
  useEffect(() => {
    if (searchData) {
      setZetacode(searchData.data?.Zetacode || '');
      setLocation(searchData.data?.Location || '');
      setRoom(searchData.data?.Room || '');
      setHelpDeskReference(searchData.data?.HelpDeskReference || '');
      setIPS(searchData.data?.IPS || '');
    }
  }, [searchData]);
  
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  // Event handlers for input changes
  const handleZetacodeChange = (e) => setZetacode(e.target.value);
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleRoomChange = (e) => setRoom(e.target.value);
  const handleHelpDeskReferenceChange = (e) => setHelpDeskReference(e.target.value);
  const handleIPSChange = (e) => setIPS(e.target.value);
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.put('https://dark-gold-sea-urchin-slip.cyclic.app/updatedata',data)
    },
    mutationKey: 'putdata',
    onSuccess: () => {
        setSuccessMessage('Edited successfully');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000); // Hide success message after 5 seconds
      },
      onError: (error) => {
        setErrorMessage(error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000); // Hide error message after 5 seconds
      },
  })
  
  return (
  
      <div className='w-full relative h-screen flex items-center justify-center overflow-hidden'>
      {mutation.isPending && (
        <div className=' z-10  absolute top-10  flex  items-center justify-center w-full h-full'>
                <div class=" inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
                </div>
              )}
               
        <div className='flex overflow-y-scroll flex-col rounded-md bg-white h-[90%] mb-100  overflow-x-hidden w-[90%]'>
         
         <div className=' h-[100px]  flex-shrink-0 w-full bg-slate-100 flex justify-center items-center text-white'>
            <p className='text-black text-lg font-bold'>Edit Here</p>
          </div>
          <div className='flex w-full  relative pt-[30px]  items-center justify-center'>
          {successMessage && (
            
            <div className='top-0 left-0 w-[500px] h-[200px] absolute z-10'>
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">successfull</strong>
                <span className="block sm:inline">edited successfully</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </div>
          )}
          
          {errorMessage && (
            <div className='top-0 left-0 w-[500px] h-[200px] absolute z-10'>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold mx-6">ERROR</strong>
                <span className="block sm:inline">{errorMessage}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </div>
          )}
          
          
            <form class="w-full max-w-lg flex flex-col">
                
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number">
                    Zetacode
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={zetacode}
                    onChange={handleZetacodeChange}
                    disabled
                    id="grid-number"
                    type="number"
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">

                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number">
                    Location
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={location}
                    onChange={handleLocationChange}
                    id="grid-number"
                    type="text"
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number">
                    Room
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={room}
                    onChange={handleRoomChange}
                    id="grid-number"
                    type="text"
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number">
                    HelpDeskReference
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={helpDeskReference}
                    onChange={handleHelpDeskReferenceChange}
                    id="grid-number"
                    type="text"
                  />
                </div>
              </div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-number">
                    IPS
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    value={ips}
                    onChange={handleIPSChange}
                    id="grid-number"
                    type="text"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className=' w-full flex my-5 items-center justify-center'>
            <button onClick={() => {
              mutation.mutate({
                zetacode: searchData?.data.Zetacode,
                newData: {
                  
                  Location: location,
                  Room: room,
                  HelpDeskReference: helpDeskReference,
                  IPS: ips,
                }})
            }} class="bg-zinc-900 w-[200px]  text-white font-bold py-2 px-4 border border-blue-700 rounded">
              Update
            </button>
          </div>
        </div>
      </div>

  );
}
