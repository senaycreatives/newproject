import React from 'react';

const users = [
  { id: 1, name: 'abebe', Role: 'Admin' },
  { id: 2, name: 'abebech', Role: 'Editor' },
  { id: 3, name: 'chaltu', Role: 'Viewer' },
  // Add more users if needed
];

const UserList = () => {
  return (
    <div className="px-20 py-10">
      <h1 className="text-2xl font-bold my-4 text-center">User List</h1>
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
    </div>
  );
};

export default UserList;