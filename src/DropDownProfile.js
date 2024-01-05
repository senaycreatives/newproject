import React from 'react';
import { Link } from 'react-router-dom';


const DropDownProfile = () => {
  return (
    <div className = "flex flex-col bg-opacity-100"
     style={{
          position: 'absolute',
          top: '3rem',
          right: '0.8rem',
          width: '120px',
          padding: '25px',
          backgroundColor: 'darkgray',
        //   border: '100px solid lightgray',
          zIndex: '1000', 

        }}>
        <ul className = "flex flex-col gap-4">
            <li><Link to = "ResetPassword"><a className="text-white-500 hover:text-white-500 cursor-pointer">Reset Password</a></Link></li>
            <li><Link to = "login"><a className="text-white-500 hover:text-white-500 cursor-pointer">Logout</a></Link></li>
        </ul>
    </div>
  );
};

export default DropDownProfile;