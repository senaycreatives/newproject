import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Errorpopup from './Errorpopup';
import SucessPopup from './SucessPopup';
import {useAuthHeader} from 'react-auth-kit';
import { useParams } from 'react-router-dom';
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
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  useEffect(() => {
    if (fetchedData && fetchedData?.data) {
      const fetchedKeys = fetchedData?.data[0] ? Object.keys(fetchedData?.data[0]) : [];
      const missingKeys = fetchedKeys.filter((key) => !datasets.some((dataset) => dataset.header === key));

      if (missingKeys.length > 0) {
        const newDatasets = [
          ...datasets,
          ...missingKeys.map((key) => {
            const valueType = typeof fetchedData?.data[0][key];
            return {
              header: key,
              type: valueType === 'boolean' ? 'boolean' : valueType === 'number' ? 'number' : valueType === 'object' && fetchedData?.data[0][key] instanceof Date ? 'date' : 'string',
              required: false,
            };
          }),
        ];
        setDatasets(newDatasets);
      }
    }
  }, [fetchedData,zetacode]);

  const mutation = useMutation({
    mutationFn: (data) => {
  return axios.put('https://gentle-puce-angler.cyclic.app/updatedata',data, {
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
        const response = await axios.get(`https://gentle-puce-angler.cyclic.app/getsingledata/${zetacode}`, {
            headers: { Authorization: authHeader() },
          });
          setfetchedData(response?.data)
        setFormData(response.data?.data || {});
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [zetacode,fetchedData]);

  const handleUpdate = (e) => {
    e.preventDefault()
    mutation.mutate({
        zetacode: formData.Zetacode,
        newData: formData});
  };
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

        <div className="flex sm:relative sm:overflow-y-hidden flex-col  rounded-md bg-white sm:h-[80%]  mb-100 overflow-x-hidden w-[100%]">
       
        {errorMessage && (
            <div className='top-0 sm:right-0  sm:left-0 sm:w-[500px] w-[90%] h-[200px] absolute z-10'>
              <Errorpopup message={errorMessage?.response?.data.message}/>
            </div>
            
          )}
           {successMessage && (
                  <div className='top-0 sm:right-0  sm:left-0 sm:w-[500px] w-[90%] h-[200px] absolute z-10'>
          
            <SucessPopup message={successMessage}/>
        </div>  )}
        <div className='  sm:w-[50%] w-[60%] h-[70px]  flex items-center  justify-between'>
          <div className='w-[70px]   rounded-md flex items-center justify-center h-[30px]'>{'<'}back</div>
          <p className=' font-bold  text-lg'>EDit Data</p></div>
      

          <div className="flex w-[90%] sm:h-[90%] relative pt-[30px] items-center justify-center">
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