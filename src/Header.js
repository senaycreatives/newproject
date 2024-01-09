import React, { useState, useEffect } from "react";
import "./YourComponent.css"; // Import your CSS file
import logoutIcon from "./Image/Icon/Type=Logout.svg";
import passCIcon from "./Image/Icon/Type=PassC.svg";
import addIcon from "./Image/Icon/Type=Add.svg";
import eyeIcon from "./Image/Icon/Type=Eye.svg";
import deleteIcon from "./Image/Icon/Type=Delete.svg";
import editIcon from "./Image/Icon/Type=Edit.svg";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Resetpage from "./resetPasswordPage";
import { useAuthUser, useSignOut } from "react-auth-kit";
import DropDownProfile from "./DropDownProfile";

const Header = ({ children }) => {
  const signOut = useSignOut()
  const auth = useAuthUser()
  console.log(auth())
  const navigate = useNavigate();
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <nav className="flex h-[70px] justify-between bg-gradient-to-r from-fuchsia-50 to-sky-50 text-white w-screen">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <Link to="#" className="text-3xl font-bold font-heading">
          ADMIN PANEL
        </Link>

        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="AddData" className="hover:text-gray-200">Add Data</Link></li>
        
          <li><Link to="/ResetPassword" className="hover:text-gray-200">Change password</Link></li>
          <li><Link to="/createUser" className="hover:text-gray-200">New User</Link></li>
        </ul>
        {/* top right icon and drop down menu */}

            <div className="hidden xl:flex  space-x-2 items-center">
            <li><Link to="/createUser" className="hover:text-gray-200">{auth()?.username}</Link></li>
      
              <Link to="#" className="flex items-center hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick = {() => setOpenProfile((prev) => !prev)}>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </Link>    
            </div>
            {
              openProfile && <DropDownProfile /> 
              
            }
            
           
      </div>
      

      <Link to="#" className="xl:hidden flex mr-6 items-center">
        <Link to="#" className="navbar-burger self-center mr-12 xl:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Link>
      </Link>
      
    </nav>
  );
};

export default Header;
