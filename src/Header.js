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
import { useSignOut } from "react-auth-kit";

const Header = ({ children }) => {
  const signOut = useSignOut()
  const navigate = useNavigate();

  return (
    <nav className="flex h-[70px] justify-between bg-gray-100 text-white w-screen">
      <div className="px-5 xl:px-12 py-6 flex w-full items-center">
        <Link to="#" className="text-3xl font-bold font-heading">
          ADMIN PANEL
        </Link>

        <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><Link to="#" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="AddData" className="hover:text-gray-200">Add Data</Link></li>
          <li><Link to="#" className="hover:text-gray-200">import csv</Link></li>
          <li><Link to="#" className="hover:text-gray-200">Account</Link></li>
        </ul>

        <div className="hidden xl:flex items-center space-x-5 items-center">
          <Link to="#" className="flex items-center hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
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
