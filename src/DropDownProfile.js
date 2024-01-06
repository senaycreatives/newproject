import React from 'react';
import { useSignOut } from 'react-auth-kit';
import { Link } from 'react-router-dom';


const DropDownProfile = () => {
const signout=useSignOut()
  return (
    <div className = "flex flex-col  shadow-md bg-opacity-100"
     style={{
          position: 'absolute',
          top: '3rem',
          right: '0.8rem',
          width: '120px',
          padding: '25px',
          backgroundColor: 'white',
        //   border: '100px solid lightgray',
          zIndex: '1000', 

        }}>
        <ul className = "flex flex-col items-center justify-center ">
           <li onClick={signout} className=' flex items-center justify-center h-[30px] hover:bg-gray-50  w-full'><a className="text-white-500 l bgre hover:text-yellow-500 cursor-pointer">Logout</a></li>
        </ul>
    </div>
  );
};

export default DropDownProfile;