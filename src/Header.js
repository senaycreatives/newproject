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
 


    <nav class="flex h-[70px] justify-between bg-gray-100 text-white w-screen">
      <div class="px-5 xl:px-12 py-6 flex w-full items-center">
        <a class="text-3xl font-bold font-heading" href="#">
          ADMIN PANEL
        </a>
   
        <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
          <li><a class="hover:text-gray-200" href="#">Home</a></li>
          <li><a class="hover:text-gray-200" href="#">Add Data</a></li>
          <li><a class="hover:text-gray-200" href="#">import csv</a></li>
          <li><a class="hover:text-gray-200" href="#">Account</a></li>
        </ul>
      
        <div class="hidden xl:flex items-center space-x-5 items-center">
       
         
          
          <a class="flex items-center hover:text-gray-200" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </a>
        </div>
      </div>
    
      <a class="xl:hidden flex mr-6 items-center" href="#">
      
      <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </a>
    </nav>






  );
};

export default Header;
