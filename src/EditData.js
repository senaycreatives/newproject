import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Errorpopup from './Errorpopup';
import SucessPopup from './SucessPopup';
import {useAuthHeader, useAuthUser} from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import backicon from './Image/Icon/left-arrow.png'
export function EditData() {
  
    const { zetacode } = useParams();
    console.log(zetacode)

  const authHeader = useAuthHeader()
  const initialDatasets = [
    { header: 'Location', type: 'string', required: true },
    { header: 'Zetacode', type: 'number', required: true, unique: true },
    { header: 'Room', type: 'string', required: true },
    { header: 'HelpDeskReference', type: 'string', required: true },
    { header: 'IPS', type: 'boolean', required: true },
    { header: 'Fault', type: 'string' },
    { header: 'Date', type: 'date', required: true },
    { header: 'HotTemperature', type: 'number' },
    { header: 'HotFlow', type: 'number' },
    { header: 'HotReturn', type: 'number' },
    { header: 'ColdTemperature', type: 'number' },
    { header: 'ColdFlow', type: 'number' },
    { header: 'ColdReturn', type: 'number' },
    { header: 'HotFlushTemperature', type: 'number' },
    { header: 'TapNotSet', type: 'boolean' },
    { header: 'ColdFlushTemperature', type: 'number' },
    { header: 'TMVFail', type: 'boolean' },
    { header: 'PreflushSampleTaken', type: 'boolean' },
    { header: 'PostflushSampleTaken', type: 'boolean' },
    { header: 'ThermalFlush', type: 'string' },
  ];
  const [formData, setFormData] = useState({});


  const [successMessage, setSuccessMessage] = useState(null);  // Add this line
  const [errorMessage, setErrorMessage] = useState(null)
  const [fetchedData,setfetchedData]=useState({})
  const [datasets, setDatasets] = useState(initialDatasets);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Convert value to a number if it's a number field
    const processedValue = type === 'number' ? Number(value) : value;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : processedValue,
    }));
  };
  
  const navigate = useNavigate();

  useEffect(() => {
   
    if (fetchedData && fetchedData?.data) {
      console.log(fetchedData)
      const fetchedKeys = fetchedData?.data ? Object.keys(fetchedData?.data) : [];
      const missingKeys = fetchedKeys.filter((key) => !datasets.some((dataset) => dataset.header === key));

      if (missingKeys.length > 0) {
        const newDatasets = [
          ...datasets,
          ...missingKeys.map((key) => {
            const valueType = typeof fetchedData?.data[key];
            return {
              header: key,
              type: valueType === 'boolean' ? 'boolean' : valueType === 'number' ? 'number' : valueType === 'object' && fetchedData?.data[key] instanceof Date ? 'date' : 'string',
              required: false,
            };
          }),
        ];
        console.log("newDatasets");
        setDatasets(newDatasets);
      }
    }
  }, [fetchedData]);
  

  const mutation = useMutation({
    mutationFn: (data) => {
  return axios.put('https://dark-gold-sea-urchin-slip.cyclic.app/updatedata',data, {
    headers: { Authorization: authHeader() },
  });
},

    mutationKey: 'putdatas',
    onSuccess: () => {
      setSuccessMessage('Added successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // Hide success message after 5 seconds
    },
    onError: (error) => {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Hide error message after 5 seconds
    },
  });
  useEffect(() => {
    // Fetch data for the selected item based on the zetacode
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://dark-gold-sea-urchin-slip.cyclic.app/getsingledata/${zetacode}`, {
            headers: { Authorization: authHeader() },
          });
          setfetchedData(response?.data)
        
        setFormData(response.data?.data || {});
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [zetacode]);

  const handleUpdate = (e) => {
    e.preventDefault()
    mutation.mutate({
        id: zetacode,
        newData: formData});
  };
  const auth = useAuthUser()
if(auth()?.permission=="admin"||auth()?.permission=="editor"){
if(formData){
  return (
   
      <div className="w-full relative h-screen flex items-center justify-center overflow-hidden">
        {mutation.isPending && (
          <div className="z-10 absolute top-10 flex items-center justify-center w-full h-full">
            <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
          </div>
        )}

        <div className="flex sm:relative  sm:overflow-y-hidden flex-col  rounded-md  sm:h-[97%]  mb-[10px] overflow-x-hidden w-[100%]">
       
        {errorMessage && (
            <div className='top-0 sm:right-0  sm:left-0 sm:w-[500px] w-[90%] h-[200px] absolute z-10'>
              <Errorpopup message={errorMessage?.response?.data.message}/>
            </div>
            
          )}
           {successMessage && (
                  <div className='top-0 sm:right-0  sm:left-0 sm:w-[500px] w-[90%] h-[200px] absolute z-10'>
          
            <SucessPopup message={successMessage}/>
        </div>  )}
        <div className='  sm:w-[50%] w-[60%] h-[40px] mt-2  p-4 flex items-center  justify-between'>
          <div onClick={() => navigate(-1)} className='w-[40px]  bg-slate-100 rounded-md flex items-center justify-center h-[40px] p-3'>

            <img src={backicon} className='h-[20px] w-[20px]  '/>
          </div>
          <p className=' font-bold  text-lg'>Edit Data</p></div>
          <div className="flex w-[90%] sm:h-[80%] relative pt-[30px] items-center justify-center">
            <form className="w-full h-full flex-wrap  flex flex-col" onSubmit={handleUpdate}>
              {datasets.map(({ header, type }) => (
                <div key={header} className="flex flex-wrap mx-3 mb-6">
                  <div className="w-full px-3">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor={`grid-${header.toLowerCase()}`}
                    >
                      {header}
                    </label>
                    {type === 'boolean' ? (
                      <input
                        type="checkbox"
                        id={`grid-${header.toLowerCase()}`}
                        name={header}
                        checked={formData[header] || false}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <input
                       type={type === 'number' ? 'number' : type === 'date' ? 'date' : 'text'}
 id={`grid-${header.toLowerCase()}`}
                        name={header}
                        className='bg-gray-100 h-[30px]'
                        value={formData[header] || ''}
                        onChange={handleInputChange}
                      />
                    )}
                    
                  </div>
                </div>
              ))}
                  <button
            onClick={handleUpdate}
            className="bg-zinc-900 w-[200px] my-4 text-white font-bold py-2 px-4 border border-blue-700 rounded "
          >
            Update Data
          </button>
            </form>
          </div>
      </div>
      </div>
 
  )
                    }
                  }
                  else{
                    return<div>You have no permission</div>
                  }

}
