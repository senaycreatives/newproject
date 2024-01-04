import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Errorpopup from './Errorpopup';
import SucessPopup from './SucessPopup';
import { useAuthHeader } from 'react-auth-kit';
import UseFetchData from './hooks/UseFetchData';

export function AddData() {
  const { data: fetchedData, refetch } = UseFetchData();


  const authHeader = useAuthHeader();
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

  const [datasets, setDatasets] = useState(initialDatasets);
  const [formData, setFormData] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

 useEffect(() => {
  if (fetchedData && fetchedData?.data) {
    console.log('entered')
    const fetchedKeys = fetchedData?.data[0] ? Object.keys(fetchedData?.data[0]) : [];
    const missingKeys = fetchedKeys.filter((key) => !datasets.some((dataset) => dataset.header === key));

    if (missingKeys.length > 0) {
      // Add missing keys to datasets with their types
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
}, [fetchedData]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post('https://gentle-puce-angler.cyclic.app/adddata', data, {
        headers: { Authorization: authHeader() },
      });
    },
    mutationKey: 'adddata',
    onSuccess: () => {
      setSuccessMessage('Added successfully');
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // Hide success message after 5 seconds
      // Refetch data after successful addition
      refetch();
    },
    onError: (error) => {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000); // Hide error message after 5 seconds
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="w-full overflow-hidden relative h-[90%] flex items-center justify-center">
      {/* Your loading spinner code here... */}

      <div className="flex sm:relative sm:overflow-y-hidden flex-col rounded-md bg-white sm:h-[90%] h-full mb-100 overflow-x-hidden w-[90%]">
        {errorMessage && (
          <div className="top-0 sm:right-0 sm:left-0 sm:w-[500px] w-[90%] h-[200px] absolute z-10">
            <Errorpopup message={errorMessage?.response?.data.message} />
          </div>
        )}
        {successMessage && (
          <div className="top-0 sm:right-0 sm:left-0 sm:w-[500px] w-[90%] h-[200px] absolute z-10">
            <SucessPopup message={successMessage} />
          </div>
        )}
        {/* Your header and back button code here... */}

        <div className="flex w-[90%] sm:h-[90%] relative pt-[30px] items-center justify-center">
          <form className="w-full h-full flex-wrap flex flex-col" onSubmit={handleSubmit}>
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
                      className="bg-gray-100 h-[30px]"
                      value={formData[header] || ''}
                      onChange={handleInputChange}
                    />
                  )}
                </div>
              </div>
            ))}
            <button
              onClick={handleSubmit}
              className="bg-zinc-900 w-[200px] my-4 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            >
              ADD DATA
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

