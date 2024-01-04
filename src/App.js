import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from './Login';
import { DataTable } from './DataTable';
import { AddData } from './AddData';
import YourComponent from './hopePage';
import { RequireAuth } from 'react-auth-kit';
import Header from "./Header";
import { Details } from "./Details";
function App() {
  const navigate = useNavigate();

  // Check if the current route is the login page
  const isLoginPage = window.location.pathname === "/login";

  // Render the header only if it's not the login page
  const renderHeader = !isLoginPage &&   <Header/>;

  return (
    <div className='w-screen h-screen'>
      {renderHeader}

      <Routes>
      
        <Route exact path="/login" element={<Login />} />
        <Route path="/AdminHome" element={<RequireAuth loginPath='/login'>
          <YourComponent />
        </RequireAuth>} />
        <Route exact path="/" element={<RequireAuth loginPath={'/login'}>
          <DataTable />
        </RequireAuth>} />
        <Route path="/AddData" element={<RequireAuth loginPath={'/login'}>
          <AddData />
        </RequireAuth>} />
 <Route path="/detail" element={<RequireAuth loginPath={'/login'}>
          <Details />
        </RequireAuth>} />
      </Routes>
    </div>
  );
}

export default App;
