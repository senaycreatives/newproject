import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import UseFetchData from './hooks/UseFetchData';
import axios from 'axios';
import UseFetchIndividualData from './hooks/UseFetchIndividualData';

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

  useEffect(() => {
    changepagedata();
  }, [page, data]);

  useEffect(() => {
    Popuperror();
  }, [searchError]);

  const Popuperror = () => {
    if(zetaCode){
    setError('Something went wrong. Please try again.');
    setTimeout(() => {
      setError(null);
    }, 5000);}
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
      refetch();
      setError(null); // Clear previous errors
      return res;
    } catch (error) {
      setError('Something went wrong. Please try again.');
      setTimeout(() => {
        setError(null); // Clear error after 5 seconds
      }, 5000);
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
    setZetaCode('');
    setShowDetails(false);
    setSelectedRow(null);
  };

  const handleShowDetails = (row) => {
    setShowDetails(true);
    setSelectedRow(row);
  };

  const headers = ['Zetacode', 'Location', 'Details', 'Delete'];

  return (
    <Layout>
      <div className='w-full h-screen flex items-center justify-center overflow-hidden'>
        <div className='flex relative flex-col rounded-md bg-white h-[90%] mb-100 overflow-y-hidden overflow-x-hidden w-[90%]'>
          {error && (
            <div className='top-0 left-0 w-[500px] h-[200px] absolute z-10'>
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">ERROR</strong>
                <span className="block sm:inline">{errorMessage?.response?.data.message}</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                  <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <title>Close</title>
                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                  </svg>
                </span>
              </div>
            </div>
          )}
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

          <div className='sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-left text-sm font-light'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    <tr>
                      {headers.map((header) => (
                        <th key={header} className='whitespace-nowrap px-6 py-4'>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {searchData ? (
                      <>
                          {searchData.data && (
                            <tr  className='border-b dark:border-neutral-500'>
                            <td className='whitespace-nowrap px-6 py-4 font-medium'>{searchData.data.Zetacode}</td>
                            <td className='whitespace-nowrap px-6 py-4'>{searchData.data.Location}</td>
                            <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                              <p className='text-blue-400 hover:cursor-pointer' onClick={() => handleShowDetails('ds')}>
                                see Detail
                              </p>
                            </td>
                            <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                              <div
                                onClick={() => handleDelete(searchData.data.Zetacode)}
                                className='w-[70px] h-[40px] flex items-center justify-center bg-red-500 rounded-md'>
                                <p className='text-white hover:cursor-pointer'>Delete</p>
                              </div>
                            </td>
                          </tr>
                          )}
                          </>
                      
                    ) : (
                      pageData.map((rows) => (
                        <tr key={rows.Zetacode} className='border-b dark:border-neutral-500'>
                          <td className='whitespace-nowrap px-6 py-4 font-medium'>{rows.Zetacode}</td>
                          <td className='whitespace-nowrap px-6 py-4'>{rows.Location}</td>
                          <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                            <p className='text-blue-400 hover:cursor-pointer' onClick={() => handleShowDetails(rows)}>
                              see Detail
                            </p>
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                            <div
                              onClick={() => handleDelete(rows.Zetacode)}
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
                  <div className='flex flex-col px-10 pt-3 items-center'>
                    <span className='text-sm text-gray-700 dark:text-gray-400'>
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
