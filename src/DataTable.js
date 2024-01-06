import React, { useEffect, useRef, useState } from 'react';
import Layout from './Layout';
import UseFetchData from './hooks/UseFetchData';
import axios from 'axios';
import UseFetchIndividualData from './hooks/UseFetchIndividualData';
import Errorpopup from './Errorpopup';
import SucessPopup from './SucessPopup';
import addicon from './Image/Icon/column.png';
import deleteicon from './Image/Icon/delete-column.png';

import importicon from './Image/Icon/import.png';
import Exporticon from './Image/Icon/export.png';
import { useMutation } from '@tanstack/react-query';
import {useAuthHeader} from 'react-auth-kit';
import { Link } from 'react-router-dom';

export function DataTable() {
  const { data, refetch } = UseFetchData();
  const [search, setSearch] = useState('');
  const [addcolomonPOPup, setAddColomunPopup] = useState(false);
  const [deletecolomunPOPup, setdeletecolomonPopup] = useState(false);
  const [deletecolumonname, setdeletecolomunname] = useState('');
  const [zetaCode, setZetaCode] = useState('');
  const { data: searchData, refetch: refetchSearch, isLoading, isError: searchError, error: errorMessage } = UseFetchIndividualData(zetaCode);
  const [pageSize] = useState(5);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageData, setPagedata] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  
  const [selectedRow, setSelectedRow] = useState(null);
  const [sucess, setSucess] = useState(null);
  const [exporttype,setexporttype]=useState('csv')
  const [importpopup,setimportpopup]=useState(false)
  const externalComponentRef = useRef();
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [datasets, setDatasets] = useState(initialDatasets);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

   
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      // Handle the case where no file is selected
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

       return await axios.post('https://dark-gold-sea-urchin-slip.cyclic.app/importcsv', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 
        Authorization:authHeader()},
      });

    
  
  };

  useEffect(() => {
    if (data && data?.data) {
      console.log('entered')
      const fetchedKeys = data?.data[0] ? Object.keys(data?.data[0]) : [];
      const missingKeys = fetchedKeys.filter((key) => !datasets.some((dataset) => dataset.header === key));
  
      if (missingKeys.length > 0) {
        // Add missing keys to datasets with their types
        const newDatasets = [
          ...datasets,
          ...missingKeys.map((key) => {
            const valueType = typeof data?.data[0][key];
            return {
              header: key,
              type: valueType === 'boolean' ? 'boolean' : valueType === 'number' ? 'number' : valueType === 'object' && data?.data[0][key] instanceof Date ? 'date' : 'string',
              required: false,
            };
          }),
        ];
        console.log(newDatasets)
        setDatasets(newDatasets);
      }
    }
  }, [data]);
  const { mutate:uploadfile } = useMutation({
    mutationFn: uploadFile,

    mutationKey: 'importData',
    onSuccess: () => {
     setSucess('Data Imported successfully');
     setimportpopup(false)
      setTimeout(() => {
        setSucess(null);
      }, 5000); // Hide success message after 5 seconds
    },
    onError: (error) => {
      setError("Error Occurr while adding");
      setimportpopup(false)
      setTimeout(() => {
        setError(null);
      }, 5000); // Hide error message after 5 seconds
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Trigger the uploadFile function using the useMutation hook
    uploadfile();
  };
  
  useEffect(() => {
    const handleClick = () => {
      // Handle the click event here
      setAddColomunPopup(false)
      setimportpopup(false)
    
    };
  
    const externalComponent = externalComponentRef.current;
  
    if (externalComponent) {
      externalComponent.addEventListener('click', handleClick);
    }
  
    return () => {
      // Remove the event listener when the component is unmounted
      if (externalComponent) {
        externalComponent.removeEventListener('click', handleClick);
      }
    };
  }, [externalComponentRef,addcolomonPOPup]);
  
  const authHeader = useAuthHeader()
  useEffect(() => {
    changepagedata();
  }, [page, data]);
  const mutation = useMutation({
    mutationFn: (data) => {
  return axios.put('https://dark-gold-sea-urchin-slip.cyclic.app/updatedataTable', data, {
    dataset: { Authorization: authHeader() },
  });
},

    mutationKey: 'addcolomun',
    onSuccess: () => {
     setSucess('Columon Added successfully');
     setAddColomunPopup(false)
      setTimeout(() => {
        setSucess(null);
      }, 5000); // Hide success message after 5 seconds
    },
    onError: (error) => {
      setError("Error Occurr while adding");
      setAddColomunPopup(false)
      setTimeout(() => {
        setError(null);
      }, 5000); // Hide error message after 5 seconds
    },
  });

  useEffect(() => {
    Popuperror();
  }, [searchError]);
  const tableRef = useRef(null);

  const handleScrollToEnd = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        left: tableRef.current.scrollWidth,
        behavior: 'smooth',
      });

    }
  };

  const handleScrollToStart = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
      
    }
  };

  const Popuperror = () => {
    if(zetaCode){
    setError('Something went wrong. Please try again.');
    setTimeout(() => {
      setError(null);
    }, 1000);}
  };

  const changepagedata = () => {
    if (data && data.data) {
      const startIdx = (page - 1) * pageSize;
      const endIdx = startIdx + pageSize;
      const pageData = data.data.slice(startIdx, endIdx);
      setStart(startIdx + 1);
      setEnd(Math.min(endIdx, data.data.length));
      setPagedata(pageData);
    }
  };

  const handlePageChange = (direction) => {
    if (data && data.data) {
      const totalPages = Math.ceil(data.data.length / pageSize);
      if (direction === 'prev' && page > 1) {
        setPage(page - 1);
      } else if (direction === 'next' && page < totalPages) {
        setPage(page + 1);
      }
    }
  };

  const handleDelete = async (zetacode) => {
    try {
      const res = await axios.delete('https://dark-gold-sea-urchin-slip.cyclic.app/deletedata', {
        data: { zetacode },
      headers: {Authorization:authHeader()}});
      console.log(res)
      
      refetch();
      setSucess('SucessFully Fully Deleted');
    setTimeout(() => {
      setSucess(null);
    }, 1000)
      setError(null); // Clear previous errors
      return res;
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setTimeout(() => {
        setError(null); // Clear error after 5 seconds
      }, 1000);
    }
  };
  const handleDeletecolomun = async (columname) => {
    try {
      const res = await axios.delete(`https://dark-gold-sea-urchin-slip.cyclic.app/deleteColumn/${columname}`, {
        data: { columname },
      });
      console.log(res)
      
      refetch();
      setSucess('SucessFully Fully Deleted');
      setdeletecolomonPopup(false)
    setTimeout(() => {
      setSucess(null);

    }, 1000)
      setError(null); // Clear previous errors
      return res;
    } catch (error) {
      setError('Something went wrong. Please try again.');
    setdeletecolomonPopup(false)
      setTimeout(() => {
        setError(null); // Clear error after 5 seconds
      }, 1000);
    }
  };

  const handleSearch = async () => {
    setZetaCode(search);
    await refetchSearch(zetaCode);
    setError(null); // Clear previous errors
  };

  const handleBack = () => {
    setSearch('');
    refetchSearch('');
    setZetaCode('')
    setShowDetails(false);
    setSelectedRow(null);
  };

  const handleShowDetails = (row) => {
    setShowDetails(true);
    setSelectedRow(row);
  };


  const [dataset,setdataset]=useState([])
  useEffect(() => {
   
    // Dynamically set dataset when pageData changes
    if (pageData.length > 0) {
      setdataset(Object.keys(pageData[0]));
    }
  }, [page, data, pageData]);
  const [selectedType, setSelectedType] = useState('');
  const [defaultData, setDefaultData] = useState('');
  const [columnname, setcolumnname] = useState('');
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  const handelExporttypechange=(event) => {
    setexporttype(event.target.value);
  };
  const handleSetcolumn = (event) => {
    setcolumnname(event.target.value);
  };

  const handleDefaultDataChange = (event) => {
  if(selectedType!="checkbox"){
console.log(event.target.value)
   return setDefaultData(event.target.value);
  }
  console.log(event.target.checked)
  return setDefaultData(event.target.checked);


  };
  const handleSetColumnToDelete=(e)=>{
return setdeletecolomunname(e.target.value)
  }
  const handleAddColumn = () => {
    
    // Perform validation checks before proceeding
    if (!selectedType || !defaultData) {
      console.log({
        newFielddata:{
          columnname:defaultData
        }
      })
      return;
    }
    console.log({
      newFielddata: {
        [columnname]: defaultData,
      }
    });
    mutation.mutate({
      newFielddata: {
        [columnname]: defaultData,
      }
    });
    setSelectedType('');
    setDefaultData('');
  };
  const handelExport = async (type) => {
    try {
      const res = await axios.get(`https://dark-gold-sea-urchin-slip.cyclic.app/${type === 'excel' ? 'generateExcel' : 'generateCSV'}`, {
        headers: { Authorization: authHeader() },
        responseType: 'blob', // Set the response type to blob for file download
      });
  
      // Create a blob from the response data
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
  
      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `exported.${type}`;
      
      // Append the link to the body and trigger the click event
      document.body.appendChild(link);
      link.click();
  
      // Remove the link element
      document.body.removeChild(link);
    } catch (error) {
      setError('Something went wrong. Please try again.');
  
      setTimeout(() => {
        setError(null); // Clear error after 5 seconds
      }, 1000);
    }
  };
  
 
  return (
    
    
        <div className='flex relative flex-col rounded-md  h-[88%] mb-100 overflow-y-hidden  w-[100%]'>
          {error && (
            <div className='top-0 left-0  w-[500px] h-[200px] absolute z-10'>
              <Errorpopup message={errorMessage?.response?.data.message}/>
            </div>
          )}
           {sucess && (
                  <div className='top-0 left-0  w-[500px] h-[200px] absolute z-10'>
          
            <SucessPopup message={sucess}/>
        </div>  )}
          <div className='w-full  flex flex-row  h-[60px] items-center   justify-between '>
            <div className="w-[500px] flex flex-row items-center h-full flex-wrap flex-auto   mx-2">
            <button type="button" onClick={()=>setimportpopup(true)} class="px-3 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            <img src={importicon} className=' w-4 h-4 mx-1'/>
Import
</button>
<button type="button" onClick={()=>handelExport(exporttype)} class="px-3 mx-2 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
<img src={Exporticon} className=' w-4 h-4 mx-1'/>
Export
</button>
<select id="countries" value={exporttype} onChange={handelExporttypechange} class="bg-gray-50 border border-gray-300 w-[150px] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value='' disabled>Export Type</option>
            <option value='csv'>csv</option>
            <option value='excel'>excel</option>
           
</select>
            </div>
             <div className=' w-[500px]   items-center justify-center flex h-full flex-row  '>
              {isLoading && (
                <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
              )}
              <div className='  flex w-full  flex-wrap flex-row items-center justify-center '>
                <input
                  type='search'
                  className=' m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
                  placeholder='Search By Zetacode'
                  aria-label='Search'
                  aria-describedby='button-addon2'
                  onChange={(e) => setSearch(e.target.value)}
                />
                <span
                  onClick={handleSearch}
                  className='input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200'
                  id='basic-addon2'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='h-5 w-5'>
                    <path fillRule='evenodd' d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z' clipRule='evenodd' />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div ref={tableRef} className='sm:-mx-6 w-full z-20  overflow-x-scroll   h-[440px]  flex lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className=''>
                <table className=' text-left text-sm font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      {datasets.map(({ header, type }) => (
                        <th key={header}  className='p-1 border-b border-blue-gray-100 bg-blue-gray-50 text-center'>
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
{header}</p> 
                        </th>
                      ))}
                      <div className=' w-[300px] flex flex-row '>
                      <div className='  cursor-pointer hover:bg-slate-100 w-[140px] px-5 flex-row items-center' onClick={()=>setAddColomunPopup(true)}>   <img src={addicon} width="20px" className=' ' alt="" /> 
                      <p>Add column</p>

                </div>
                <div className='cursor-pointer hover:bg-slate-100 items-center  p-1 border-b flex flex-row border-blue-gray-100 bg-blue-gray-50 text-center' onClick={()=>setdeletecolomonPopup(true)}>  
                <img src={deleteicon} width="20px" className=' ' alt="" /> 
                        <p>Delete column</p>

                </div>
                </div>
                
                    </tr>
                  </thead>
                  <tbody className=' '>
            {searchData ? (
              <tr>
                {dataset.map(({ header, type }) => (
                  <td key={header}>{searchData.data[header]}</td>
                ))}
              <td>
                  <button onClick={() => handleShowDetails(searchData.data)}>See Details</button>
                  <button onClick={() => handleDelete(searchData.data.Zetacode)}>Delete</button>
                </td>
              </tr>
            ) : (
              pageData?.map((row) => (
                <tr className='even:bg-zinc-100' key={row.Zetacode}>
                  {datasets.map(({ header, type }) => (
                    <td key={header} className="p-4  border-b border-blue-gray-50 text-center" >
                    {typeof row[header] === 'boolean' ? row[header].toString() : row[header]}
                  </td>
                  ))}
                  <div className=' flex-row w-[300px] '>
                  <td className=' w-[140px] flex items-center justify-center py-4 text-blue-400 '>
                           
                           <Link to={`/detail/${row.Zetacode}`}
                            
                              className='w-[70px] h-[40px] flex items-center justify-center bg-orange-500 rounded-md'>
                              <p className='text-white hover:cursor-pointer'>Update</p>
                            </Link>
                          </td>
                          <td className=' w-[140px] flex items-center justify-center py-4 text-blue-400 '>
                            <div
                              onClick={() => handleDelete(row.Zetacode)}
                              className='w-[70px] h-[40px] flex items-center justify-center bg-red-500 rounded-md'>
                              <p className='text-white hover:cursor-pointer'>Delete</p>
                            </div>
                          </td>
                  </div>
                
                         
                </tr>
            
              ))
            )}
             {
                            pageData.length==0 &&<div className=' w-full h-[100px] '>
                              <p>No data exist</p>
                            </div>
                          }
          </tbody>
                </table>
                
                {!searchData && (
                  <div  className=' z-0  w-full absolute bottom-0 h-[80px] items-center justify-center px-10 flex flex-row  '>
                   <div onClick={handleScrollToStart} className='w-[50px] h-[50px] flex items-center justify-center bg-gray-300 shadow-sm shadow-black rounded-md'>
                  {"<"}
                   </div>
                   <div className='flex    w-full  flex-col px-10 pt-3 items-center justify-between'>
                    
                    <span className='text-sm text-gray-400'>
                      Showing{' '}
                      <span className='font-semibold text-gray-900 dark:text-white'>{start}</span> to{' '}
                      <span className='font-semibold text-gray-900 dark:text-white'>{end}</span> of{' '}
                      <span className='font-semibold text-gray-900 dark:text-white'>{data?.data?.length}</span>{' '}
                      Entries
                    </span>

                    <div className='inline-flex mt-2 xs:mt-0'>
                      <button
                        onClick={() => handlePageChange('prev')}
                        className='flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        Prev
                      </button>
                      <button
                        onClick={() => handlePageChange('next')}
                        className='flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                        Next
                      </button>
                    </div>
                  </div>
                  <div onClick={handleScrollToEnd} className='w-[50px] h-[50px] flex items-center justify-center bg-gray-300 shadow-sm shadow-black rounded-md'>
                  {">"}
                   </div></div>
                 
                )}


                {searchData && (
                  <button
                    onClick={handleBack}
                    className='flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                    Back to full list
                  </button>
                )}
              </div>
            </div>
          </div>
          {addcolomonPOPup&&
          <div  className=' absolute   w-full h-full flex items-center justify-center z-20 bg-zinc-900  backdrop-blur-sm bg-opacity-15'>
            <div className="absolute  w-full h-full  z-20 bg-zinc-900 bg-opacity-50 backdrop-blur-sm"    ref={externalComponentRef}></div>
    
            {mutation.isPending?<div className='z-30 w-[400px] h-[400px] bg-white flex flex-col'>Loading</div>:
            <div className=' z-30 w-[400px] h-[400px] bg-white flex flex-col' >
              <div className=' w-full h-[40px] items-center flex justify-center '>
                <p className=' text-black font-bold   text-[20px] text-center'>ADD New column</p>
               
              </div>
              <div className=' w-full  h-full  flex flex-col items-center justify-center'>
                <div className=' w-[90%] h-[90%] '>
                
                <div class="w-72 my-5">
  <div class="relative h-10 w-full min-w-[200px] ">
    <input onChange={(e)=>handleSetcolumn(e)} type="email" placeholder="Colomun name"
      class="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
    <label
      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5  hidden h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
  </div>
</div>


<label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select DataType</label>
<select id="countries" value={selectedType} onChange={handleTypeChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value='' disabled>Select...</option>
            <option value='text'>text</option>
            <option value='number'>number</option>
            <option value='date'>Date</option>
            <option value='checkbox'>boolian</option>
</select>
<div class="w-72 my-5 ">
  <div class="relative h-10 w-full min-w-[200px] ">
    <input   type={selectedType}
            value={defaultData}
            onChange={handleDefaultDataChange}
            placeholder={`Enter data for ${selectedType}`}
      class="peer h-full  rounded-[7px]    !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
    <label
      class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5  hidden h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"></label>
  </div>
</div>

                </div>
                <button type="button" onClick={()=>handleAddColumn()}  class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Cyan</button>

              
           
              
                
         
                </div>
              
            </div>}
          </div>
}
{deletecolomunPOPup && (
  <div className='absolute w-full h-full flex items-center justify-center z-20 bg-zinc-900 backdrop-blur-sm bg-opacity-15'>
    <div className="absolute w-full h-full z-20 bg-zinc-900 bg-opacity-50 backdrop-blur-sm" ref={externalComponentRef}></div>

    {mutation.isPending ? (
      <div className='z-30 w-[400px] h-[400px] bg-white flex flex-col'>Loading</div>
    ) : (
      <div className='z-30 w-[400px] h-[400px] bg-white flex flex-col'>
        <div className='w-full h-[40px] items-center flex justify-center'>
          <p className='text-black font-bold text-[20px] text-center'>Delete Column</p>
        </div>
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <div className='w-[90%] h-[90%]'>
            <div class="w-72 my-5">
              <div class="relative h-10 w-full min-w-[200px]">
                <input
                  onChange={(e) => handleSetColumnToDelete(e)}
                  type="text"
                  placeholder="Column name to delete"
                  class="peer h-full w-full rounded-[7px] !border !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label
                  class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 hidden h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                ></label>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleDeletecolomun(deletecolumonname)}
              class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}
{
  importpopup && (
    <div className='absolute w-full h-full flex items-center justify-center z-20 bg-zinc-900 backdrop-blur-sm bg-opacity-15'>
      <div className="absolute w-full h-full z-20 bg-zinc-900 bg-opacity-50 backdrop-blur-sm" ref={externalComponentRef}></div>
  
      {mutation.isPending ? (
        <div className='z-30 w-[400px] h-[400px] bg-white flex flex-col'>Loading</div>
      ) : (
        <div className='z-30 w-[400px] rounded-md justify-between h-[200px] bg-white flex flex-col'>
          <div className='w-full h-[40px] items-center flex justify-center'>
            <p className='text-black font-bold text-[20px] text-center'>Import Csv File</p>
          </div>
          <div className='w-full h-[70%] flex flex-col items-center justify-center'>
           

   
<input  onChange={handleFileChange} class="block w-[90%] text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file"/>
<button type="button" onClick={handleSubmit} class="px-3 mt-[20px] mx-2 py-2 text-sm font-medium text-center inline-flex items-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
<img src={importicon} className=' w-4 h-4 mx-1'/>
Import
</button>
          </div>
        </div>
      )}
    </div>
  )
}

        </div>


  );
}

 
      