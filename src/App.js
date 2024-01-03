import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import AdminHome from './AdminHome';
import { DataTable } from './DataTable';
import { AddData } from './AddData';
import YourComponent from './hopePage';
import Header from './Header';

const PrivateRoute = ({ path, element: Element, isAuthenticated }) => {
  return (
    <Navigate to="/" replace /> // Redirect to login page if not authenticated
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );

  return (
    <div className='w-screen h-screen'>
  
      
        <Routes>
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="AdminHome" element={isAuthenticated?<YourComponent />:<Navigate to="/" replace/>} isAuthenticated={isAuthenticated} />
          <Route path="DataTable" element={isAuthenticated?<DataTable />:<Navigate to="/" replace/>} isAuthenticated={isAuthenticated} />
          <Route path="AddData" element={isAuthenticated?<AddData/>:<Navigate to="/" replace/>} isAuthenticated={isAuthenticated} />
        </Routes>
   
    </div>
  );
}

export default App;
