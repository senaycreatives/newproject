import React from 'react';
import { Link } from 'react-router-dom';

const users = [
  { id: 1, name: 'abebe', Role: 'Admin' },
  { id: 2, name: 'abebech', Role: 'Editor' },
  { id: 3, name: 'chaltu', Role: 'Viewer' },
  // Add more users if needed
];

const UserList = () => {
  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-bold my-4 text-center">Users List</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Username</th>
            <th className="py-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.Role}</td>
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
};

export default UserList;