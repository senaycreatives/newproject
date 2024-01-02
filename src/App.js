import SignIn from './signIn';
import './App.css';
import Login from './Login';
import AdminHome from './AdminHome';
import { DataTable } from './DataTable';
import LoginForm from './LoginForm';
import { Details } from './Details';
import { AddData } from './AddData';
import Layout  from './Layout';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import YourComponent from './hopePage';
import Header from './Header';


const data = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  // Add more data objects as needed
];

function App() {
  return (
    <div className='w-screen h-screen'>
      <Header/>
        <Routes>
      
    <Route path="/" element={<Login />}></Route>
    <Route path="AdminHome" element={<YourComponent />}></Route>
    <Route path="DataTable" element={<DataTable />}></Route>
    <Route path="AddData" element={<AddData />}></Route>
   
  </Routes>
  
    </div>
  
    );
}

export default App;
