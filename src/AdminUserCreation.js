import React, { useState } from "react";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import axios from "axios";
import SucessPopup from "./SucessPopup";
import Errorpopup from "./Errorpopup";
import { useAuthHeader, useAuthUser } from "react-auth-kit";

const CreateUserPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("admin");
  const [error, setError] = useState("");
  const [sucess, setSuccess] = useState("");
  const authHeader = useAuthHeader();
  const auth = useAuthUser();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://server.industrialclearance.co.uk/createUser",
        {
          username: username,
          password: password,
          permission: userType,
        },
        {
          headers: { Authorization: authHeader() },
        }
      );

      console.log("Server response: ", response.data);
      setSuccess("user created successfully");

      setTimeout(() => {
        setSuccess("");
      }, 1000);
      setUsername("");
      setPassword("");
      setUserType("admin");
      setError("");
    } catch (error) {
      setError(error.response.data.message || "error ocuured");

      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  if (auth()?.permission === "admin") {
    return (
      <div className="flex  justify-center h-screen">
        <section className="w-full max-w-sm">
          <div class="w-full flex items-center justify-center">
          <a
            href=""
            class="flex items-center bg-violet-500 rounded-full p-2 mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <AccountCircleTwoToneIcon className=" text-white   text-lg " />
          </a>
          </div>
       
          <div className="flex flex-col items-center bg-white shadow-md rounded px-8 py-6">
        
           
            {sucess && (
              <div>
                {" "}
                <SucessPopup message={sucess} />
              </div>
            )}
            {error && (
              <div>
                {" "}
                <Errorpopup message={error} />
              </div>
            )}

            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Create User
            </h2>

            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="Username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="userType"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  User Type:
                </label>
                <select
                  id="userType"
                  value={userType}
                  onChange={handleUserTypeChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-400 hover:bg-blue-300 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </section>
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
export default CreateUserPage;
