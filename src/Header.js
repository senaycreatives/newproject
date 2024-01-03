import React, { useState, useEffect } from "react";
import "./YourComponent.css"; // Import your CSS file
import logoutIcon from "./Image/Icon/Type=Logout.svg";
import passCIcon from "./Image/Icon/Type=PassC.svg";
import addIcon from "./Image/Icon/Type=Add.svg";
import eyeIcon from "./Image/Icon/Type=Eye.svg";
import deleteIcon from "./Image/Icon/Type=Delete.svg";
import editIcon from "./Image/Icon/Type=Edit.svg";
import { Link } from "react-router-dom";
import Resetpage from "./resetPasswordPage";

const Header = ({ children }) => {
  return (
    <div class=" w-[100%] h-[11%] items-center justify-end  bg-headercolor flex flex-row navbar" >
   
        <a href="#" className="   px-4 py-8 justify-center rounded-md mx-2 h-[50px] bg-buttoncolor flex  items-center  flex-col">
          <img src={editIcon} width="20px" alt="" /> <p className=" text-white  text-[16px]">Edit</p> 
        </a>
        <a href="#" id="openModalBtn" className="   px-4 py-8 justify-center rounded-md mx-2 h-[50px] bg-buttoncolor flex  items-center  flex-col">
          <img src={addIcon} width="20px" alt="" /> <p className=" text-white  text-[16px]">Import</p> 
        </a>
        <a href="#" className="   px-4 py-8 justify-center rounded-md mx-2 h-[50px] bg-buttoncolor flex  items-center  flex-col">
          <img src={eyeIcon} width="20px" alt="" /> <p className=" text-white  text-[16px]">View</p> 
        </a>
        <Link to = "/ResetPage"><a href="#" className="   px-4 py-8 justify-center rounded-md mx-2 h-[50px] bg-buttoncolor flex  items-center  flex-col">
          <img src={passCIcon} width="20px" alt="" /> <p className=" text-white  text-[16px]">Change Password</p>
        </a></Link>
        <Link to = "/"><a href="#" className="   px-4 py-8 justify-center rounded-md mx-2 h-[50px] bg-buttoncolor flex  items-center  flex-col">
          <img src={logoutIcon} width="20px" alt="" /> <p className=" text-white  text-[16px]">Log Out</p> 
        </a></Link>
     
   
    </div>
  );
};

export default Header;
