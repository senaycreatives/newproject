import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SucessPopup from './SucessPopup';
import Errorpopup from './Errorpopup';
import { useAuthHeader } from 'react-auth-kit';
import UseFetchuser from './hooks/UseFetchuser';
import Usergetsignleuser from './hooks/Usergetsignleuser';

const UpdateRolePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [updatedRole, setUpdatedRole] = useState('editor');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const authHeader = useAuthHeader();
  const {data,isLoading,isError,error:fetcherror}=Usergetsignleuser(id)
  


  const handleRoleUpdate = async () => {
    try {
      console.log(updatedRole)
      const response = await axios.put(
        `https://dark-gold-sea-urchin-slip.cyclic.app/updateUserPermissions/${id}`,
        {
          permissions: updatedRole,
        },
        {
          headers: { Authorization: authHeader() },
        }
      );
      console.log(response.data); // Log the response data for debugging
  
      setSuccess(`Role updated to ${updatedRole} successfully `);
    } catch (error) {
      setError(error.response?.data?.message || 'Error occurred');
    }
  };
  

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-bold my-4 text-center">Update Role For <span className=' text-cyan-400'>{data?.data?.user?.username}</span></h1>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          {(error||isError) && <Errorpopup message={error||fetcherror.response?.data?.message} />}
          {success && <SucessPopup message={success} />}

          <div className="mt-4">
            <label className="block font-bold mb-2" htmlFor="role">
              Current Role:
            </label>
            <input
              id="role"
              type="text"
              value={data?.data?.user?.permission}
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
              disabled
            />
          </div>

          <div className="mt-4">
            <label className="block font-bold mb-2" htmlFor="updatedRole">
              Updated Role:
            </label>
          
             <select
                id="userType"
                value={updatedRole}
                onChange={(e) => setUpdatedRole(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option  value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
          </div>

          <div className="mt-8">
            <button
              type="button"
              onClick={handleRoleUpdate}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRolePage;