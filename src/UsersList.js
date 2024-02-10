import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseFetchuser from "./hooks/UseFetchuser";
import { useAuthUser, useAuthHeader } from "react-auth-kit";
import axios from "axios";
import Errorpopup from "./Errorpopup";
import SucessPopup from "./SucessPopup";


const UserList = () => {
  const { data, refetch } = UseFetchuser();
  const auth = useAuthUser();
  const authHeader = useAuthHeader();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (usernameToDelete) => {
    try {
      console.log('handling delete for ', usernameToDelete);
      const res = await axios.delete(
        "https://server.industrialclearance.co.uk/deleteUser",
        {
          data: { usernameToDelete },
          headers: { Authorization: authHeader() },
        }
      );

      console.log(res);

      refetch();
      setSuccess("Successfully Deleted");
      setTimeout(() => {
        setSuccess(null);
      }, 1000);
      setError(null); // Clear previous errors
      return res;
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setTimeout(() => {
        setError(null); // Clear error after 1 second
      }, 1000);
    }
  };

  if (auth()?.permission === "admin") {
    return (
      <div className=" relative  w-screen h-screen  overflow-hidden  ">
        <div className=" relative flex flex-row h-[10%] w-full items-center justify-center">
        {success&& <div className=" absolute top-0  left-5"><SucessPopup message={success} /></div>}
        {error&&  <div className=" absolute top-0  left-5"> <Errorpopup message={error} /></div>}
        <h1 className="text-2xl  font-bold h-[10%] text-center  flex-1">Users List</h1>
      
        </div>
        
        <div className="w-full relative  h-[60%] overflow-y-scroll ">
      
        <table className="w-[90%]   overscroll-y-scroll mx-auto ">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Name</th>
              <th className="py-2">Role & Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.users?.map((user, index) => (

              <tr key={user._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2 flex items-center">
                  {user.permission}
                  <Link
                    to={`/update-role/${user._id}`}
                    className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                  >
                    Update Role
                  </Link>
                  <div
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(user.username)}
                  >
                    <p className="text-white hover:cursor-pointer">
                      Delete User
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
        <div className="text-center flex items-center justify-center h-[20%]">
          <Link
            to="/createUser"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New User
          </Link>
        </div>
     
      
      
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-red-500 text-2xl font-bold mb-4">
            You have no permission for this
          </h2>
          <p className="text-gray-600 italic">
            Sorry, but you do not have the necessary permissions to access this
            page.
          </p>
        </div>
      </div>
    );
  }
};

export default UserList;
