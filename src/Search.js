import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import UseFetchData from './hooks/UseFetchData';
import axios from 'axios';
import UseFetchindividualData from './hooks/UseFetchIndividualData';

export function DataTable() {
  const { data, refetch } = UseFetchData();
  const [search, setSearch] = useState('');
  const { data: searchData, refetch: refetchSearch } = UseFetchindividualData('');
  const [pageSize] = useState(5);
  const [page, setPage] = useState(1);
  const [pageData, setPagedata] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    changepagedata();
  }, [page, data]);

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
    const res = await axios.delete('https://dark-gold-sea-urchin-slip.cyclic.app/deletedata', {
      data: { zetacode },
    });
    refetch();
    return res;
  };

  const handleSearch = () => {
    refetchSearch(search);
  };

  const handleBack = () => {
    setSearch('');
    refetchSearch('');
    setShowDetails(false);
  };

  const handleShowDetails = () => {
    setShowDetails(true);
  };

  return (
    <Layout>
      <div className='w-full h-screen flex items-center justify-center overflow-hidden'>
        <div className='flex flex-col rounded-md bg-white h-[90%] mb-100 overflow-y-hidden overflow-x-hidden w-[90%]'>
          <div className='w-full flex items-center justify-end'>
            <div className='mt-3 w-[400px]'>
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
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-5 w-5'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>

          <div className='sm:-mx-6 lg:-mx-8'>
            <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
              <div className='overflow-hidden'>
                <table className='min-w-full text-left text-sm fonlight'>
                  <thead className='border-b font-medium dark:border-neutral-500'>
                    {/* ... (existing table header JSX) */}
                  </thead>
                  <tbody>
                    {searchData ? (
                    
                    <>
                          {searchData.data && (
                            
                            <tr  className='border-b dark:border-neutral-500'>
                          <td className='whitespace-nowrap px-6 py-4 font-medium'>{searchData.Zetacode}</td>
                          <td className='whitespace-nowrap px-6 py-4'>{searchData.Location}</td>
                        
                          <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                            <p className='text-blue-400 hover:cursor-pointer' onClick={handleShowDetails}>
                              see Detail
                            </p>
                          </td>
                          <td className='whitespace-nowrap px-6 py-4 text-blue-400'>
                            <div
                              onClick={() => handleDelete(searchData.Zetacode)}
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
                            <p className='text-blue-400 hover:cursor-pointer' onClick={handleShowDetails}>
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
