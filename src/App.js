import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from './Login';
import { DataTable } from './DataTable';
import { AddData } from './AddData';

import {  useIsAuthenticated } from 'react-auth-kit';
import Header from "./Header";
import  {EditData} from "./EditData";
import Resetpage from "./resetPasswordPage";
import CreateUserPage from "./AdminUserCreation";
import UserList from "./UsersList";
import UpdateRolePage from "./UpdateRole";
import NotFoundPage from "./NotFoundPage";

function App() {
  const location = useLocation();


  // Check if the current route is the login page
  const isAuthenticated = useIsAuthenticated();
  const isLoginPage = location.pathname === "/login" || !isAuthenticated();


 
  const renderHeader = !isLoginPage &&   <Header/>;
  const PrivateRoute = ({ children, loginPath }) => {
    const isAuthenticated = useIsAuthenticated();
    const location = useLocation();

    if (isAuthenticated()) {
      return children;
    }

    return <Navigate
      to={loginPath}
      state={{from: location}}
      replace
    />;
  };
  


  return (
    <div className='w-screen h-screen  overflow-hidden'>
      {renderHeader}

      <Routes>
      
        <Route exact path="/login" element={<Login />} />
        
        <Route exact path="/" element={<PrivateRoute loginPath={'/login'}>
          <DataTable />
        </PrivateRoute>} />
        <Route path="/AddData" element={<PrivateRoute loginPath={'/login'}>
          <AddData />
        </PrivateRoute>} />
        <Route path="/detail/:zetacode" element={<PrivateRoute loginPath={'/login'}>
        <EditData />
        </PrivateRoute>} />
        <Route path="/ResetPassword" element={<PrivateRoute loginPath={'/login'}>
          <Resetpage />
          </PrivateRoute>} />
          <Route path="/createUser" element={<PrivateRoute loginPath={'/login'}>
          <CreateUserPage />
          </PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute loginPath={'/login'}>
          <UserList />
          </PrivateRoute>} />
          <Route path="/update-role/:id" element={<PrivateRoute loginPath={'/login'}>
          <UpdateRolePage />
       
          
          </PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
