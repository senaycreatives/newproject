import React from 'react';
import { Link } from 'react-router-dom';
import UseFetchuser from './hooks/UseFetchuser';
import { useAuthUser } from 'react-auth-kit';

const users = [
  { id: 1, name: 'Abebe', role: 'Admin' },
  { id: 2, name: 'Abebech', role: 'Editor' },
  { id: 3, name: 'chaltu',  role: 'Viewer' },
  // Add more users if needed
];


const UserList = () => {
  const { data, isLoading, isError, error } = UseFetchuser();
  const auth = useAuthUser()

  if(auth()?.permission=="admin"){
  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-bold my-4 text-center">Users List</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
  
            <th className="py-2">Role & Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.users.map((user,index) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{index+1}</td>
              <td className="border px-4 py-2">{user.username}</td>

              <td className="border px-4 py-2 flex items-center">
                {user.permission}
                <Link
                  to={`/update-role/${user._id}`}
                  className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                >
                  Update Role
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4">
        <Link to="/createUser" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Add New User
        </Link>
      </div>

    </div>
  );
          }
          else{
          return (
           <div>You don't have permission</div>
          )
          }
};

export default UserList;