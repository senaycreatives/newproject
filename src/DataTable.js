import React, { useEffect, useRef, useState } from 'react';
import Layout from './Layout';
import UseFetchData from './hooks/UseFetchData';
import axios from 'axios';
import UseFetchIndividualData from './hooks/UseFetchIndividualData';
import Errorpopup from './Errorpopup';
import SucessPopup from './SucessPopup';

export function DataTable() {
  const { data, refetch } = UseFetchData();
  const [search, setSearch] = useState('');
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

  useEffect(() => {
    changepagedata();
  }, [page, data]);

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
      const res = await axios.delete('http://localhost:9000/deletedata', {
        data: { zetacode },
      });
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

  const headers =[ 'Zetacode','Location',  'Room', 'HelpDeskReference', 'IPS', 'Fault', 'Date', 'HotTemperature', 'HotFlow', 'HotReturn', 'ColdTemperature', 'ColdFlow', 'ColdReturn', 'HotFlushTemperature', 'TapNotSet', 'ColdFlushTemperature', 'TMVFail', 'PreflushSampleTaken', 'PostflushSampleTaken', 'ThermalFlush']
  ;
{/* <div
  class="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md bg-clip-border rounded-xl">
  <table class="w-full text-left table-auto min-w-max">
    <thead>
      <tr>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Name
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Job
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Employed
          </p>
        </th>
        <th class="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            John Michael
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Manager
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23/04/18
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Alexa Liras
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Developer
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23/04/18
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Laurent Perrier
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Executive
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            19/09/17
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Michael Levi
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Developer
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            24/12/08
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
      <tr class="even:bg-blue-gray-50/50">
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Richard Gran
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Manager
          </p>
        </td>
        <td class="p-4">
          <p class="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            04/10/21
          </p>
        </td>
        <td class="p-4">
          <a href="#" class="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">Edit</a>
        </td>
      </tr>
    </tbody>
  </table>
</div> */}

  return (
    <Layout>
      <div className='w-full h-screen flex items-center justify-center overflow-hidden'>
        <div className='flex relative flex-col rounded-md bg-white h-[90%] mb-100 overflow-y-hidden  w-[95%]'>
          {error && (
            <div className='top-0 left-0  w-[500px] h-[200px] absolute z-10'>
              <Errorpopup message={errorMessage?.response?.data.message}/>
            </div>
          )}
           {sucess && (
                  <div className='top-0 left-0  w-[500px] h-[200px] absolute z-10'>
          
            <SucessPopup message={sucess}/>
        </div>  )}
          <div className='w-full flex items-center justify-end'>
            <div className='mt-3 w-[400px] flex flex-row'>
              {isLoading && (
                <div class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                  <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
              )}
              <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                <input
                  type='search'
                  className='relative m-0 block min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
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

          <div ref={tableRef} className='sm:-mx-6 w-full h-[800px]   overflow-x-scroll  flex lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className=''>
                <table className=' text-left text-sm font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      {headers.map((header) => (
                        <th key={header} className='p-4 border-b border-blue-gray-100 bg-blue-gray-50 text-center'>
                        <p class="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
{header}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
            {searchData ? (
              <tr>
                {headers.map((header) => (
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
                  {headers.map((header) => (
                    <td key={header} className="p-4 border-b border-blue-gray-50 text-center" >
                    {typeof row[header] === 'boolean' ? row[header].toString() : row[header]}
                  </td>
                  ))}
                  <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                            <div
                              onClick={() => handlePageChange(row.Zetacode)}
                              className='w-[70px] h-[40px] flex items-center justify-center bg-orange-500 rounded-md'>
                              <p className='text-white hover:cursor-pointer'>Delete</p>
                            </div>
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                            <div
                              onClick={() => handleDelete(row.Zetacode)}
                              className='w-[70px] h-[40px] flex items-center justify-center bg-red-500 rounded-md'>
                              <p className='text-white hover:cursor-pointer'>Delete</p>
                            </div>
                          </td>
                </tr>
              ))
            )}
          </tbody>
                </table>
                
                {!searchData && (
                  <div className=' w-full absolute h-[90px] bottom-[20px]  items-center justify-center px-10 flex flex-row  '>
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
        </div>
      </div>
    </Layout>
  );
}
