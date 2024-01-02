import React from "react";
import "./css/main.css";
import "./css/util.css";
import Layout from "./Layout";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSignIn = async (username, password) => {
    try {
      const response = await fetch("http://localhost:9000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Sign in successful, handle the response data as needed
        const data = await response.json();
        console.log("yeah");
      } else {
        console.log("sry");
      }
    } catch (error) {
      // Handle network or other errors
    }
  };

  return (
    <Layout>
      <div className="limiter">
        <div
          className="container-login100"
          style={{ backgroundImage: "url('./background-image.jpg')" }}
        >
          <div className="wrap-login100 p-t-30 p-b-50">
            <span className="login100-form-title p-b-41">Sign In</span>
            <form className="login100-form validate-form p-b-33 p-t-5">
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter username"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe82a;"
                ></span>
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Enter password"
              >
                <input
                  className="input100"
                  type="password"
                  name="pass"
                  placeholder="Password"
                />
                <span
                  className="focus-input100"
                  data-placeholder="&#xe80f;"
                ></span>
              </div>
              <div className="container-login100-form-btn m-t-32">
              <Link to="/AdminHome">
                <button className="login100-form-btn">
                  Sign In
                </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
