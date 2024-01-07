import * as React from "react";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useState } from "react";
import axios from "axios";
import SucessPopup from "./SucessPopup";
import Errorpopup from "./Errorpopup";
import { useAuthHeader } from "react-auth-kit";




export default function Resetpage() {
  const [password, setpassword] = useState("");
  const [currentpassword, setcurrenpassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setsucess] = useState();
  
  const [showPassword, setShowPassword] = useState(false);
  const authHeader = useAuthHeader()
  

  
  
  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };
  const handlecurrentpassword = (e) => {
    setcurrenpassword(e.target.value);
  };
   
  const handleConfirmPasswordChange = (e) => {
    setconfirmPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault(); 
    if(password==confirmpassword){
  
    try {
      // Make an HTTP request to your server
      const response = await axios.post(
        "https://dark-gold-sea-urchin-slip.cyclic.app/auth/changepassword",
        {
          currentPassword:  currentpassword,
          newPassword: password,
        },
        {
          headers: { Authorization: authHeader() },
        }
      );
     
  
 
      console.log("Server response:", response.data);
      setsucess('SucessFully changed');
      
    setTimeout(() => {
      setsucess(null);

    }, 1000)
     
      setpassword("");
      setconfirmPassword("");
      setError();
      
    } 
    catch (error) {
      setError(error.response.data.message||"error ocuured");
      console.log(error)
      
    setTimeout(() => {
      setError(null);

    }, 1000)
    
    }}
    else{
    setError("password dont match");
      console.log(error)
      
    setTimeout(() => {
      setError(null);

    }, 1000)
  }
  };
  
  return (
    <div className=" flex items-center justify-center ">
     
      
      
   
   <section class=" dark:bg-gray-900 flex items-center justify-center  ">
  
  <div class="flex flex-col items-center h-[50%] justify-center px-6 py-8 mx-auto  lg:py-0 ">
  <a href="#" class="flex items-center bg-violet-500 rounded-full p-2 mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
         <LockOutlinedIcon  className=" text-white   text-lg "/>
          
      </a>

      <div class=" p-6 bg-white rounded-lg shadow dark:border md:mt-0 w-[600px] h-[80%] sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
     {sucess&& <div>  <SucessPopup message={sucess}/></div>}
     { error&&<div>  <Errorpopup message={error}/></div>}
          <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
          </h2>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
          <div>
                  <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">current Password</label>
                  <input type="password"  onChange={handlecurrentpassword} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
              </div>
              <div>
                  <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                  <input type="password"  onChange={handlePasswordChange} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
              </div>
              <div>
                  <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input onChange={handleConfirmPasswordChange} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
              </div>
             
              <button type="submit" onClick={handleSignIn} class="w-full bg-blue-400 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Reset passwod</button>
          </form>
      </div>
  </div>
</section>
    </div>
    
  );
}
