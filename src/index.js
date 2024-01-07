import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./Login";
import LoginForm from "./LoginForm";
import { AddData } from "./AddData";
import { DataTable } from "./DataTable";
import AdminHome from "./AdminHome";
import {AuthKitStateInterface}  from 'react-auth-kit'
import YourComponent from "./hopePage";
import Resetpage from "./resetPasswordPage";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AuthProvider } from 'react-auth-kit'
import refreshApi from "./RefreshApi";
const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
root.render(

    <AuthProvider authType = {'localstorage'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={window.location.protocol === "https:"}
                  refresh={refreshApi}>
  <QueryClientProvider client={queryClient}>
    {/* <React.StrictMode> */}
    <BrowserRouter>

      <App />
    </BrowserRouter>

    {/* </React.StrictMode> */}
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  </AuthProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
