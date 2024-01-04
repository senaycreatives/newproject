import React from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Login from './Login';
import { DataTable } from './DataTable';
import { AddData } from './AddData';
import YourComponent from './hopePage';
import {  useIsAuthenticated } from 'react-auth-kit';
import Header from "./Header";
import { Details } from "./Details";
function App() {
  const navigate = useNavigate();

  // Check if the current route is the login page
  const isLoginPage = window.location.pathname === "/login";

  // Render the header only if it's not the login page
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
    <div className='w-screen h-screen overflow-hidden'>
      {renderHeader}

      <Routes>
      
        <Route exact path="/login" element={<Login />} />
        <Route path="/AdminHome" element={<PrivateRoute loginPath='/login'>
          <YourComponent />
        </PrivateRoute>} />
        <Route exact path="/" element={<PrivateRoute loginPath={'/login'}>
          <DataTable />
        </PrivateRoute>} />
        <Route path="/AddData" element={<PrivateRoute loginPath={'/login'}>
          <AddData />
        </PrivateRoute>} />
 <Route path="/detail/:zetacode" element={<PrivateRoute loginPath={'/login'}>
          <Details />
        </PrivateRoute>} />
      </Routes>
    </div>
  );
}

export default App;
