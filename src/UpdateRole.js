import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import SucessPopup from './SucessPopup';
import Errorpopup from './Errorpopup';
import { useAuthHeader } from 'react-auth-kit';
import UseFetchuser from './hooks/UseFetchuser';

const UpdateRolePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [updatedRole, setUpdatedRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const authHeader = useAuthHeader();
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://dark-gold-sea-urchin-slip.cyclic.app/users/${id}`,
          {
            headers: { Authorization: authHeader() },
          }
        );

        setUser(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error occurred');
      }
    };

    fetchUser();
  }, [id, authHeader]);

  const handleRoleUpdate = async () => {
    try {
      const response = await axios.put(
        `https://your-backend-url.com/updateRole/${id}`,
        {
          role: updatedRole,
        },
        {
            
          headers: { Authorization: authHeader() },
        }
      );

      setSuccess('Role updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Error occurred');
    }
  };

  if (error) {
    return <Errorpopup message={error} />;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-bold my-4 text-center">Update Role</h1>
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          {success && <SucessPopup message={success} />}

          <div className="mt-4">
            <label className="block font-bold mb-2" htmlFor="role">
              Current Role:
            </label>
            <input
              id="role"
              type="text"
              value={user.role}
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
              disabled
            />
          </div>

          <div className="mt-4">
            <label className="block font-bold mb-2" htmlFor="updatedRole">
              Updated Role:
            </label>
            <input
              id="updatedRole"
              type="text"
              value={updatedRole}
              onChange={(e) => setUpdatedRole(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 w-full"
            />
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