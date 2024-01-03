import React from "react";
import "./AdminPages.css";
import { Link } from 'react-router-dom';
import Permission from "./Image/Icon/Type=Admin.svg";
import AddIcon from "./Image/Icon/Type=Add.svg";
import AdminIcon from "./Image/Icon/Type=Admin.svg";
import DeleteIcon from "./Image/Icon/Type=Delete.svg";
import EditIcon from "./Image/Icon/Type=Edit.svg";
import EyeIcon from "./Image/Icon/Type=Eye.svg";
import pASSIcon from "./Image/Icon/Type=pASS.svg";
import PassC from "./Image/Icon/Type=PassC.svg";
import LogoutIcon from "./Image/Icon/Type=Logout.svg";
import reset from "./Image/Icon/Type=reset.svg";
import Resetpage from "./resetPasswordPage.js";
import Header from "./Header.js";

const AdminPage = () => {
  return (
    <div>
    <Header/>
      <div class="mainDiv">
        <div class="component_card gray">
          <div class="green">
            <img src={Permission} id="img" style={{ objectFit: "cover" }} />
          </div>
          <div class="red">
            <div class="yellow">
              <p class="heading">Name: Admin 1</p>
            </div>
            <div class="brown">
              <a href="">
                <div class="divs">
                  <img class="small_Icons" id="permission" src={Permission} />
                  <Link to="/Reset"> <p class="simpletext">Change Permission</p></Link>
                </div>
              </a>
              <a href="#">
                <div class="divs">
                  <img class="small_Icons" src={DeleteIcon} />
                  <p class="simpletext">Delete</p>
                </div>
              </a>
              <a href="">
                <div class="divs">
                  <img class="small_Icons" src={reset} />
                  <Link to="/Reset"><p class="simpletext">Reset Password</p></Link>
                </div>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};
export default AdminPage;
